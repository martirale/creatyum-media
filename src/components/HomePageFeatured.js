"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faFire,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { getArticles } from "../lib/api";

function FeaturedArticleCard({ article, isMain }) {
  if (isMain) {
    return (
      <div
        className="col-span-12 row-span-12 relative bg-cover bg-center rounded-3xl border border-black text-yellow aspect-w-1 aspect-h-1 md:col-span-2 md:row-span-2 md:aspect-w-5 md:aspect-h-4 dark:hover:text-black dark:border-yellow"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.cover.data.attributes.url})`,
        }}
      >
        <Link href={`/articulo/${article.attributes.slug}`}>
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-3xl flex items-center justify-between p-4 text-center hover:bg-opacity-100 md:p-24 dark:hover:bg-yellow duration-300">
            <div>
              <p>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="mr-1 w-4 h-4"
                />
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
              <h2 className="text-5xl font-extrabold mt-2 md:text-7xl">
                {article.attributes.title}
              </h2>
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link href={`/articulo/${article.attributes.slug}`}>
          <div className="flex items-center space-x-4 mb-4">
            {article.attributes.cover && article.attributes.cover.data && (
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.cover.data.attributes.url}`}
                alt={article.attributes.title}
                className="w-16 h-16 object-cover rounded-full border border-black md:w-20 md:h-20 dark:border-yellow"
              />
            )}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-extrabold md:text-3xl hover:underline">
                {article.attributes.title}
              </h3>
              <p className="text-sm mt-2">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="mr-1 w-3 h-3 align-baseline"
                />
                {new Intl.DateTimeFormat("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(article.attributes.date))}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default function FeaturedArticles() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFeaturedArticles();
  }, []);

  const fetchFeaturedArticles = async () => {
    setIsLoading(true);
    try {
      let allFeaturedArticles = [];
      let page = 1;
      const pageSize = 100;

      while (allFeaturedArticles.length < 7) {
        const data = await getArticles(page, pageSize, {
          sort: ["date:desc"],
          filters: {
            featured: {
              $eq: true,
            },
          },
        });

        const featuredArticles = data.data.filter(
          (article) => article.attributes.featured === true
        );

        allFeaturedArticles = [...allFeaturedArticles, ...featuredArticles];

        if (data.data.length < pageSize) {
          break;
        }

        page++;
      }

      setFeaturedArticles(allFeaturedArticles.slice(0, 7));
    } catch (error) {
      console.error("Error fetching featured articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8 md:mb-16">
      <div className="mb-5 md:mb-8">
        <h2 className="font-extrabold text-5xl text-center md:text-9xl md:text-left">
          <FontAwesomeIcon
            icon={faFire}
            className="w-8 h-8 align-baseline md:w-24 md:h-24"
          />{" "}
          Destacados
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {isLoading ? (
          <p className="text-center col-span-3 text-white">
            Cargando artículos destacados...
          </p>
        ) : (
          <>
            {featuredArticles.length > 0 && (
              <>
                {/* Artículo más reciente */}
                <FeaturedArticleCard
                  article={featuredArticles[0]}
                  isMain={true}
                />
                <div className="col-span-12 flex flex-col gap-4 md:col-span-1">
                  {/* Siguientes 4 artículos destacados */}
                  {featuredArticles.slice(1, 7).map((article) => (
                    <FeaturedArticleCard
                      key={article.id}
                      article={article}
                      isMain={false}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
