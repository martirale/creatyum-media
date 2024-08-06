"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

function ArticleCard({ article }) {
  return (
    <div className="rounded-3xl border border-black dark:border-yellow">
      <Link href={`/articles/${article.attributes.slug}`}>
        <div className="relative w-full aspect-w-1 aspect-h-1">
          {article.attributes.cover && (
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
            {new Intl.DateTimeFormat("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(article.attributes.date))}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async () => {
    const res = await fetch(`/api/articles?page=${page}`);
    const data = await res.json();

    if (data.data.length === 0) {
      setHasMore(false);
    } else {
      setArticles((prevArticles) => [...prevArticles, ...data.data]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto px-8 py-5 md:px-0">
      <h1>Creatyum Media</h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchArticles}
        hasMore={hasMore}
        loader={<h4>Cargando...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Has visto todos los artículos</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
