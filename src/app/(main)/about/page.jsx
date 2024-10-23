import React from "react";
import FormatContent from "@ui/FormatContent";
import AuthorList from "./AuthorList";
import { getAboutContent, getMissionContent } from "@lib/api";
import SidebarContainer from "@ui/sidebar/SidebarContainer";

export const metadata = {
  title: "Sobre Creatyum | Creatyum Media",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
  openGraph: {
    title: "Sobre Creatyum | Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    url: "https://creatyum.media/about",
    type: "website",
    images: [
      {
        url: "https://creatyum.media/creatyum-default-cover.webp",
        width: 1200,
        height: 630,
        alt: "Creatyum Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Creatyum | Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://creatyum.media/about",
};

export default async function AboutPage() {
  try {
    const aboutData = await getAboutContent();
    const missionContent = await getMissionContent();

    const { title, description, content } = aboutData;

    return (
      <div className="container mx-auto px-4 py-2 md:px-0">
        <h1>{title}</h1>

        <div className="grid grid-cols-12 gap-4 md:gap-12">
          {/* MAIN CONTENT */}
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-extrabold text-7xl pb-16 md:text-9xl">
              {title}
            </h2>

            <p className="text-2xl mb-8">{description}</p>

            <FormatContent blocks={content} />
          </div>

          {/* SIDEBAR */}
          <div className="col-span-12 mt-8 md:col-span-4 md:mt-0">
            <SidebarContainer>
              <h3 className="font-extrabold text-4xl mb-4">Misión</h3>
              <p>{missionContent}</p>
            </SidebarContainer>

            <SidebarContainer>
              <h3 className="font-extrabold text-4xl mb-4">Autores</h3>
              <AuthorList />
            </SidebarContainer>
          </div>
        </div>
      </div>
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
