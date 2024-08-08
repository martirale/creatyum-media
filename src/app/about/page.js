import AboutPageContent from "./AboutPageContent";

export const metadata = {
  title: "Sobre Creatyum — Creatyum Media",
  description: "Revista digital para diseñadores y creativos en Latam.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Sobre Creatyum</h1>

      <AboutPageContent />
    </div>
  );
}
