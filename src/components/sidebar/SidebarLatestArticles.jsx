import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { getLatestArticles } from "@lib/api";
import SidebarContainer from "@ui/sidebar/SidebarContainer";

export default async function SidebarLatestArticles() {
  const data = await getLatestArticles(5);
  const articles = data;

  return (
    <SidebarContainer>
      <div className="-mb-6">
        <h2 className="font-extrabold text-lg mb-8 uppercase">
          Últimos Artículos
        </h2>

        <ul className="list-none p-0">
          {articles.map((article) => (
            <Link href={`/articulo/${article.slug}`} key={article.id}>
              <li className="flex items-center space-x-4 mb-8">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.cover.url}`}
                  alt={article.title}
                  width={480}
                  height={270}
                  className="w-16 h-16 object-cover rounded-full border border-yellow md:w-20 md:h-20 dark:border-black"
                />

                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-extrabold hover:underline">
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
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </SidebarContainer>
  );
}
