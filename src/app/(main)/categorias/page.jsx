import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Categorías — Creatyum Media",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
  openGraph: {
    title: "Categorías — Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    url: "https://creatyum.media/categorias",
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
    title: "Categorías — Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://creatyum.media/categorias",
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Categorías</h1>

      <h2 className="font-extrabold text-5xl mb-5 md:text-9xl md:mb-8">
        Categorías
      </h2>
    </div>
  );
}
