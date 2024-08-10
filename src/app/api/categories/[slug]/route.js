import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 18;

  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    const response = await fetch(
      `${strapiUrl}/api/categories?filters[slug][$eq]=${slug}&populate[articles]=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    if (data.data.length === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const articles = data.data[0].attributes.articles.data;
    const paginatedArticles = articles.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return NextResponse.json({
      data: paginatedArticles,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(articles.length / pageSize),
          total: articles.length,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching category articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
