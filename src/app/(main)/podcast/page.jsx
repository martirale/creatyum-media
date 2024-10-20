import React from "react";
import PodcastPlayer from "@components/podcast/PodcastPlayer";
import PodcastButtons from "@components/podcast/PodcastButtons";
import TestimonialSlider from "@ui/testimonial/TestimonialSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: "Café Creativo Podcast | Creatyum Media",
  description:
    "Café Creativo es el podcast de Creatyum donde conversamos sobre temas relacionados a la industria creativa.",
  openGraph: {
    title: "Café Creativo Podcast | Creatyum Media",
    description:
      "Café Creativo es el podcast de Creatyum donde conversamos sobre temas relacionados a la industria creativa.",
    url: "https://creatyum.media/podcast",
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
    title: "Café Creativo Podcast | Creatyum Media",
    description:
      "Café Creativo es el podcast de Creatyum donde conversamos sobre temas relacionados a la industria creativa.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://creatyum.media/podcast",
};

export default function PodcastPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Café Creativo Podcast</h1>

      <PodcastPlayer />

      <div className="mt-16">
        <h2 className="text-4xl text-center font-extrabold md:text-7xl">
          <FontAwesomeIcon
            icon={faMugHot}
            className="w-8 h-8 align-baseline md:w-16 md:h-16"
          />{" "}
          Podcast Highlights
        </h2>
        <TestimonialSlider />
      </div>

      <PodcastButtons />
    </div>
  );
}
