import { NextResponse } from "next/server";

export async function GET() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    const response = await fetch(
      `${strapiUrl}/api/articles?sort[0]=date:desc&pagination[limit]=5&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
