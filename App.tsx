import { useState } from "react";
import { ChatWindow } from "./components/ChatWindow";
import { MessageInput } from "./components/MessageInput";
import type { Message } from "./types";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (msg: string) => {
    const newMessages = [...messages, { role: "user" as const, content: msg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch(
        "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            "xx-mastra-dev-playground": "true",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: msg }],
            runId: "weatherAgent",
            threadId: "2022016402188586",
            resourceId: "weatherAgent",
            maxRetries: 2,
            maxSteps: 5,
            temperature: 0.5,
            topP: 1,
            runtimeContext: {},
          }),
        }
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { value, done } = await reader!.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        // Extract assistant message parts only (lines like 0:"..." from stream)
        const cleanChunk = chunk
          .split("\n")
          .filter((line) => line.match(/^\s*"?0"?\s*:\s*"?[^"]+/))
          .map((line) => {
            const match = line.match(/"?(?:0)"?\s*:\s*"?([^"]+)/);
            return match ? match[1] : "";
          })
          .join("");

        assistantContent += cleanChunk;
        setMessages([...newMessages, { role: "assistant", content: assistantContent }]);
      }
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ Error: Unable to connect to the weather agent.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col h-[90vh] w-full max-w-xl mx-auto shadow-2xl rounded-2xl bg-white overflow-hidden">
        <div className="bg-blue-700 text-white text-lg font-semibold px-6 py-4">
          🌤️ Weather Agent Chat
        </div>
        <ChatWindow messages={messages} loading={loading} />
        <MessageInput onSend={sendMessage} disabled={loading} />
      </div>
    </div>
  );
}

export default App;
