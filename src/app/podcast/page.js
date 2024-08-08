import PodcastPageContent from "./PodcastPageContent";

export const metadata = {
  title: "Café Creativo Podcast — Creatyum Media",
  description: "Revista digital para diseñadores y creativos en Latam.",
};

export default function PodcastPage() {
  return (
    <div>
      <h1>Café Creativo Podcast</h1>

      <PodcastPageContent />
    </div>
  );
}
