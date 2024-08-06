import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    const response = await fetch(
      `${strapiUrl}/api/articles?filters[slug]=${slug}&populate=*`,
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
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(data.data[0]);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
