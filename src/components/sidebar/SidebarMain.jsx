import React from "react";
import SidebarLatestArticles from "./SidebarLatestArticles";
import SidebarComic from "./SidebarComic";
import SidebarNewsletter from "./SidebarNewsletter";

export default function SidebarMain() {
  return (
    <div>
      <SidebarNewsletter />

      <SidebarLatestArticles />

      <SidebarComic />
    </div>
  );
}
