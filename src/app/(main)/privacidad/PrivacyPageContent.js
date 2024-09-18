"use client";

import { useState, useEffect } from "react";
import FormatContent from "../../../components/FormatContent";

const PrivacyPageContent = () => {
  const [content, setContent] = useState([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyContent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/privacy`,
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
        setDate(data.data.attributes.date);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchPrivacyContent();
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
        Política de privacidad
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

export default PrivacyPageContent;
