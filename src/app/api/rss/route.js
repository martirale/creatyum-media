import { NextResponse } from "next/server";
import RSS from "rss";
import { getArticles } from "../../../lib/api";

export async function GET() {
  try {
    const { data: articles } = await getArticles(1, 100);

    // Crear un nuevo feed RSS
    const feed = new RSS({
      title: "Creatyum Media",
      description: "Últimos artículos de Creatyum",
      site_url: "https://creatyum.media",
      feed_url: "https://creatyum.media/api/rss",
      language: "es",
    });

    // Agregar los artículos al feed RSS
    articles.forEach((article) => {
      const coverImage = article.attributes.cover?.data?.attributes?.url;
      const coverImageUrl = coverImage
        ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage}`
        : null;

      feed.item({
        title: article.attributes.title,
        description: article.attributes.description,
        url: `https://creatyum.media/articulo/${article.attributes.slug}`,
        date: article.attributes.date,
        enclosure: coverImageUrl
          ? { url: coverImageUrl, type: "image/jpeg" }
          : undefined,
      });
    });

    // Generar el XML del feed RSS
    const xml = feed.xml({ indent: true });

    // Devolver el XML del feed con el encabezado correcto
    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error al generar el feed RSS:", error);
    return new NextResponse("Error al generar el feed RSS", { status: 500 });
  }
}
