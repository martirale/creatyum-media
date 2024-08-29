import HomePageContent from "../components/home/HomePageContent";
import HomePageFeatured from "../components/home/HomePageFeatured";
import BannerInstagram from "../components/home/BannerInstagram";
import BannerComic from "../components/home/BannerComic";

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
