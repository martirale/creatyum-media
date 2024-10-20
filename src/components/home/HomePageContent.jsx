"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarDays,
  faTag,
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

export default function HomePageContent() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const fetchArticles = async (page) => {
    setIsLoading(true);
    try {
      const data = await getArticles(page, 12);
      setArticles(data.data);
      setTotalPages(data.meta.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="mb-5 md:mb-8">
        <h2 className="font-extrabold text-5xl text-center md:text-9xl md:text-left">
          Publicaciones recientes
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <p className="text-center">Cargando artículos...</p>
        ) : (
          <>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </>
        )}
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-8">
        <div className="inline-flex -space-x-px rounded-md">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center px-3 py-2 md:px-4 text-sm border border-black rounded-l-3xl hover:bg-black hover:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black disabled:opacity-25 transition duration-300"
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
                      ? "bg-black text-yellow border border-black hover:bg-black hover:text-yellow dark:bg-yellow dark:text-black dark:border-yellow dark:hover:bg-yellow dark:hover:text-black transition duration-300"
                      : "bg-yellow border text-black border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black transition duration-300"
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
                  className="inline-flex items-center px-2 py-2 md:px-4 text-sm border border-black dark:border-yellow"
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
            className="inline-flex items-center px-3 py-2 md:px-4 text-sm border border-black rounded-r-3xl hover:bg-black hover:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black disabled:opacity-25 transition duration-300"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
