import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = params;

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

    // Fetch de los artículos en la categoría
    const articlesResponse = await fetch(
      `${strapiUrl}/api/articles?filters[categories][slug][$eq]=${slug}&populate=cover,categories`,
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

    return NextResponse.json({
      category: category,
      articles: articlesData.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
