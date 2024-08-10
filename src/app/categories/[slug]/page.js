import CategoryPageContent from "../../../components/CategoryPageContent";
import { getCategory } from "../../../lib/api";

export async function generateMetadata({ params }) {
  const { slug } = params;

  // Fetch de la categoría
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "Categoría no encontrada — Creatyum Media",
      description: "La categoría que buscas no existe.",
    };
  }

  return {
    title: `${category.attributes.title} — Creatyum Media`,
    description: "Revista digital para diseñadores y creativos en Latam.",
  };
}

export default function CategoryPage({ params }) {
  const { slug } = params;

  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Creatyum Media</h1>

      <CategoryPageContent slug={slug} />
    </div>
  );
}
