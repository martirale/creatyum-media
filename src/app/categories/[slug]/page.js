import { getCategoryWithArticles } from "../../../lib/api";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarDays,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

function ArticleCard({ article }) {
  return (
    <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
      <Link href={`/articles/${article.attributes.slug}`}>
        <div className="relative w-full aspect-w-1 aspect-h-1">
          {article.attributes.cover?.data?.attributes?.url && (
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.cover.data.attributes.url}`}
              alt={article.attributes.title}
              className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
            />
          )}
        </div>
        <div className="p-4">
          <h2 className="text-3xl font-extrabold mb-2">
            {article.attributes.title}
          </h2>
          <p>
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
        </div>
      </Link>
    </div>
  );
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = params;
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 18;

  try {
    const { category, articles, meta } = await getCategoryWithArticles(
      slug,
      page,
      pageSize
    );

    if (!category) {
      return <div>Categoría no encontrada</div>;
    }

    const totalPages = meta?.pagination?.pageCount || 1;

    return (
      <div className="container mx-auto px-4 py-2 md:px-0">
        <div>
          {/* Título de la Categoría */}
          <div className="mb-8">
            <h2 className="font-extrabold text-7xl md:text-9xl">
              {category.attributes.title}
            </h2>
          </div>

          {/* Artículos */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.length === 0 ? (
              <p className="text-center">
                No hay artículos para esta categoría.
              </p>
            ) : (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
          </div>

          {/* PAGINACIÓN */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex -space-x-px rounded-md">
              <Link
                href={`/categories/${slug}?page=${page > 1 ? page - 1 : 1}`}
                passHref
              >
                <button
                  disabled={page === 1}
                  className="inline-flex items-center px-3 py-2 md:px-4 text-sm border border-black rounded-l-3xl hover:bg-black hover:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black disabled:opacity-25"
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
              </Link>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => {
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <Link
                        key={pageNum}
                        href={`/categories/${slug}?page=${pageNum}`}
                        passHref
                      >
                        <button
                          className={`inline-flex items-center px-3 py-2 md:px-4 text-sm ${
                            page === pageNum
                              ? "bg-black text-yellow border border-black hover:bg-black hover:text-yellow dark:bg-yellow dark:text-black dark:border-yellow dark:hover:bg-yellow dark:hover:text-black"
                              : "bg-yellow border text-black border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black"
                          }`}
                        >
                          {pageNum}
                        </button>
                      </Link>
                    );
                  } else if (
                    (pageNum === page - 2 && page > 3) ||
                    (pageNum === page + 2 && page < totalPages - 2)
                  ) {
                    return (
                      <span
                        key={pageNum}
                        className="inline-flex items-center px-3 py-2 text-sm border border-black dark:border-yellow"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              )}
              <Link
                href={`/categories/${slug}?page=${page < totalPages ? page + 1 : totalPages}`}
                passHref
              >
                <button
                  disabled={page === totalPages}
                  className="inline-flex items-center px-3 py-2 md:px-4 text-sm border border-black rounded-r-3xl hover:bg-black hover:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black disabled:opacity-25"
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching category data:", error);
    return <div>Error al cargar la categoría y los artículos.</div>;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  try {
    const { category } = await getCategoryWithArticles(slug, 1, 1);
    if (!category) {
      return {
        title: "Categoría no encontrada — Creatyum Media",
        description: "La categoría que buscas no existe.",
      };
    }
    return {
      title: `${category.attributes.title} — Creatyum Media`,
      description:
        category.attributes.description ||
        "Revista digital para diseñadores y creativos en Latam.",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error — Creatyum Media",
      description: "Ha ocurrido un error al cargar la categoría.",
    };
  }
}
