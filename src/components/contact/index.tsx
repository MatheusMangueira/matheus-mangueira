"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

const social = [
  {
    name: "Youtube",
    href: "https://www.youtube.com/channel/UC3D3Ju7eBlLQ4Oy9x7v8uFA",
  },
  { name: "GitHub", href: "https://github.com/MatheusMangueira" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/matheus-mangueira-504130230/",
  },
  { name: "X", href: "https://twitter.com/mangueira1628" },
];

export const Contact = () => {
  const t = useTranslations('HomePage');

  return (
    <div className="pt-6">
      <p className="text-lg pb-2">{t("contact")}</p>
      <ul className="flex">
        {social.map((social) => (
          <li key={social.name} className="mr-4">
            <Link
              target="_blank"
              className={`text-sm underline hover:text-gray-400 ease-in duration-300 ${social.name === "Youtube" ? "text-red-500" : ""
                }`}
              href={social.href}
            >
              {social.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
