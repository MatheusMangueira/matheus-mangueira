import { useState } from "react";

type MessagesProps = {
  name: string;
  message: string;
  relationship: string;
  date?: string;
};

export const Messages = ({
  date,
  message,
  name,
  relationship,
}: MessagesProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 100;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldTruncate = message.length > limit;
  const displayedMessage = isExpanded ? message : message.slice(0, limit);

  return (
    <div className="my-4">
      <p className="text-lg">
        <span className="font-bold">{name}</span> - {relationship}
      </p>
      <p className="text-gray-400 pb-2">{date}</p>
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
};
