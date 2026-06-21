import { MatchForm } from "@/components/MatchForm";
import { getMentors } from "@/lib/mentors";

export const metadata = {
  title: "Eşleşme",
};

export default async function MatchPage() {
  const mentors = await getMentors();

  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Mentör eşleşmenizi bulun
        </h1>
        <p className="mt-3 text-muted-foreground">
          Bize kendinizden bahsedin, mentörleri sizin ilgi alanlarınıza ve onların uzmanlıklarına göre sıralayalım.
        </p>
      </div>

      <div className="mt-10">
        <MatchForm mentors={mentors} />
      </div>
    </div>
  );
}
