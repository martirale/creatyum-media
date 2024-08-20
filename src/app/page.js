import HomePageContent from "../components/HomePageContent";
import HomePageFeatured from "../components/HomePageFeatured";
import BannerInstagram from "../components/BannerInstagram";
import BannerComic from "../components/BannerComic";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Creatyum Media</h1>

      <HomePageFeatured />

      <BannerInstagram />

      <HomePageContent />

      <BannerComic />
    </div>
  );
}
