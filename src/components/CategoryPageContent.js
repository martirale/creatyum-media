"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarDays,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

function ArticleCard({ article }) {
  return (
    <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
      <Link href={`/articles/${article.attributes.slug}`}>
        <div className="relative w-full aspect-w-1 aspect-h-1">
          {article.attributes.cover?.data?.attributes?.url && (
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.cover.data.attributes.url}`}
              alt={article.attributes.title}
              className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
            />
          )}
        </div>
        <div className="p-4">
          <h2 className="text-3xl font-extrabold mb-2">
            {article.attributes.title}
          </h2>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} className="mr-1 w-4 h-4" />
            {new Intl.DateTimeFormat("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(article.attributes.date))}

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

export default function CategoryPageContent({ slug }) {
  const [data, setData] = useState({ category: null, articles: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/categories/${slug}?page=${currentPage}`);
        console.log(
          `Fetching data from: /api/categories/${slug}?page=${currentPage}`
        );

        if (!res.ok) {
          const errorMessage = `Error ${res.status}: ${res.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          setData({ category: null, articles: [] });
          return;
        }

        const result = await res.json();
        console.log("Fetch result:", result);

        if (result.error) {
          setError(result.error);
          setData({ category: null, articles: [] });
        } else {
          setData(result);
          setTotalPages(result.meta?.pagination?.pageCount || 1);
        }
      } catch (error) {
        console.error("Error fetching category and articles:", error);
        setError("Error al obtener datos.");
        setData({ category: null, articles: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      {/* Título de la Categoría */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold">
          {data.category?.attributes?.title ?? "Categoría no encontrada"}
        </h2>
      </div>

      {/* Artículos */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="text-center">Cargando artículos...</p>
        ) : (
          <>
            {error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : data.articles.length === 0 ? (
              <p className="text-center">
                No hay artículos para esta categoría.
              </p>
            ) : (
              data.articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
          </>
        )}
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-8">
        <div className="inline-flex -space-x-px rounded-md">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center px-3 py-2 md:px-4 text-sm border border-black rounded-l-3xl hover:bg-black hover:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black disabled:opacity-25"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`inline-flex items-center px-3 py-2 md:px-4 text-sm ${
                    currentPage === page
                      ? "bg-black text-yellow border border-black hover:bg-black hover:text-yellow dark:bg-yellow dark:text-black dark:border-yellow dark:hover:bg-yellow dark:hover:text-black"
                      : "bg-yellow border text-black border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black"
                  }`}
                >
                  {page}
                </button>
              );
            } else if (
              (page === currentPage - 2 && currentPage > 3) ||
              (page === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              return (
                <span
                  key={page}
                  className="inline-flex items-center px-3 py-2 text-sm border border-black dark:border-yellow"
                >
                  ...
                </span>
              );
            }
            return null;
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center px-3 py-2 md:px-4 text-sm border border-black rounded-r-3xl hover:bg-black hover:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black disabled:opacity-25"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
