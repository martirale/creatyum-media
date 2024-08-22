import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticleBySlug } from "../../../lib/api";
import FormatContent from "../../../components/FormatContent";
import SidebarMain from "../../../components/SidebarMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faRectangleAd,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
      title: "Artículo no encontrado — Creatyum Media",
      description: "El artículo que buscas no existe.",
    };
  }

  return {
    title: `${article.attributes.title} — Creatyum Media`,
    description:
      "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
    openGraph: {
      title: `${article.attributes.title} — Creatyum Media`,
      description:
        "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
      url: `https://creatyum.media/articulo/${article.attributes.slug}`,
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
      title: `${article.attributes.title} — Creatyum Media`,
      description:
        "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
      images: ["https://creatyum.media/creatyum-default-cover.webp"],
    },
    canonical: `https://creatyum.media/articulo/${article.attributes.slug}`,
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const author = article.attributes.redactions.data[0]?.attributes;
  const profileImageUrl = author?.profile?.data?.attributes?.url;

  return (
    <article className="container mx-auto px-4 py-2 md:px-0">
      <h1>{article.attributes.title}</h1>

      <div className="grid grid-cols-12 gap-4 md:gap-12">
        <div className="col-span-12 md:col-span-8">
          {/* COVER */}
          <div className="mb-4 relative w-full aspect-w-1 aspect-h-1 sm:aspect-w-16 sm:aspect-h-9">
            {article.attributes.cover && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.cover.data.attributes.url}`}
                alt={article.attributes.title}
                width={1920}
                height={1080}
                className="rounded-3xl absolute inset-0 w-full h-full object-cover border border-black bg-black text-yellow dark:border-yellow"
              />
            )}
          </div>

          {/* POST INFO */}
          <p className="mb-4">
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

          <h2 className="font-extrabold text-5xl md:text-7xl">
            {article.attributes.title}
          </h2>

          <div className="py-8">
            <hr />
          </div>

          {/* SPONSORED BADGE */}
          {article.attributes.sponsored && (
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

          <FormatContent blocks={article.attributes.content} />

          <div className="py-8">
            <hr />
          </div>

          {/* AUTHOR */}
          <div className="mb-16">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              {profileImageUrl && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${profileImageUrl}`}
                  alt={author?.name || "Author"}
                  width={1080}
                  height={1080}
                  className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start"
                />
              )}
              <div className="flex flex-col">
                <h4 className="text-3xl text-center font-extrabold mt-1 mb-2 hover:underline md:text-left">
                  {article.attributes.redactions.data.map((author, index) => (
                    <Link key={index} href={`/autor/${author.attributes.slug}`}>
                      {author.attributes.name}
                    </Link>
                  ))}
                </h4>
                <p className="text-center md:text-left">
                  {article.attributes.redactions.data.map((author, index) => (
                    <span key={index}>{author.attributes.description}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>
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
