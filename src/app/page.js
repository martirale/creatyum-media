"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

function ArticleCard({ article }) {
  return (
    <div className="mb-8 border p-4 rounded-lg">
      <Link href={`/articles/${article.attributes.slug}`}>
        <h2 className="text-xl font-bold">{article.attributes.title}</h2>
      </Link>
      <p>
        {new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(article.attributes.date))}
      </p>
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
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Creatyum Media</h1>
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
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
