"use client";

import React, { useState, useEffect } from "react";
import FormatContent from "../../../components/ui/FormatContent";
import AuthorList from "./AuthorList";
import {
  getAboutContent,
  getDescriptionContent,
  getMissionContent,
} from "../../../lib/api";

const AboutPageContent = () => {
  const [description, setDescription] = useState([]);
  const [content, setContent] = useState([]);
  const [mission, setMission] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutPageData = async () => {
      try {
        const descriptionContent = await getDescriptionContent();
        setDescription(descriptionContent);

        const aboutContent = await getAboutContent();
        setContent(aboutContent);

        const missionContent = await getMissionContent();
        setMission(missionContent);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchAboutPageData();
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

        <p className="text-2xl mb-8">{description}</p>

        <FormatContent blocks={content} />
      </div>

      {/* SIDEBAR */}
      <div className="col-span-12 mt-8 md:col-span-4 md:mt-0">
        <div className="rounded-2xl border border-black bg-black text-yellow mb-4 p-4 dark:border-yellow dark:bg-yellow dark:text-black md:rounded-3xl">
          <h3 className="font-extrabold text-4xl mb-4">Misión</h3>
          <p>{mission}</p>
        </div>

        <div className="rounded-2xl border border-black bg-black text-yellow p-4 dark:border-yellow dark:bg-yellow dark:text-black md:rounded-3xl">
          <h3 className="font-extrabold text-4xl mb-4">Autores</h3>
          <AuthorList />
        </div>
      </div>
    </div>
  );
};

export default AboutPageContent;
