"use client";

import { Title } from "@/components/title";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import mockProjects from "./mock/projects-mock.json";

const Page = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 4 }}
        exit={{ opacity: 0 }}
      >
        <main className="min-h-screen flex flex-col items-center md:p-24 p-8 ">
          <div className="max-w-[800px] w-full">

            <Title title="Projetos" goBack={true} />

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
                        {project.tecnology}
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
