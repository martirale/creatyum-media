"use client";

import { useState, useEffect } from "react";
import FormatContent from "../../components/FormatContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleAd } from "@fortawesome/free-solid-svg-icons";

const SponsoredPageContent = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsoredContent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/sponsored`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch data:", res.status, res.statusText);
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setContent(data.data.attributes.content);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchSponsoredContent();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error fetching data</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-extrabold text-5xl pb-16 md:text-7xl">
        Contenido patrocinado
        <FontAwesomeIcon
          icon={faRectangleAd}
          className="w-11 h-11 ml-4 align-middle md:w-16 md:h-16"
        />
      </h2>
      <FormatContent blocks={content} />
    </div>
  );
};

export default SponsoredPageContent;
