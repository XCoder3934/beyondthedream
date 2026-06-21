import { MentorsView } from "@/components/MentorsView";
import { getMentors } from "@/lib/mentors";

export const metadata = {
  title: "Mentörler",
};

export default async function MentorsPage() {
  const mentors = await getMentors();

  return (
    <div className="animate-fade-in mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Mentörlerimizle tanışın
        </h1>
        <p className="mt-3 text-muted-foreground">
          STEM, Sanat, Diller ve Sosyal Bilimler alanlarında öğrencilere rehberlik etmeye hazır gönüllü uzmanlar.
        </p>
      </div>

      <div className="mt-10">
        <MentorsView mentors={mentors} />
      </div>
    </div>
  );
}
