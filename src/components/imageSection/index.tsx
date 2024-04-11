"use client";

import Image from "next/image";

import useMediaQuery from "@/hooks/use-media-query";
import Gallery from "../gallery";

export const ImageSection = () => {
  const { width } = useMediaQuery();

  return (
    <div className="w-full md:flex md:items-center p-2 ">
      <section className="flex w-full py-12 transition-all mdx:pb-6 mdx:pt-12">
        {!width ? null : width <= 920 ? (
          <div className="mb-8 w-full">
            <div
              className="animate-in"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              <Image
                src="/images/capa01.png"
                alt="Just me"
                width={324}
                height={139}
                className="pointer-events-none relative inset-0 h-60 -rotate-6 rounded-2xl bg-neutral-500 object-cover shadow-md transition-all"
                priority
              />
            </div>

            <div
              className="animate-in"
              style={{ "--index": 2 } as React.CSSProperties}
            >
              <Image
                src="/images/eu.jpg"
                alt="The street I grew up on"
                width={220}
                height={260}
                className="pointer-events-none absolute inset-0 top-12 left-[45%] w-48 rotate-6 rounded-2xl bg-neutral-500 object-cover shadow-md transition-all sm:left-[60%] md:w-56"
                priority
              />
            </div>
          </div>
        ) : (
          <div className="block w-full">
            <Gallery />
          </div>
        )}
      </section>
    </div>
  );
};
