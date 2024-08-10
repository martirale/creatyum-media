import CategoryPageContent from "../../../components/CategoryPageContent";

export default function CategoryPage({ params }) {
  const { slug } = params;

  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Creatyum Media</h1>

      <CategoryPageContent slug={slug} />
    </div>
  );
}
