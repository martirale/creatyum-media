"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getComics } from "../lib/api";

const SidebarComic = () => {
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
    <div>
      <div className="rounded-3xl text-yellow bg-black border border-black dark:text-black dark:bg-yellow dark:border-yellow">
        <div className="p-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center w-full">
              <div className="w-full p-4 flex flex-col items-center">
                <div className="logo-layered-sidebar"></div>
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
                {comicImageUrl && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${comicImageUrl}`}
                    alt="creatyum-layered-comic"
                    width={512}
                    height={512}
                    className="w-full h-auto object-cover rounded-3xl border border-yellow dark:border-black"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComic;
