import { prisma } from "@/lib/prisma";
import ChatInterface from "@/components/chatInterface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

type ChatPageProps = {
  searchParams: {
    guideId?: string;
    chatId?: string;
  };
};

async function getGuideById(guideId: string) {
  try {
    const guide = await prisma.trainingGuide.findUnique({
      where: { id: guideId },
    });
    return guide;
  } catch (error) {
    console.error(`Error fetching guide with id ${guideId}:`, error);
    return null;
  }
}

async function getAllGuides() {
  try {
    const guides = await prisma.trainingGuide.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
      orderBy: {
        title: "asc",
      },
    });
    return guides;
  } catch (error) {
    console.error("Error fetching guides:", error);
    return [];
  }
}

async function getChatById(chatId: string) {
  try {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });
    return chat;
  } catch (error) {
    console.error(`Error fetching chat with id ${chatId}:`, error);
    return null;
  }
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const session = await getServerSession(authOptions);
  const guides = await getAllGuides();
  
  // Handle guide context if provided
  let selectedGuide = null;
  if (searchParams.guideId) {
    selectedGuide = await getGuideById(searchParams.guideId);
  }
  
  // Handle existing chat if provided
  let existingChat = null;
  if (searchParams.chatId) {
    existingChat = await getChatById(searchParams.chatId);
    
    // Verify the user has access to this chat
    if (existingChat && existingChat.userId && (!session || existingChat.userId !== session.user.id)) {
      existingChat = null; // Reset if unauthorized
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-accent">AI Training Assistant</h1>
        {session && (
          <Link href="/profile/chats" className="text-primary hover:text-accent">
            View Chat History
          </Link>
        )}
      </div>

      <div className="mb-6">
        <p className="text-gray-600">
          Ask questions about dog training, behavior problems, or specific techniques. 
          {selectedGuide && (
            <span className="font-medium"> Your conversation will include context from the guide: <span className="text-primary">{selectedGuide.title}</span></span>
          )}
        </p>
      </div>

      <ChatInterface 
        initialMessages={existingChat ? (existingChat.messages as any) : []}
        chatId={searchParams.chatId}
        guides={guides}
        userId={session?.user.id}
      />

      {!session && (
        <div className="mt-6 bg-accent bg-opacity-10 rounded-lg p-4 text-center">
          <p className="text-accent mb-2">
            <strong>Sign in to save your chat history and create training plans</strong>
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="text-primary hover:underline"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="text-primary hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
