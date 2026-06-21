export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About</h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Beyond the Dream is a volunteer mentorship platform built to help students
          discover guidance from people who have walked paths they aspire to explore.
        </p>
        <p>
          Mentors volunteer their time across STEM, Arts, Languages, and Social
          Sciences. Students can browse profiles, apply directly, or use our
          matching tool to find the best fit based on shared interests.
        </p>
        <p>
          We believe mentorship should be accessible, human, and free of barriers.
          No approval queues, no paywalls — just meaningful connections.
        </p>
      </div>
    </div>
  );
}
