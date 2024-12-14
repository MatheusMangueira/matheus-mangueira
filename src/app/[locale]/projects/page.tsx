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
        animate={{ opacity: 4 }}
        exit={{ opacity: 0 }}
      >
        <main className="min-h-screen flex flex-col items-center md:p-24 p-8 ">
          <div className="max-w-[800px] w-full">

            <Title title={t("title")} goBack={true} />

            {mockProjects.map((project) => (
              <div
                key={project.title}
                className="w-full pt-12 border-b-2 border-gray-200 pb-4"
              >
                <div>
                  <div className="flex w-ful justify-between">
                    <p className="text-lg text-gray-500 ">
                      {project.title} ---{" "}
                      <span className="text-green-500">
                        {project.technology}
                      </span>
                    </p>
                  </div>

                  <p className="pt-2">{project.description}</p>

                  <Link target="_blank" href={project.href}>
                    <p className="underline pt-2 text-sm text-gray-400 hover:text-gray-500 ease-in duration-300 ">
                      GitHub
                    </p>
                  </Link>
                </div>
              </div>
            ))}

          </div>
        </main>
      </m.div>
    </LazyMotion>
  );
};
export default Page;
