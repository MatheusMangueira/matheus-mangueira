"use client";

import { Title } from "@/components/title";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Page = () => {
  const t = useTranslations('projects');

  const mockProjects = [
    {
      technology: "Java | Spring Boot",
      title: "microservice-easy-transfer",
      description: t("description.1"),
      href: "https://github.com/MatheusMangueira/microservice-easy-transfer"
    },
    {
      technology: "Noje.js | Express",
      title: "E-commerce-API",
      description: t("description.2"),
      href: "https://github.com/MatheusMangueira/E-commerce-API"
    },
    {
      technology: "Java | Mobile",
      title: "horizon-covidMonitor",
      description: t("description.3"),
      href: "https://github.com/MatheusMangueira/horizon-covidMonitor"
    },
    {
      technology: "Java",
      title: "CLI-Excel",
      description: t("description.4"),
      href: "https://github.com/MatheusMangueira/CLI-Excel"
    }
  ]


  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <main className="mx-auto min-h-screen max-w-3xl px-6 pb-24 pt-2 sm:px-8">
          <div className="w-full">

            <Title title={t("title")} goBack={true} />

            {mockProjects.map((project) => (
              <article
                key={project.title}
                className="border-b border-border py-12 last:border-b-0"
              >
                <header className="space-y-2">
                  <h2 className="font-serif text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                    {project.title}
                  </h2>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {project.technology}
                  </p>
                </header>

                <p className="mt-5 text-[0.9375rem] leading-relaxed text-foreground/90">
                  {project.description}
                </p>

                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={project.href}
                  className="mt-5 inline-block text-sm text-muted-foreground underline decoration-border/60 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/40"
                >
                  GitHub
                </Link>
              </article>
            ))}

          </div>
        </main>
      </m.div>
    </LazyMotion>
  );
};
export default Page;
