import PodcastPlayer from "./PodcastPlayer";

export const metadata = {
  title: "Café Creativo Podcast — Creatyum Media",
  description:
    "Café Creativo es el podcast de Creatyum donde conversamos sobre temas relacionados a la industria creativa.",
};

export default function PodcastPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Café Creativo Podcast</h1>

      <PodcastPlayer />
    </div>
  );
}
