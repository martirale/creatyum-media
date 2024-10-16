import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Categorías | Creatyum Media",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
  openGraph: {
    title: "Categorías | Creatyum Media",
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
    title: "Categorías | Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://creatyum.media/categorias",
};

function CategoryCard({ category }) {
  return (
    <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black transition duration-300 md:rounded-3xl">
      <Link href={category.url}>
        <div className="relative w-full aspect-w-5 aspect-h-4 md:aspect-w-1 md:aspect-h-1">
          <Image
            src={category.img}
            alt={category.name}
            width={960}
            height={540}
            className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
          />
        </div>
        <div className="p-2 md:p-4">
          <h2 className="text-4xl text-center font-extrabold md:text-5xl">
            {category.name}
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default function CategoriesPage() {
  const categories = [
    {
      id: "1",
      name: "Diseño",
      url: "/categoria/diseno",
      img: "/images/creatyum-media-diseno-cover.webp",
    },
    {
      id: "2",
      name: "Industria Creativa",
      url: "/categoria/industria",
      img: "/images/creatyum-media-industria-cover.webp",
    },
    {
      id: "3",
      name: "Radar",
      url: "/categoria/radar",
      img: "/images/creatyum-media-radar-cover.webp",
    },
    {
      id: "4",
      name: "Entrevistas",
      url: "/categoria/entrevistas",
      img: "/images/creatyum-media-entrevistas-cover.webp",
    },
    {
      id: "5",
      name: "Marcas",
      url: "/categoria/marcas",
      img: "/images/creatyum-media-marcas-cover.webp",
    },
    {
      id: "6",
      name: "Ilustración",
      url: "/categoria/ilustracion",
      img: "/images/creatyum-media-ilustracion-cover.webp",
    },
    {
      id: "7",
      name: "Fotografía",
      url: "/categoria/foto",
      img: "/images/creatyum-media-foto-cover.webp",
    },
    {
      id: "8",
      name: "The Designer Class",
      url: "/categoria/designer-class",
      img: "/images/creatyum-media-designer-class-cover.webp",
    },
    {
      id: "9",
      name: "Misceláneo",
      url: "/categoria/miscelaneo",
      img: "/images/creatyum-media-misc-cover.webp",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Categorías</h1>

      <h2 className="font-extrabold text-5xl mb-5 md:text-9xl md:mb-8">
        Categorías
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
