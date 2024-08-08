import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    // Fetch del artículo
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

    const article = data.data[0];

    // Fetch del autor (desde API: redactions)
    if (article.attributes.redactions?.data?.[0]?.id) {
      const authorId = article.attributes.redactions.data[0].id;

      const authorResponse = await fetch(
        `${strapiUrl}/api/redactions/${authorId}?populate=profile`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!authorResponse.ok) {
        throw new Error("Failed to fetch author data");
      }

      const authorData = await authorResponse.json();

      // Combinar los datos del autor con el artículo
      article.attributes.redactions.data[0].attributes.profile =
        authorData.data.attributes.profile;
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
