import React from "react";
import BannerNewsletter from "@components/banner/BannerNewsletter";
import HeroNewsletter from "@components/hero/HeroNewsletter";
import ValuesBadges from "@components/newsletter/ValuesBadges";

export const metadata = {
  title: "Newsletter | Creatyum Media",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
  openGraph: {
    title: "Newsletter | Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    url: "https://creatyum.media/newsletter",
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
    title: "Newsletter | Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://creatyum.media/newsletter",
};

export default function NewsletterPage() {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <h1>Newsletter</h1>

      <HeroNewsletter className="mb-8" />

      <BannerNewsletter className="mb-8" />

      <ValuesBadges />
    </div>
  );
}
