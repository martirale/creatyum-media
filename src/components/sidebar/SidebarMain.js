import SidebarLatestArticles from "./SidebarLatestArticles";
import SidebarInstagram from "./SidebarInstagram";
import SidebarComic from "./SidebarComic";

export default function SidebarMain() {
  return (
    <div>
      <SidebarLatestArticles />

      <SidebarInstagram />

      <SidebarComic />
    </div>
  );
}
