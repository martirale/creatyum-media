import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faTag,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { getArticles } from "@lib/api";

function ArticleCard({ article }) {
  return (
    <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black transition duration-300 md:rounded-3xl">
      <Link href={`/articulo/${article.slug}`}>
        <div className="relative w-full aspect-w-3 aspect-h-2 md:aspect-w-1 md:aspect-h-1">
          {article.cover && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.cover.url}`}
              alt={article.title}
              width={960}
              height={540}
              className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
            />
          )}
        </div>
        <div className="p-4">
          <h2 className="text-3xl font-extrabold mb-2">{article.title}</h2>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} className="mr-1 w-4 h-4" />
            {new Intl.DateTimeFormat("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "America/El_Salvador",
            }).format(new Date(article.date))}

            <FontAwesomeIcon icon={faTag} className="ml-4 mr-1 w-4 h-4" />
            {article.categories.map((category, index) => (
              <span key={index}>{category.title}</span>
            ))}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default async function ArchivePage({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 20;
  const data = await getArticles(page, pageSize);
  const articles = data.data;
  const totalPages = Math.ceil(data.meta.pagination.total / pageSize);

  return (
    <section className="container mx-auto px-4 py-2 md:px-0">
      <div className="mb-5 md:mb-8">
        <h2 className="font-extrabold text-5xl text-center md:text-9xl md:text-left">
          Todos los artículos
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {articles.length === 0 ? (
          <p className="text-center">No se encontraron artículos.</p>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-8">
        <div className="inline-flex -space-x-px rounded-md">
          {page > 1 ? (
            <Link
              href={`/archivo?page=${page - 1}`}
              className="inline-flex items-center px-3 py-2 md:px-4 text-sm border border-black rounded-l-3xl hover:bg-black hover:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black transition duration-300"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </Link>
          ) : (
            <span className="inline-flex items-center px-3 py-2 md:px-4 text-sm border border-black rounded-l-3xl opacity-50 dark:border-yellow transition duration-300">
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => {
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <Link
                    key={pageNum}
                    href={`/archivo?page=${pageNum}`}
                    className={`inline-flex items-center px-3 py-2 md:px-4 text-sm ${
                      page === pageNum
                        ? "bg-black text-yellow border border-black hover:bg-black hover:text-yellow dark:bg-yellow dark:text-black dark:border-yellow dark:hover:bg-yellow dark:hover:text-black transition duration-300"
                        : "bg-yellow border text-black border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black transition duration-300"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              } else if (
                (pageNum === page - 2 && page > 3) ||
                (pageNum === page + 2 && page < totalPages - 2)
              ) {
                return (
                  <span
                    key={pageNum}
                    className="inline-flex items-center px-3 py-2 text-sm border border-black dark:border-yellow transition"
                  >
                    ...
                  </span>
                );
              }
              return null;
            }
          )}

          {page < totalPages ? (
            <Link
              href={`/archivo?page=${page + 1}`}
              className="inline-flex items-center px-3 py-2 md:px-4 text-sm border border-black rounded-r-3xl hover:bg-black hover:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black transition duration-300"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </Link>
          ) : (
            <span className="inline-flex items-center px-3 py-2 md:px-4 text-sm border border-black rounded-r-3xl opacity-50 dark:border-yellow transition duration-300">
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata() {
  return {
    title: "Todos los artículos | Creatyum Media",
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    openGraph: {
      title: "Todos los artículos | Creatyum Media",
      description:
        "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
      url: "https://creatyum.media/archivo",
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
      title: "Todos los artículos | Creatyum Media",
      description:
        "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
      images: ["https://creatyum.media/creatyum-default-cover.webp"],
    },
    canonical: "https://creatyum.media/archivo",
  };
}
