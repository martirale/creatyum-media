import { notFound } from "next/navigation";
import FormatContent from "../../../components/FormatContent";
import SidebarMain from "../../../components/SidebarMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faTag } from "@fortawesome/free-solid-svg-icons";

async function getArticle(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch data");
  }
  return res.json();
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
    description: "Revista digital para diseñadores y creativos en Latam.",
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
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.cover.data.attributes.url}`}
                alt={article.attributes.title}
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

          <FormatContent blocks={article.attributes.content} />

          <div className="py-8">
            <hr />
          </div>

          {/* AUTHOR */}
          <div className="mb-16 md:mb-0">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              {profileImageUrl && (
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${profileImageUrl}`}
                  alt={author?.name || "Author"}
                  className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-300"
                />
              )}
              <div className="flex flex-col">
                <h4 className="text-3xl text-center font-extrabold mt-1 mb-2 md:text-left">
                  {article.attributes.redactions.data.map((author, index) => (
                    <span key={index}>{author.attributes.name}</span>
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
          <div className="rounded-3xl border border-solid border-black dark:border-yellow">
            <SidebarMain />
          </div>
        </div>
      </div>
    </article>
  );
}
