import { prisma } from "./prisma";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

/**
 * Creates a stream from Ollama API for chat completions
 * @param messages Array of message objects with role and content
 * @param guideContext Optional context from a training guide to include in the prompt
 * @returns ReadableStream of text chunks from the AI response
 */
export async function createChatStream(
  messages: Message[],
  guideContext?: string
): Promise<ReadableStream<Uint8Array>> {
  // If we have guide context, add it as system message at the beginning
  const messagesWithContext = guideContext
    ? [
        {
          role: "system",
          content: `You are AstrAID, an AI assistant for dog training. 
          The user is asking about a training guide with the following information:
          ${guideContext}
          
          Use this information to provide helpful, accurate advice. If the user asks something 
          not related to this guide or dog training in general, you can still help but make it clear 
          when you're going beyond the specific guide content.`,
        } as Message,
        ...messages,
      ]
    : messages;

  // Ensure OLLAMA_URL and GEMMA_MODEL are set
  const ollama_url = process.env.OLLAMA_URL;
  const model = process.env.GEMMA_MODEL;

  if (!ollama_url || !model) {
    throw new Error("OLLAMA_URL and GEMMA_MODEL must be set in environment variables");
  }

  // Make the API call to Ollama
  const response = await fetch(`${ollama_url}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: messagesWithContext,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.statusText}`);
  }

  return response.body as ReadableStream<Uint8Array>;
}

/**
 * Saves a chat conversation to the database
 * @param userId User ID if logged in, or null for guest chats
 * @param messages Array of message objects
 * @returns The created chat object
 */
export async function saveChat(userId: string | null, messages: Message[]) {
  return await prisma.chat.create({
    data: {
      userId,
      messages: messages as any, // JSON type in Prisma
    },
  });
}

/**
 * Retrieves a chat by ID
 * @param chatId The ID of the chat to retrieve
 * @returns The chat object or null if not found
 */
export async function getChatById(chatId: string) {
  return await prisma.chat.findUnique({
    where: { id: chatId },
  });
}

/**
 * Gets all chats for a user
 * @param userId The user ID
 * @returns Array of chat objects
 */
export async function getUserChats(userId: string) {
  return await prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Updates an existing chat with new messages
 * @param chatId The ID of the chat to update
 * @param messages The updated array of messages
 * @returns The updated chat object
 */
export async function updateChat(chatId: string, messages: Message[]) {
  return await prisma.chat.update({
    where: { id: chatId },
    data: { messages: messages as any },
  });
}
