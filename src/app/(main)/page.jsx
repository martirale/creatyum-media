import React from "react";
import HomePageContent from "@ui/home/HomePageContent";
import HomePageFeatured from "@ui/home/HomePageFeatured";
import BannerComic from "@ui/banner/BannerComic";
import BannerNewsletter from "@ui/banner/BannerNewsletter";

export default function MainHomePage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Creatyum Media</h1>

      <HomePageFeatured />

      <BannerNewsletter />

      <HomePageContent />

      <BannerComic />
    </div>
  );
}
