import React from "react";
import SidebarLatestArticles from "@components/sidebar/SidebarLatestArticles";
import SidebarComic from "@components/sidebar/SidebarComic";
import SidebarNewsletter from "@components/sidebar/SidebarNewsletter";

export default function SidebarMain() {
  return (
    <div>
      <SidebarNewsletter />

      <SidebarLatestArticles />

      <SidebarComic />
    </div>
  );
}
