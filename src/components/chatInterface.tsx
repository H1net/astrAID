"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/lib/ai";
import { TrainingGuide } from "@prisma/client";

type ChatInterfaceProps = {
  initialMessages?: Message[];
  chatId?: string;
  guides?: TrainingGuide[];
  userId?: string;
};

export default function ChatInterface({
  initialMessages = [],
  chatId,
  guides = [],
  userId,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare request body
      const body = {
        messages: [...messages, userMessage],
        guideId: selectedGuide,
        chatId,
        userId,
      };

      // Send request to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      // Add empty assistant message that will be updated
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Decode and append to assistant message
          const chunk = decoder.decode(value, { stream: true });
          assistantMessage += chunk;

          // Update the last message with new content
          setMessages((prev) => [
            ...prev.slice(0, -1),
            { role: "assistant", content: assistantMessage },
          ]);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-xl shadow-md overflow-hidden">
      {/* Guide selector */}
      {guides.length > 0 && (
        <div className="bg-gray-50 p-4 border-b">
          <label htmlFor="guide-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select a training guide for context (optional)
          </label>
          <select
            id="guide-select"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedGuide || ""}
            onChange={(e) => setSelectedGuide(e.target.value || null)}
          >
            <option value="">No guide selected</option>
            {guides.map((guide) => (
              <option key={guide.id} value={guide.id}>
                {guide.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg font-medium">Welcome to AstrAID Chat Assistant!</p>
            <p className="mt-2">
              Ask me anything about dog training, behavior, or care. I'm here to help!
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
