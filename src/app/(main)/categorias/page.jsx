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

      <div className="grid grid-cols-12 gap-4 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black duration-300 md:rounded-3xl">
            <Link href="/categoria/diseno">
              <div className="relative w-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/creatyum-media-diseno-cover.webp"
                  alt="creatyum-media-diseno-cover"
                  width={960}
                  height={540}
                  className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                  Diseño
                </h2>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black duration-300 md:rounded-3xl">
            <Link href="/categoria/industria">
              <div className="relative w-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/creatyum-media-industria-cover.webp"
                  alt="creatyum-media-industria-cover"
                  width={960}
                  height={540}
                  className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                  Industria Creativa
                </h2>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black duration-300 md:rounded-3xl">
            <Link href="/categoria/radar">
              <div className="relative w-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/creatyum-media-radar-cover.webp"
                  alt="creatyum-media-radar-cover"
                  width={960}
                  height={540}
                  className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                  Radar
                </h2>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black duration-300 md:rounded-3xl">
            <Link href="/categoria/entrevistas">
              <div className="relative w-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/creatyum-media-entrevistas-cover.webp"
                  alt="creatyum-media-entrevistas-cover"
                  width={960}
                  height={540}
                  className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                  Entrevistas
                </h2>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black duration-300 md:rounded-3xl">
            <Link href="/categoria/marcas">
              <div className="relative w-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/creatyum-media-marcas-cover.webp"
                  alt="creatyum-media-marcas-cover"
                  width={960}
                  height={540}
                  className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                  Marcas
                </h2>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black duration-300 md:rounded-3xl">
            <Link href="/categoria/ilustracion">
              <div className="relative w-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/creatyum-media-ilustracion-cover.webp"
                  alt="creatyum-media-ilustracion-cover"
                  width={960}
                  height={540}
                  className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                  Ilustración
                </h2>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black duration-300 md:rounded-3xl">
            <Link href="/categoria/foto">
              <div className="relative w-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/creatyum-media-foto-cover.webp"
                  alt="creatyum-media-foto-cover"
                  width={960}
                  height={540}
                  className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                  Fotografía
                </h2>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black duration-300 md:rounded-3xl">
            <Link href="/categoria/designer-class">
              <div className="relative w-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/creatyum-media-designer-class-cover.webp"
                  alt="creatyum-media-designer-class-cover"
                  width={960}
                  height={540}
                  className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                  The Designer Class
                </h2>
              </div>
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black duration-300 md:rounded-3xl">
            <Link href="/categoria/miscelaneo">
              <div className="relative w-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/creatyum-media-misc-cover.webp"
                  alt="creatyum-media-misc-cover"
                  width={960}
                  height={540}
                  className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                  Misceláneo
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
