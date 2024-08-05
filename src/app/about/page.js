import AboutPageContent from "./AboutPageContent";

export const metadata = {
  title: "Sobre Creatyum - Creatyum Media",
  description: "Revista digital para diseñadores y creativos en Latam.",
};

export default function Home() {
  return (
    <div className="container mx-auto px-8 py-8 md:px-0">
      <h1>Sobre Creatyum</h1>

      <AboutPageContent />
    </div>
  );
}
