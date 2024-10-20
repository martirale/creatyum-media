import React from "react";
import HomePageContent from "@components/home/HomePageContent";
import HomePageFeatured from "@components/home/HomePageFeatured";
import BannerComic from "@components/banner/BannerComic";
import BannerNewsletter from "@components/banner/BannerNewsletter";

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
