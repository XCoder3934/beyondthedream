import { MatchForm } from "@/components/MatchForm";
import { getMentors } from "@/lib/mentors";

export const metadata = {
  title: "Eşleşme",
};

export default async function MatchPage() {
  const mentors = await getMentors();

  return (
    <div className="animate-fade-in mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface/65 px-6 py-8 backdrop-blur-xl sm:px-9 sm:py-10">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">02 <span className="mx-2 text-muted-foreground/50">/</span> Kişisel yol haritan</p>
        <h1 className="relative mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Mentör eşleşmenizi bulun
        </h1>
        <p className="relative mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Bize kendinizden bahsedin, mentörleri sizin ilgi alanlarınıza ve onların uzmanlıklarına göre sıralayalım.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <MatchForm mentors={mentors} />
      </div>
    </div>
  );
}
