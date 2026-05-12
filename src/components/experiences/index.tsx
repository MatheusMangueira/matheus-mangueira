"use client";

import Image from "next/image";

type ExperiencesProps = {
  office: string;
  company: string;
  img: string;
  year: string;
};

export const Experiences = ({
  company,
  img,
  office,
  year,
}: ExperiencesProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-4 py-5">
      <div className="flex min-w-0 items-center gap-4">
        <Image
          src={img}
          alt={company}
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-full object-cover ring-1 ring-border"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground md:text-base">
            {office}
          </p>
          <p className="truncate text-xs text-muted-foreground md:text-sm">
            {company}
          </p>
        </div>
      </div>

      <p className="shrink-0 tabular-nums text-xs text-muted-foreground md:text-sm">
        {year}
      </p>
    </div>
  );
};
