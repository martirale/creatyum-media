"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getLatestArticles } from "../lib/api";

const SidebarLatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLatestArticles();
  }, []);

  const fetchLatestArticles = async () => {
    setIsLoading(true);
    try {
      const data = await getLatestArticles(5);
      setArticles(data);
    } catch (error) {
      console.error("Error fetching latest articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl text-yellow bg-black border border-black dark:text-black dark:bg-yellow dark:border-yellow">
      <div className="p-4 -mb-6 md:p-8">
        <h2 className="font-extrabold text-lg mb-8 uppercase">
          Últimos Artículos
        </h2>
        {isLoading ? (
          <p className="text-center">Cargando artículos...</p>
        ) : (
          <ul className="list-none p-0">
            {articles.map((article) => (
              <Link
                href={`/articulo/${article.attributes.slug}`}
                key={article.id}
              >
                <li className="flex items-center space-x-4 mb-8">
                  {article.attributes.cover &&
                    article.attributes.cover.data && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.cover.data.attributes.url}`}
                        alt={article.attributes.title}
                        className="w-16 h-16 object-cover rounded-full border border-yellow md:w-20 md:h-20 dark:border-black"
                      />
                    )}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-extrabold hover:underline">
                      {article.attributes.title}
                    </h3>
                    <p className="text-sm mt-2">
                      {new Intl.DateTimeFormat("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(article.attributes.date))}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidebarLatestArticles;
