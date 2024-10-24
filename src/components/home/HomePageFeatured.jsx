import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faFire,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { getArticles } from "@lib/api";

function FeaturedArticleCard({ article, isMain }) {
  if (isMain) {
    return (
      <div
        className="col-span-12 row-span-12 relative bg-cover bg-center rounded-2xl border border-black text-yellow aspect-w-4 aspect-h-5 md:col-span-2 md:row-span-2 md:aspect-w-5 md:aspect-h-4 dark:hover:text-black dark:border-yellow md:rounded-3xl"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.cover.url})`,
        }}
      >
        <Link href={`/articulo/${article.slug}`}>
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-2xl flex items-center justify-between p-4 text-center hover:bg-opacity-100 md:p-24 dark:hover:bg-yellow transition duration-300 md:rounded-3xl">
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
                }).format(new Date(article.date))}

                <FontAwesomeIcon icon={faTag} className="ml-4 mr-1 w-4 h-4" />
                {article.categories.map((category, index) => (
                  <span key={index}>{category.title}</span>
                ))}
              </p>
              <h2 className="text-5xl font-extrabold mt-2 md:text-7xl">
                {article.title}
              </h2>
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link href={`/articulo/${article.slug}`}>
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.cover.url}`}
              alt={article.title}
              width={480}
              height={270}
              className="w-16 h-16 object-cover rounded-full border border-black md:w-20 md:h-20 dark:border-yellow"
            />

            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-extrabold md:text-3xl hover:underline">
                {article.title}
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
                  timeZone: "America/El_Salvador",
                }).format(new Date(article.date))}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default async function FeaturedArticles({ className = "" }) {
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
      (article) => article.featured === true
    );

    allFeaturedArticles = [...allFeaturedArticles, ...featuredArticles];

    if (data.data.length < pageSize) {
      break;
    }

    page++;
  }

  const featuredArticles = allFeaturedArticles.slice(0, 7);

  return (
    <section className={`${className}`}>
      <div className="mb-4">
        <h2 className="font-extrabold text-5xl text-center md:text-9xl md:text-left">
          <FontAwesomeIcon
            icon={faFire}
            className="w-8 h-8 align-baseline md:w-24 md:h-24"
          />{" "}
          Destacados
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {featuredArticles.length > 0 && (
          <>
            {/* Artículo más reciente */}
            <FeaturedArticleCard article={featuredArticles[0]} isMain={true} />
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
      </div>
    </section>
  );
}
