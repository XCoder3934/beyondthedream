import { MentorsView } from "@/components/MentorsView";
import { getMentors } from "@/lib/mentors";

export const metadata = {
  title: "Mentörler",
};

export default async function MentorsPage() {
  const mentors = await getMentors();

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface/65 px-6 py-8 backdrop-blur-xl sm:px-9 sm:py-10">
        <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">01 <span className="mx-2 text-muted-foreground/50">/</span> Mentör ağı</p>
        <h1 className="relative mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Mentörlerimizle tanışın
        </h1>
        <p className="relative mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          STEM, Sanat, Diller ve Sosyal Bilimler alanlarında öğrencilere rehberlik etmeye hazır gönüllü uzmanlar.
        </p>
      </div>

      <div className="mt-10">
        <MentorsView mentors={mentors} />
      </div>
    </div>
  );
}
