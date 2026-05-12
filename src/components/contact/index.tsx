"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

const social = [
  { name: "GitHub", href: "https://github.com/MatheusMangueira" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/matheusmangueira/",
  },
];

const linkClass =
  "text-sm text-muted-foreground underline decoration-border/50 underline-offset-[5px] transition-colors hover:text-foreground hover:decoration-foreground/40";

export const Contact = () => {
  const t = useTranslations('HomePage');

  return (
    <section className="space-y-3" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {t("contact")}
      </h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {social.map((item) => (
          <li key={item.name}>
            <Link
              target="_blank"
              rel="noreferrer"
              className={linkClass}
              href={item.href}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
