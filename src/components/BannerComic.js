"use client";

import React, { useEffect, useState } from "react";
import { getComics } from "../lib/api";

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
        <div className="flex flex-wrap w-full items-center">
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            <div className="logo-layered"></div>
          </div>

          <div className="w-full md:w-1/2 p-4">
            {comicImageUrl && (
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${comicImageUrl}`}
                alt="creatyum-layered-comic"
                className="w-full h-auto object-cover rounded-3xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
