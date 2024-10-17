import React from "react";
import NewsletterForm from "./NewsletterForm";

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
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Newsletter</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-6xl md:text-7xl font-extrabold mb-8">
            Newsletter
          </h2>
          <p className="mb-16 md:mb-0">Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="w-full md:w-1/2">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
