import { useState } from "react";

type Props = {
  onSend: (msg: string) => void;
  disabled: boolean;
};

export const MessageInput = ({ onSend, disabled }: Props) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white border-t border-gray-200">
      <input
        type="text"
        className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Ask something about the weather..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={disabled}
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        onClick={handleSend}
        disabled={disabled}
      >
        Send
      </button>
    </div>
  );
};
