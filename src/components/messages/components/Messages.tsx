import { useState } from "react";
import { Message } from "../type";

interface MessagesProps {
  messages: Message[];
}

export const Messages = ({ messages }: MessagesProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 100;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return messages ? (
    messages.map((item, index) => {
      const shouldTruncate = item.message.length > limit;
      const displayedMessage = isExpanded
        ? item.message
        : item.message.slice(0, limit);

      return (
        <div key={index} className="my-4 pb-2 border-b-2 border-gray-200 ">
          <p className="text-lg">
            <span className="font-bold">{item.name}</span> - {item.relationship}
          </p>
          <p className="text-gray-400 pb-2">{item.date}</p>
          <p className="text-base break-words">
            {displayedMessage}
            {shouldTruncate && !isExpanded && "..."}
          </p>
          {shouldTruncate && (
            <button
              onClick={toggleExpansion}
              className="text-gray-400 hover:text-gray-700 transition-all duration-300 ease-in-out text-sm font-semibold mt-1"
            >
              {isExpanded ? "Ver menos" : "Ver mais"}
            </button>
          )}
        </div>
      );
    })
  ) : (
    <div>Carregando...</div>
  );
};
