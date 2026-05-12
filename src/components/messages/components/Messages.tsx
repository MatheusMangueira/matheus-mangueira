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

  const avatarTint = (name: string): string => {
    const hues = [
      "hsl(220 12% 42%)",
      "hsl(215 11% 38%)",
      "hsl(25 10% 42%)",
      "hsl(160 8% 36%)",
      "hsl(250 9% 44%)",
    ];
    const i = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return hues[i % hues.length];
  };


  return messages ? (
    messages.map((item, index) => {
      const isExpanded = !!expandedMessages[index];
      const shouldTruncate = item.message.length > limit;
      const displayedMessage = isExpanded
        ? item.message
        : item.message.slice(0, limit);


      return (
        <div
          key={index}
          className="border-b border-border py-6 last:border-b-0"
        >
          <div className="flex items-start gap-3">
            {item.photoUrl ? (
              <Image
                src={item.photoUrl}
                alt={item.name}
                width={36}
                height={36}
                className="mt-0.5 hidden size-9 rounded-full object-cover ring-1 ring-border sm:block"
              />
            ) : (
              <div
                className="mt-0.5 hidden size-9 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-semibold text-primary-foreground ring-1 ring-border sm:flex"
                style={{
                  backgroundColor: avatarTint(item.name),
                }}
              >
                <span>{item.name[0].toUpperCase()}</span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug text-foreground md:text-base">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground"> — {item.relationship}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90 md:text-[0.9375rem]">
                {displayedMessage}
                {shouldTruncate && !isExpanded && "..."}
              </p>
              {shouldTruncate && (
                <button
                  type="button"
                  onClick={() => toggleExpansion(index)}
                  className="mt-2 text-sm text-muted-foreground underline decoration-border/60 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/40"
                >
                  {isExpanded ? t("see.1") : t("see.2")}
                </button>
              )}
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="text-sm text-muted-foreground">Carregando...</div>
  );
};
