import React from "react";
import HeroDiez from "./HeroDiez";
import TimeLine from "./TimeLine";
import CountdownDiez from "./CountdownDiez";

export const metadata = {
  title: "Décimo aniversario — Creatyum Media",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
  openGraph: {
    title: "Décimo aniversario — Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    url: "https://creatyum.media/diez",
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
    title: "Décimo aniversario — Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://creatyum.media/diez",
};

export default function AniversaryLanding() {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <h1>Décimo aniversario</h1>

      <HeroDiez />

      <CountdownDiez />

      <TimeLine />
    </div>
  );
}
