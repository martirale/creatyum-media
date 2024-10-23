import React from "react";
import { getPrivacyPolicy } from "@lib/api";
import FormatContent from "@ui/FormatContent";

export async function generateMetadata() {
  try {
    const privacyData = await getPrivacyPolicy();
    const { title } = privacyData;

    if (!title) {
      return undefined;
    }

    return {
      title: `${title} | Creatyum Media`,
      description:
        "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
      openGraph: {
        title: `${title} | Creatyum Media`,
        description:
          "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
        url: "https://creatyum.media/privacidad",
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
        title: `${title} | Creatyum Media`,
        description:
          "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
        images: ["https://creatyum.media/creatyum-default-cover.webp"],
      },
      canonical: "https://creatyum.media/privacidad",
    };
  } catch (error) {
    console.error("Error fetching about content:", error);

    return undefined;
  }
}

export default async function SponsoredPage() {
  try {
    const privacyData = await getPrivacyPolicy();

    const { title, date, content } = privacyData;
    const formattedDate = date
      ? new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(date))
      : "Fecha no disponible";

    return (
      <div className="container mx-auto px-4 py-2 md:px-0">
        <h1>{title}</h1>

        <div className="grid grid-cols-12 gap-4 md:gap-12">
          {/* MAIN CONTENT */}
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-extrabold text-5xl pb-16 md:text-7xl">
              {title}
            </h2>

            {/* UPDATE BADGE */}
            <div
              href="/patrocinado"
              target="_blank"
              className="mb-8 bg-yellow text-black py-1 px-5 text-xs rounded-full border border-black inline-block dark:bg-black dark:text-yellow dark:border-yellow"
            >
              <p className="font-bold uppercase">
                Actualizado: {formattedDate}
              </p>
            </div>

            <FormatContent blocks={content} />
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
