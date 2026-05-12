"use client";

import Image from "next/image";

import useMediaQuery from "@/hooks/use-media-query";
import Gallery from "../gallery";

export const ImageSection = () => {
  const { width } = useMediaQuery();

  return (
    <div className="w-full md:flex md:items-center md:px-0">
      <section className="flex w-full py-10 transition-all mdx:pb-6 mdx:pt-10">
        {!width ? null : width <= 920 ? (
          /* Segunda foto é absolute: não ocupa fluxo — padding inferior evita sobrepor o texto abaixo */
          <div className="relative mb-8 w-full min-h-[15rem] pb-36 sm:min-h-[16rem] sm:pb-40">
            <div
              className="animate-in"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              <Image
                src="/images/capa01.png"
                alt="Just me"
                width={324}
                height={139}
                className="pointer-events-none relative inset-0 h-60 -rotate-6 rounded-2xl bg-muted object-cover shadow-sm ring-1 ring-border transition-all"
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
                width={120}
                height={160}
                className="pointer-events-none absolute left-[45%] top-12 w-48 max-w-[45vw] rotate-6 rounded-2xl bg-muted object-cover object-top shadow-sm ring-1 ring-border transition-all sm:left-[58%] sm:max-w-none md:w-56"
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
