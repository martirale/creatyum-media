import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoLayered from "@logos/LogoLayered";
import { getLatestComicImage } from "@lib/api";
import SidebarContainer from "@ui/sidebar/SidebarContainer";

export default async function SidebarComic() {
  try {
    const imageUrl = await getLatestComicImage();

    return (
      <SidebarContainer>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center w-full">
            <div className="w-full p-4 flex flex-col items-center">
              <LogoLayered className="fill-yellow w-64 h-[122px] dark:fill-black" />
              <div className="text-center mt-8">
                <p className="mb-8">
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

            <div className="w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
                alt="creatyum-layered-comic"
                width={512}
                height={512}
                className="w-full h-auto object-cover rounded-2xl border border-yellow dark:border-black md:rounded-3xl"
              />
            </div>
          </div>
        </div>
      </SidebarContainer>
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
