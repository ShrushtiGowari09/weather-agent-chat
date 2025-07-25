"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
}

export function ChatWindow({ messages, loading }: ChatWindowProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Fix here by adding explicit type for 'msg'
  const lastUserMessage = messages.findLast((msg: Message) => msg.role === "user");

  const hasAssistantReply = messages.some((msg, idx) =>
    msg.role === "assistant" &&
    messages[idx - 1]?.role === "user" &&
    messages[idx - 1].content === lastUserMessage?.content
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
      {messages.map((m, i) => (
        <div
          key={i}
          className={cn(
            "whitespace-pre-wrap text-sm",
            m.role === "user" ? "text-right text-blue-600" : "text-left text-black"
          )}
        >
          {m.role === "user" ? "" : ""} {m.content}
        </div>
      ))}

      {!hasAssistantReply && lastUserMessage && !loading && (
        <div className="text-center text-red-500 text-xs">
          ⚠️ I’m currently unable to answer that. I can only provide current weather updates.
          <br />
          Try asking something like: <strong>“What’s the weather in Mumbai?”</strong>
        </div>
      )}

      {messages.length === 0 && (
        <div className="text-center text-gray-500 text-sm">
          Ask something about the weather...
        </div>
      )}
    </div>
  );
}
