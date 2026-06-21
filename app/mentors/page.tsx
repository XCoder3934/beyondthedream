import { MentorsView } from "@/components/MentorsView";
import { getMentors } from "@/lib/mentors";

export const metadata = {
  title: "Mentors",
};

export default async function MentorsPage() {
  const mentors = await getMentors();

  return (
    <div className="animate-fade-in mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Meet our mentors
        </h1>
        <p className="mt-3 text-muted-foreground">
          Volunteer experts ready to guide students in STEM, Arts, Languages, and
          Social Sciences.
        </p>
      </div>

      <div className="mt-10">
        <MentorsView mentors={mentors} />
      </div>
    </div>
  );
}
