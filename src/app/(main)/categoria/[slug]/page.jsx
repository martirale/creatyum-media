import React from "react";
import { getCategoryWithArticles } from "../../../../lib/api";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarDays,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

function ArticleCard({ article }) {
  const localDate = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "America/El_Salvador",
  }).format(new Date(article.attributes.date));

  return (
    <div className="rounded-2xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black duration-300 md:rounded-3xl">
      <Link href={`/articulo/${article.attributes.slug}`}>
        <div className="relative w-full aspect-w-3 aspect-h-2 md:aspect-w-1 md:aspect-h-1">
          {article.attributes.cover?.data?.attributes?.url && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.cover.data.attributes.url}`}
              alt={article.attributes.title}
              width={960}
              height={540}
              className="rounded-t-2xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow md:rounded-t-3xl"
            />
          )}
        </div>
        <div className="p-4">
          <h2 className="text-3xl font-extrabold mb-2">
            {article.attributes.title}
          </h2>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} className="mr-1 w-4 h-4" />
            {localDate}

            <FontAwesomeIcon icon={faTag} className="ml-4 mr-1 w-4 h-4" />
            {article.attributes.categories.data.map((category, index) => (
              <span key={index}>{category.attributes.title}</span>
            ))}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = params;
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 20;

  try {
    const { category, articles, meta } = await getCategoryWithArticles(
      slug,
      page,
      pageSize
    );

    if (!category) {
      return <div>Categoría no encontrada</div>;
    }

    const totalPages = meta?.pagination?.pageCount || 1;

    return (
      <div className="container mx-auto px-4 py-2 md:px-0">
        <div>
          {/* Título de la Categoría */}
          <div className="mb-5 md:mb-8">
            <h2 className="font-extrabold text-5xl md:text-9xl">
              <FontAwesomeIcon
                icon={faTag}
                className="w-8 h-8 align-baseline md:w-24 md:h-24 md:align-middle"
              />{" "}
              {category.attributes.title}
            </h2>
          </div>

          {/* Artículos */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {articles.length === 0 ? (
              <p className="text-center">
                No hay artículos para esta categoría.
              </p>
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
                  href={`/categoria/${slug}?page=${page - 1}`}
                  passHref
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
                        href={`/categoria/${slug}?page=${pageNum}`}
                        passHref
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
                  href={`/categoria/${slug}?page=${page + 1}`}
                  passHref
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
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching category data:", error);
    return <div>Error al cargar la categoría y los artículos.</div>;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  try {
    const { category } = await getCategoryWithArticles(slug, 1, 1);
    if (!category) {
      return {
        title: "Categoría no encontrada — Creatyum Media",
        description: "La categoría que buscas no existe.",
      };
    }
    return {
      title: `${category.attributes.title} — Creatyum Media`,
      description:
        "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
      openGraph: {
        title: `${category.attributes.title} — Creatyum Media`,
        description:
          "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
        url: `https://creatyum.media/categoria/${category.attributes.slug}`,
        type: "article",
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
        title: `${category.attributes.title} — Creatyum Media`,
        description:
          "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
        images: ["https://creatyum.media/creatyum-default-cover.webp"],
      },
      canonical: `https://creatyum.media/categoria/${category.attributes.slug}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error — Creatyum Media",
      description: "Ha ocurrido un error al cargar la categoría.",
    };
  }
}
