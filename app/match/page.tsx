import { MatchForm } from "@/components/MatchForm";
import { getMentors } from "@/lib/mentors";

export const metadata = {
  title: "Match",
};

export default async function MatchPage() {
  const mentors = await getMentors();

  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Find your mentor match
        </h1>
        <p className="mt-3 text-muted-foreground">
          Tell us about yourself and we&apos;ll rank mentors based on your interests
          and their expertise.
        </p>
      </div>

      <div className="mt-10">
        <MatchForm mentors={mentors} />
      </div>
    </div>
  );
}
