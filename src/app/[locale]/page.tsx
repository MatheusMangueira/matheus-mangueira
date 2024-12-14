"use client";

import { Contact } from "@/components/contact";
import { Link } from '@/i18n/routing';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Home() {
  const t = useTranslations('HomePage');
  const params = useParams();

  console.log(params.locale);

  const routes = [
    { name: t("on"), href: "/about" },
    { name: t("projects"), href: "/projects" },
    { name: t("cv"), href: `pdf/matheusMangueira.pdf` },
  ];


  return (
    <main className="min-h-screen flex flex-col items-center md:p-24 p-8 ">
      <div className="max-w-[800px] w-full">
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="w-full md:flex md:items-center p-2 ">
              <div className="h-full w-full flex">
                <Image
                  src="/images/eu.jpg"
                  alt="Matheus Mangueira"
                  width={300}
                  height={300}
                  className="object-top object-cover w-72 h-72 rounded-full filter grayscale  ease-in duration-300 hover:filter-none"
                />
              </div>
              <div className="w-full p-4 flex flex-col justify-center">
                <div className="border-b-2 border-gray-200 pb-4">
                  <h1 className="font-medium md:text-xl text-lg">
                    {t('title')}
                  </h1>
                  <p className="font-light text-md">{t('subtitle')}</p>
                </div>

                <div>
                  <p className="font-light text-md mt-4">
                    {t('about')}
                  </p>
                </div>

                <div className="md:pt-12 pt-6 pb-4 border-b-2 border-gray-200">
                  <ul className="flex mt-4">
                    {routes.map((route) => (
                      <li key={route.name} className="mr-4">
                        <Link
                          className="underline hover:text-gray-400 ease-in duration-300 "
                          download={
                            route.href === `${params.locale}/pdf/matheusMangueira.pdf`
                              ? "currículo-matheus-mangueira.pdf"
                              : undefined
                          }
                          href={route.href}
                        >
                          {route.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Contact />
              </div>
            </div>
          </m.div>
        </LazyMotion>
      </div>
    </main>
  );
}
