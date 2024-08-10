export async function getCategory(slug) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  try {
    const response = await fetch(
      `${strapiUrl}/api/categories?filters[slug]=${slug}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category data");
    }

    const data = await response.json();
    return data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}
