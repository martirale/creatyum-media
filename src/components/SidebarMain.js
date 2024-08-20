import SidebarLatestArticles from "../components/SidebarLatestArticles";
import SidebarInstagram from "../components/SidebarInstagram";
import SidebarComic from "../components/SidebarComic";

export default function SidebarMain() {
  return (
    <div>
      <SidebarLatestArticles />

      <SidebarInstagram />

      <SidebarComic />
    </div>
  );
}
