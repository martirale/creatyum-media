import TermsPageContent from "./TermsPageContent";

export const metadata = {
  title: "Términos de uso — Creatyum Media",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Términos de uso</h1>

      <div className="grid grid-cols-12 gap-4 md:gap-12">
        <div className="col-span-12 md:col-span-8">
          <TermsPageContent />
        </div>
      </div>
    </div>
  );
}