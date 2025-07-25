type Props = {
  role: "user" | "assistant";
  content: string;
};

export const MessageBubble = ({ role, content }: Props) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl shadow-md text-sm whitespace-pre-wrap
          ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}
        `}
      >
        {content}
      </div>
    </div>
  );
};
