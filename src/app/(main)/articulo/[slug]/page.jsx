import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, getAuthorById } from "@lib/api";
import FormatContent from "@ui/FormatContent";
import SidebarMain from "@ui/sidebar/SidebarMain";
import ArticleReactions from "@ui/articles/ArticleReactions";
import AuthorPost from "@ui/articles/AuthorPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faRectangleAd,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

async function getArticle(slug) {
  try {
    return await getArticleBySlug(slug);
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Artículo no encontrado | Creatyum Media",
      description: "El artículo que buscas no existe.",
    };
  }

  return {
    title: `${article.title} | Creatyum Media`,
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    openGraph: {
      title: `${article.title} | Creatyum Media`,
      description:
        "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
      url: `https://creatyum.media/articulo/${article.slug}`,
      type: "article",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.cover.url}`,
          width: 1200,
          height: 630,
          alt: "Creatyum Media",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Creatyum Media`,
      description:
        "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
      images: [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.cover.url}`],
    },
    canonical: `https://creatyum.media/articulo/${article.slug}`,
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const authorId = article.redactions[0]?.id;
  let author = null;

  if (authorId) {
    try {
      author = await getAuthorById(authorId);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  }

  const localDate = new Date(article.date);
  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/El_Salvador",
  }).format(localDate);

  return (
    <article className="container mx-auto px-4 py-2 md:px-0">
      <h1>{article.title}</h1>

      <div className="grid grid-cols-12 gap-4 md:gap-12">
        <div className="col-span-12 md:col-span-8">
          {/* COVER */}
          <div className="mb-4 relative w-full aspect-w-1 aspect-h-1 sm:aspect-w-16 sm:aspect-h-9">
            {article.cover && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.cover.url}`}
                alt={article.title}
                width={1920}
                height={1080}
                className="rounded-2xl absolute inset-0 w-full h-full object-cover border border-black bg-black text-yellow dark:border-yellow md:rounded-3xl"
              />
            )}
          </div>

          {/* POST INFO */}
          <p className="mb-4">
            <FontAwesomeIcon icon={faCalendarDays} className="mr-1 w-4 h-4" />
            {formattedDate}

            <FontAwesomeIcon icon={faTag} className="ml-4 mr-1 w-4 h-4" />
            {article.categories.map((category, index) => (
              <span key={index}>{category.title}</span>
            ))}
          </p>

          <h2 className="font-extrabold text-5xl md:text-7xl">
            {article.title}
          </h2>

          <div className="py-8">
            <hr />
          </div>

          {/* SPONSORED BADGE */}
          {article.sponsored && (
            <Link
              href="/patrocinado"
              target="_blank"
              className="mb-8 bg-yellow font-bold text-black py-1 px-5 text-xs rounded-full border border-black inline-block hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black"
            >
              <FontAwesomeIcon
                icon={faRectangleAd}
                className="w-4 h-4 mr-2 align-middle"
              />
              CONTENIDO PATROCINADO
            </Link>
          )}

          <FormatContent blocks={article.content} />

          <div className="pt-8 pb-16">
            <hr />

            {/* REACTIONS */}
            <div className="my-2">
              <ArticleReactions articleId={article.slug} />
            </div>

            <hr />
          </div>

          {/* AUTHOR */}
          {author && <AuthorPost author={author} />}
        </div>

        {/* SIDEBAR */}
        <div className="col-span-12 md:col-span-4">
          <div>
            <SidebarMain />
          </div>
        </div>
      </div>
    </article>
  );
}
