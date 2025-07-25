// ChatInterface.tsx
"use client";

import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSend: (message: string) => void;
  loading: boolean;
}

export default function ChatInterface({ messages, onSend, loading }: ChatInterfaceProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current?.value.trim()) {
      onSend(inputRef.current.value.trim());
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "text-sm leading-relaxed whitespace-pre-wrap max-w-xs px-4 py-2 rounded-2xl shadow-md",
              msg.role === "user"
                ? "ml-auto bg-blue-500 text-white text-right"
                : "bg-gray-200 text-gray-800 text-left"
            )}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="border-t bg-white px-4 py-3 shadow-inner">
        <div className="flex items-center gap-2 max-w-xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask something about the weather..."
            className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            onKeyDown={handleKeyDown}
          />
          <button
            disabled={loading}
            onClick={() => {
              if (inputRef.current?.value.trim()) {
                onSend(inputRef.current.value.trim());
                inputRef.current.value = "";
              }
            }}
            className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
          >
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
