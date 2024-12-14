import { useState } from "react";
import { Message } from "../type";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface MessagesProps {
  messages: Message[];
}

export const Messages = ({ messages }: MessagesProps) => {
  const [expandedMessages, setExpandedMessages] = useState<Record<number, boolean>>({});
  const limit = 100;

  const t = useTranslations('About');


  const toggleExpansion = (index: number) => {
    setExpandedMessages(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const generateRandomColor = (name: string): string => {
    const colors = [
      "#FFB6C1", "#8A2BE2", "#5F9EA0", "#FF7F50", "#6495ED", "#DC143C", "#00CED1",
      "#FFD700", "#FF69B4", "#87CEFA", "#32CD32", "#FF6347", "#6A5ACD", "#4682B4",
    ];

    const charCode = name.charCodeAt(0);
    const colorIndex = charCode % colors.length;

    return colors[colorIndex];
  }


  return messages ? (
    messages.map((item, index) => {
      const isExpanded = !!expandedMessages[index];
      const shouldTruncate = item.message.length > limit;
      const displayedMessage = isExpanded
        ? item.message
        : item.message.slice(0, limit);


      return (
        <div key={index} className="my-4 pb-2 border-b-2 border-gray-200 ">

          <div className="flex items-center gap-2">
            {item.photoUrl ? (
              <Image
                src={item.photoUrl}
                alt={item.name}
                width={32}
                height={32}
                className="rounded-full object-cover sm:block hidden"
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full  items-center justify-center text-white font-bold sm:flex hidden"
                style={{
                  backgroundColor: generateRandomColor(item.name),
                }}
              >
                <span className="text-md">{item.name[0].toUpperCase()}</span>
              </div>
            )}
            <p className="text-lg truncate">
              <span className="font-bold">{item.name}</span> - {item.relationship}
            </p>
          </div>



          <p className="text-gray-400 pb-2">{item.date}</p>
          <p className="text-base break-words">
            {displayedMessage}
            {shouldTruncate && !isExpanded && "..."}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => toggleExpansion(index)}
              className="text-gray-400 hover:text-gray-700 transition-all duration-300 ease-in-out text-sm font-semibold mt-1"
            >
              {isExpanded ? t("see.1") : t("see.2")}
            </button>
          )}
        </div>
      )
    })
  ) : (
    <div>Carregando...</div>
  );
};
