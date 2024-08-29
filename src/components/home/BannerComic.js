"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Logo";
import { getComics } from "../../lib/api";

const TwoColumnLayout = () => {
  const [comicImageUrl, setComicImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const comics = await getComics();
        if (comics.length > 0) {
          setComicImageUrl(comics[0].imageUrl);
        } else {
          setError("No comics found");
        }
      } catch (err) {
        console.error("Error fetching comic:", err);
        setError("Failed to load comic image");
      } finally {
        setLoading(false);
      }
    };

    fetchComic();
  }, []);

  return (
    <div className="mt-8 md:mt-16">
      <div className="rounded-3xl bg-black text-yellow dark:bg-yellow dark:text-black md:p-8">
        <div className="flex flex-wrap items-center w-full">
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            <div className="w-64 h-[122px] md:w-[512px] md:h-auto">
              <Logo filename="creatyum-layered-logo.svg" />
            </div>
            <div className="text-center mt-8 md:px-16">
              <p className="mb-8">
                <b>Layered</b> es un webcomic que sigue a <b>Cara</b>, una
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

          <div className="w-full md:w-1/2 p-4">
            {comicImageUrl && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${comicImageUrl}`}
                alt="creatyum-layered-comic"
                width={1080}
                height={1080}
                className="w-full h-auto object-cover rounded-3xl border border-yellow dark:border-black"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
