"use client";

import { Experiences } from "@/components/experiences";
import { ImageSection } from "@/components/imageSection";
import { Recommendations } from "@/components/messages";
import { Title } from "@/components/title";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";



const Page = () => {
  const t = useTranslations('About');


  const company = [
    {
      name: "InHire - Software de Recrutamento e Seleção",
      img: "/images/inhire.jpg",
      office: "Software Engineer",
      year: "2024",
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
        <main className="min-h-screen flex flex-col items-center md:p-24 p-8 ">
          <div className="max-w-[800px] w-full">
            <Title title={t("title")} goBack={true} />

            <ImageSection />
            <div className="pb-12">
              <p>
                {t("description.1")}
                <br />
                <br />
                {t("description.2")}

                <br />
                <br />
                {t("description.3")}

              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-12">
              <p className="text-gray-[#565656] text-lg underline pb-2">
                {t("career.title")}
              </p>
              <p className="pb-12">
                {t("career.1")}
                <br />
                <br />
                {t("career.2")}
                <br />
                <br />
                {t("career.3")}
                <br />
                <br />
                {t("career.4")}
              </p>

              {company.map((company) => (
                <Experiences
                  key={company.name}
                  company={company.name}
                  img={company.img}
                  office={company.office}
                  year={company.year}
                />
              ))}
            </div>

            <p className="text-lg text-gray-[#565656] underline pt-4">
              {t("recommendations.title")}
            </p>

            <Recommendations />


          </div>
        </main>
      </m.div>
    </LazyMotion>
  );
};
export default Page;
