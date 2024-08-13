import HomePageContent from "../components/HomePageContent";
import HomePageFeatured from "../components/HomePageFeatured";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Creatyum Media</h1>

      <HomePageFeatured />

      <HomePageContent />
    </div>
  );
}
