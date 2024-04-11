"use client";

import Image from "next/image";

type ExperiencesProps = {
  office: string;
  company: string;
  img: string;
  year: string;
};

export const Experiences = ({
  company,
  img,
  office,
  year,
}: ExperiencesProps) => {
  return (
    <div className="flex w-full justify-between items-center  ">
      <div className="flex items-center ">
        <Image
          src={img}
          alt={company}
          width={70}
          height={760}
          className="rounded-full object-cover mr-6 my-4"
        />
        <div>
          <p className="md:text-lg text-base text-gray-900">{office}</p>
          <p className="md:text-sm text-xs text-gray-400">{company}</p>
        </div>
      </div>

      <p className="md:text-base text-sm text-gray-400">{year}</p>
    </div>
  );
};
