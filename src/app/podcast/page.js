import PodcastPlayer from "./PodcastPlayer";
import PodcastButtons from "./PodcastButtons";

export const metadata = {
  title: "Café Creativo Podcast — Creatyum Media",
  description:
    "Café Creativo es el podcast de Creatyum donde conversamos sobre temas relacionados a la industria creativa.",
  openGraph: {
    title: "Café Creativo Podcast — Creatyum Media",
    description:
      "Café Creativo es el podcast de Creatyum donde conversamos sobre temas relacionados a la industria creativa.",
    url: "https://creatyum.media/podcast",
    type: "website",
    images: [
      {
        url: "https://creatyum.media/creatyum-default-cover.webp",
        width: 1200,
        height: 630,
        alt: "Creatyum Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Creativo Podcast — Creatyum Media",
    description:
      "Café Creativo es el podcast de Creatyum donde conversamos sobre temas relacionados a la industria creativa.",
    images: ["https://creatyum.media/creatyum-default-cover.webp"],
  },
  canonical: "https://creatyum.media/podcast",
};

export default function PodcastPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Café Creativo Podcast</h1>

      <PodcastPlayer />

      <PodcastButtons />
    </div>
  );
}
