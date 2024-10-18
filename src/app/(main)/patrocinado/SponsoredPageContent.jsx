"use client";

import React, { useState, useEffect } from "react";
import FormatContent from "@ui/FormatContent";
import { getSponsoredContent } from "@lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleAd } from "@fortawesome/free-solid-svg-icons";

const SponsoredPageContent = () => {
  const [content, setContent] = useState([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsoredContent = async () => {
      try {
        const data = await getSponsoredContent();
        setContent(data.content);
        setDate(data.date);
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

  const formattedDate = date
    ? new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date))
    : "Fecha no disponible";

  return (
    <div>
      <h2 className="font-extrabold text-5xl pb-16 md:text-7xl">
        Contenido patrocinado
        <FontAwesomeIcon
          icon={faRectangleAd}
          className="w-11 h-11 ml-4 align-middle md:w-16 md:h-16"
        />
      </h2>

      {/* UPDATE BADGE */}
      <div
        href="/patrocinado"
        target="_blank"
        className="mb-8 bg-yellow text-black py-1 px-5 text-xs rounded-full border border-black inline-block dark:bg-black dark:text-yellow dark:border-yellow"
      >
        <p className="font-bold uppercase">Actualizado: {formattedDate}</p>
      </div>

      <FormatContent blocks={content} />
    </div>
  );
};

export default SponsoredPageContent;
