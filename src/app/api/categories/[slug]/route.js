import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = params;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const pageSize = 18;

  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    // Fetch de la categoría
    const categoryResponse = await fetch(
      `${strapiUrl}/api/categories?filters[slug]=${slug}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!categoryResponse.ok) {
      throw new Error("Failed to fetch category data");
    }

    const categoryData = await categoryResponse.json();
    const category = categoryData.data.length > 0 ? categoryData.data[0] : null;

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Fetch de los artículos en la categoría con paginación
    const articlesResponse = await fetch(
      `${strapiUrl}/api/articles?filters[categories][slug][$eq]=${slug}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=cover,categories`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!articlesResponse.ok) {
      throw new Error("Failed to fetch articles data");
    }

    const articlesData = await articlesResponse.json();
    const { meta, data: articles } = articlesData;

    return NextResponse.json({
      category: category,
      articles: articles,
      meta: meta,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
