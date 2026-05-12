"use client";

import { Contact } from "@/components/contact";
import { Link } from '@/i18n/routing';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from 'next-intl';
import Image from "next/image";

const linkClass =
  "text-sm text-muted-foreground underline decoration-border/50 underline-offset-[5px] transition-colors hover:text-foreground hover:decoration-foreground/40";

export default function Home() {
  const t = useTranslations('HomePage');

  const routes = [
    { name: t("on"), href: "/about" },
    { name: t("cv"), href: `pdf/matheusMangueira.pdf` },
  ];

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col px-6 pb-20 pt-4 sm:px-8">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
            <div className="shrink-0 md:w-[280px]">
              <Image
                src="/images/eu.jpg"
                alt="Matheus Mangueira"
                width={300}
                height={300}
                priority
                className="aspect-square w-full max-w-[280px] rounded-2xl object-cover shadow-sm ring-1 ring-border grayscale transition-[filter,box-shadow] duration-500 ease-out hover:grayscale-0 hover:shadow-md md:max-w-none"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <header className="space-y-3 border-b border-border pb-8">
                <h1 className="font-serif text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-[2rem]">
                  {t('title')}
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t('subtitle')}
                </p>
              </header>

              <p className="text-[0.9375rem] leading-[1.7] text-foreground/90">
                {t('about')}
              </p>

              <nav
                className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-8"
                aria-label="Links"
              >
                {routes.map((route) => (
                  <Link
                    key={route.name}
                    className={linkClass}
                    download={
                      route.href.includes("matheusMangueira.pdf")
                        ? "currículo-matheus-mangueira.pdf"
                        : undefined
                    }
                    href={route.href}
                  >
                    {route.name}
                  </Link>
                ))}
              </nav>

              <Contact />
            </div>
          </div>
        </m.div>
      </LazyMotion>
    </main>
  );
}
