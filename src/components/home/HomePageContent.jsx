import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faTag } from "@fortawesome/free-solid-svg-icons";
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

export default async function HomePageContent({ className = "" }) {
  const data = await getArticles(1, 12);
  const articles = data.data;

  return (
    <section className={`${className}`}>
      <div className="mb-5 md:mb-8">
        <h2 className="font-extrabold text-5xl text-center md:text-9xl md:text-left">
          Publicaciones recientes
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

      <div className="py-8 text-center md:pb-0">
        <Link
          href="/archivo"
          className="px-5 py-3 w-full rounded-full font-bold uppercase bg-black text-yellow border border-black hover:bg-yellow hover:text-black dark:bg-yellow dark:text-black dark:border-yellow dark:hover:bg-black dark:hover:text-yellow"
        >
          Todos los artículos
        </Link>
      </div>
    </section>
  );
}
