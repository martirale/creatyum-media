import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoLayered from "@logos/LogoLayered";
import { getLatestComicImage } from "@lib/api";

export default async function BannerComic({ className = "" }) {
  try {
    const imageUrl = await getLatestComicImage();

    return (
      <section
        className={`rounded-2xl bg-black text-yellow dark:bg-yellow dark:text-black md:p-8 md:rounded-3xl inverse-select ${className}`}
      >
        <div className="flex flex-wrap items-center w-full">
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            <LogoLayered className="fill-yellow w-64 h-[122px] md:w-[512px] md:h-auto dark:fill-black" />
            <div className="text-center mt-8 md:px-16">
              <p className="mb-8">
                <b>Layered</b> es un webcomic que sigue a <b>Kara</b>, una
                diseñadora gráfica que navega con humor y sarcasmo las
                situaciones cotidianas y clichés del mundo del diseño.
              </p>
              <p>
                <b>
                  ¡Nueva viñeta cada semana!
                  <br />
                  <Link
                    href="https://www.instagram.com/explore/tags/creatyumlayered/"
                    rel="noreferrer noopener"
                    target="_blank"
                    className="underline"
                  >
                    #creatyumlayered
                  </Link>
                </b>
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4 md:p-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
              alt="creatyum-layered-comic"
              width={1080}
              height={1080}
              className="w-full h-auto object-cover rounded-2xl border border-yellow dark:border-black md:rounded-3xl"
            />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div>
        <h1>Error fetching data</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
