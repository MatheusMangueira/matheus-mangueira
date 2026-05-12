"use client";

import { useTranslations } from "next-intl";
import { Link } from '@/i18n/routing';

type TitleProps = {
  title: string;
  goBack?: boolean;
};

export const Title = ({ title, goBack }: TitleProps) => {
  const t = useTranslations('guide');

  return (
    <div className="mb-10 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
      <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">
        {title}
      </h1>
      {goBack && (
        <Link
          href="/"
          className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("1")}
        </Link>
      )}
    </div>
  );
};
