"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { Contact } from "@/components/contact";

const routes = [
  { name: "Sobre", href: "/about" },
  { name: "Projetos", href: "/projects" },
  { name: "Currículo", href: "/pdf/matheusMangueira.pdf" },
];

export default function Home() {
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
                    Eu sou o Matheus Mangueira
                  </h1>
                  <p className="font-light text-md">Engenheiro de software</p>
                </div>

                <div>
                  <p className="font-light text-md mt-4">
                    Criador de conteúdo apaixonado, contribuo para a comunidade
                    dev compartilhando conhecimento, enquanto colaboro em
                    projetos tecnológicos, alimentando minha paixão pela
                    inovação.
                  </p>
                </div>

                <div className="md:pt-12 pt-6 pb-4 border-b-2 border-gray-200">
                  <ul className="flex mt-4">
                    {routes.map((route) => (
                      <li key={route.name} className="mr-4">
                        <a
                          className="underline hover:text-gray-400 ease-in duration-300 "
                          download={
                            route.href === "/pdf/matheusMangueira.pdf"
                              ? "currículo-matheus-mangueira.pdf"
                              : undefined
                          }
                          href={route.href}
                        >
                          {route.name}
                        </a>
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
