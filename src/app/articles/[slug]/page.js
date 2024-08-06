import { notFound } from "next/navigation";
import FormatContent from "../../../components/FormatContent";

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

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article>
      <h1>{article.attributes.title}</h1>
      <p>
        Publicado:{" "}
        {new Date(article.attributes.date).toLocaleDateString("es-ES")}
      </p>
      {article.attributes.cover && (
        <img
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.cover.data.attributes.url}`}
          alt={article.attributes.title}
        />
      )}
      <div>
        <FormatContent blocks={article.attributes.content} />
      </div>
      <div>
        <h3>Categories:</h3>
        <ul>
          {article.attributes.categories.data.map((category) => (
            <li key={category.id}>{category.attributes.name}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
