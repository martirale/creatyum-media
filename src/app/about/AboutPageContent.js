"use client";

import { useState, useEffect } from "react";
import FormatContent from "../../components/FormatContent";
import AuthorList from "./AuthorList";

const AboutPageContent = () => {
  const [content, setContent] = useState([]);
  const [mission, setMission] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const resContent = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );

        if (!resContent.ok) {
          console.error(
            "Failed to fetch content:",
            resContent.status,
            resContent.statusText
          );
          throw new Error("Failed to fetch content");
        }

        const dataContent = await resContent.json();
        setContent(dataContent.data.attributes.content);

        // Fetch Mission
        const resMission = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/mission`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );

        if (!resMission.ok) {
          console.error(
            "Failed to fetch sidebar content:",
            resMission.status,
            resMission.statusText
          );
          throw new Error("Failed to fetch sidebar content");
        }

        const dataMission = await resMission.json();
        setMission(dataMission.data.attributes.content);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchAboutContent();
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
    <div className="grid grid-cols-12 gap-4 md:gap-12">
      {/* MAIN CONTENT */}
      <div className="col-span-12 md:col-span-8">
        <h2 className="font-extrabold text-7xl pb-16 md:text-9xl">
          Sobre Creatyum
        </h2>
        <FormatContent blocks={content} />
      </div>

      {/* SIDEBAR */}
      <div className="col-span-12 mt-8 md:col-span-4 md:mt-0">
        <div className="rounded-2xl border border-black bg-black text-yellow mb-4 p-4 md:p-8 dark:border-yellow dark:bg-yellow dark:text-black md:rounded-3xl">
          <h3 className="font-extrabold text-4xl mb-4">Misión</h3>
          {mission}
        </div>

        <div className="rounded-2xl border border-black bg-black text-yellow p-4 md:p-8 dark:border-yellow dark:bg-yellow dark:text-black md:rounded-3xl">
          <h3 className="font-extrabold text-4xl mb-4">Autores</h3>
          <AuthorList />
        </div>
      </div>
    </div>
  );
};

export default AboutPageContent;
