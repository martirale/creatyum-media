"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const SidebarLatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLatestArticles();
  }, []);

  const fetchLatestArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/articles/latest");
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching latest articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="font-extrabold text-4xl mb-4">Últimos Artículos</h2>
      {isLoading ? (
        <p className="text-center">Cargando artículos...</p>
      ) : (
        <ul className="list-none p-0">
          {articles.map((article) => (
            <Link href={`/articles/${article.attributes.slug}`}>
              <li class="flex items-center space-x-4 mb-4">
                {article.attributes.cover && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.cover.data.attributes.url}`}
                    alt={article.attributes.title}
                    className="w-14 h-14 object-cover rounded-full border border-black md:w-16 md:h-16 dark:border-yellow"
                  />
                )}
                <div class="flex flex-col justify-center">
                  <h3 class="text-2xl">{article.attributes.title}</h3>
                  <p class="text-sm font-bold">
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
  );
};

export default SidebarLatestArticles;
