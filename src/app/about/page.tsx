"use client";

import { Experiences } from "@/components/experiences";
import { ImageSection } from "@/components/imageSection";
import { Recommendations } from "@/components/messages";
import { Title } from "@/components/title";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import Link from "next/link";

const company = [
  {
    name: "InHire - Software de Recrutamento e Seleção",
    img: "/images/inhire.jpg",
    office: "Software Engineer",
    year: "2024 - Atualmente",
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

const Page = () => {


  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <main className="min-h-screen flex flex-col items-center md:p-24 p-8 ">
          <div className="max-w-[800px] w-full">
            <Title title="Sobre" goBack={true} />

            <ImageSection />
            <div className="pb-12">
              <p>
                Sou o Matheus Mangueira, um desenvolvedor de software apaixonado
                por tecnologia. Minha curiosidade e vontade de aprender me
                levaram a explorar diversas stacks, sem ter uma preferida. O que
                me motiva é a oportunidade de resolver desafios complexos e
                encontrar soluções criativas para problemas do mundo real. Tenho
                uma afinidade especial com algoritmos e estruturas de dados,
                onde encontro verdadeira satisfação em enfrentar desafios
                técnicos.
                <br />
                <br />
                Além de desenvolver software, sou também criador de conteúdo.
                Mantenho um canal no YouTube onde compartilho o conhecimento
                adquirido ao longo da minha jornada profissional. É uma forma de
                retribuir à comunidade e ajudar outros desenvolvedores a
                crescerem em suas carreiras.
                <br />
                <br />
                Atualmente estou cursando Ciência da Computação e estou prestes
                a me formar. Estou ansioso para aplicar todo o conhecimento
                adquirido e continuar minha jornada profissional na área de
                tecnologia.
              </p>
            </div>

            <div className="border-b-2 border-gray-200 pb-12">
              <p className="text-gray-[#565656] text-lg underline pb-2">
                Carreira
              </p>
              <p className="pb-12">
                Com três anos de experiência como desenvolvedor de software,
                tive a oportunidade de contribuir significativamente para o
                desenvolvimento de aplicações robustas e inovadoras.
                <br />
                <br />
                Durante esse período, atuei na equipe de desenvolvimento da
                TeamSoft, onde desempenhei um papel fundamental no
                desenvolvimento de uma aplicação de controle de estoque
                altamente robusta. Trabalhar ao lado de profissionais
                qualificados foi enriquecedor, proporcionando-me um valioso
                aprendizado que contribuiu para o meu crescimento profissional.
                <br />
                <br />
                Além disso, tive a oportunidade de fazer parte da equipe da
                empresa de segurança cibernética Hacking Force, desde seus
                estágios iniciais. Durante essa fase inicial, fui fundamental no
                desenvolvimento de várias aplicações que contribuíram para o
                sucesso da empresa.
                <br />
                <br />
                Atualmente, trabalho como desenvolvedor de software na InHire, uma das empresas mais promissoras no setor de seleção e recrutamento de talentos. Utilizo tecnologias como AWS, DynamoDB, React, Node.js e TypeScript para desenvolver soluções inovadoras e escaláveis.
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
              Recomendações
            </p>

            <Recommendations />


          </div>
        </main>
      </m.div>
    </LazyMotion>
  );
};
export default Page;
