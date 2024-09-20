import React from "react";
import PrivacyPageContent from "./PrivacyPageContent";

export const metadata = {
  title: "Política de privacidad — Creatyum Media",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
  openGraph: {
    title: "Política de privacidad — Creatyum Media",
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
    title: "Política de privacidad — Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://creatyum.media/privacidad",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Política de privacidad</h1>

      <div className="grid grid-cols-12 gap-4 md:gap-12">
        <div className="col-span-12 md:col-span-8">
          <PrivacyPageContent />
        </div>
      </div>
    </div>
  );
}
