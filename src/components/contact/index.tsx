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
              className={`text-sm underline hover:text-gray-400 ease-in duration-300 ${social.name === "LinkedIn" ? "text-blue-500" : ""
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
