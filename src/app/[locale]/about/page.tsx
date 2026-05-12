"use client";

import { Experiences } from "@/components/experiences";
import { ImageSection } from "@/components/imageSection";
import { Recommendations } from "@/components/messages";
import { Title } from "@/components/title";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from "next-intl";



const Page = () => {
  const t = useTranslations('About');


  const companies = [
    {
      name: "ActiveView",
      img: "/images/activeviewnetwork_logo.jpeg",
      office: "Software Engineer",
      year: "2026",
    },
    {
      name: "InHire - Software de Recrutamento e Seleção",
      img: "/images/inhire.jpg",
      office: "Software Engineer",
      year: "2024 - 2026",
    },
    {
      name: "Teamsoft Sistemas e Tecnologia",
      img: "/images/teamsoft.jpg",
      office: "Software Engineer",
      year: "2022 - 2023",
    },
    {
      name: "Hacking Force",
      img: "/images/hackingforce.jpg",
      office: "Software Engineer",
      year: "2022 - 2023",
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <main className="mx-auto min-h-screen max-w-3xl px-6 pb-24 pt-2 sm:px-8">
          <div className="w-full">
            <Title title={t("title")} goBack={true} />

            <ImageSection />
            <div className="pb-14">
              <p className="text-[0.9375rem] leading-[1.75] text-foreground/90">
                {t("description.1")}
                <br />
                <br />
                {t("description.2")}
              </p>
            </div>

            <div className="border-b border-border pb-14">
              <h2 className="mb-8 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t("career.title")}
              </h2>
              <div className="space-y-8 text-[0.9375rem] leading-[1.75] text-foreground/90">
                <p>{t("career.1")}</p>
                <p>{t("career.2")}</p>
                <p>{t("career.3")}</p>
                <p>{t("career.4")}</p>
                <p>{t("career.5")}</p>
              </div>

              <ul className="mt-12 divide-y divide-border border-t border-border">
                {companies.map((entry) => (
                  <li key={entry.name}>
                    <Experiences
                      company={entry.name}
                      img={entry.img}
                      office={entry.office}
                      year={entry.year}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="mb-2 mt-12 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {t("recommendations.title")}
            </h2>

            <Recommendations />
          </div>
        </main>
      </m.div>
    </LazyMotion>
  );
};
export default Page;
