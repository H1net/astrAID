import { NextRequest, NextResponse } from "next/server";
import { createChatStream, saveChat, updateChat } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Message } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;
    
    const { messages, guideId, chatId } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required and must be an array" },
        { status: 400 }
      );
    }
    
    // Get guide context if provided
    let guideContext: string | undefined;
    if (guideId) {
      const guide = await prisma.trainingGuide.findUnique({
        where: { id: guideId },
      });
      
      if (guide) {
        guideContext = `Guide Title: ${guide.title}\nSummary: ${guide.summary}\n\nContent: ${guide.contentMd.substring(0, 1000)}...`;
      }
    }
    
    // Create or update chat record if user is logged in
    if (userId) {
      if (chatId) {
        // Update existing chat
        await updateChat(chatId, messages);
      } else {
        // Create new chat
        await saveChat(userId, messages);
      }
    }
    
    // Stream response from Ollama
    const stream = await createChatStream(messages, guideContext);
    
    return new Response(stream);
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
