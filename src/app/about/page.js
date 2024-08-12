import AboutPageContent from "./AboutPageContent";

export const metadata = {
  title: "Sobre Creatyum — Creatyum Media",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Sobre Creatyum</h1>

      <AboutPageContent />
    </div>
  );
}
