import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">Volunteer mentorship</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Find a mentor who believes in your potential
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Beyond the Dream connects students with volunteer mentors across STEM,
            Arts, Languages, and Social Sciences. Discover mentors, apply, or get
            matched — all in one place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/mentors" size="lg">
              Browse mentors
            </Button>
            <Button href="/match" variant="secondary" size="lg">
              Find your match
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              title: "Discover",
              body: "Browse volunteer mentors by category and skills. View full profiles in a click.",
            },
            {
              title: "Apply",
              body: "Connect with mentors who align with your interests and goals.",
            },
            {
              title: "Match",
              body: "Answer a few questions and get ranked mentor recommendations instantly.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            Share your expertise
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Volunteers make this platform possible. Apply to become a mentor and
            help the next generation explore their path.
          </p>
          <Button href="/mentors" variant="secondary" className="mt-6">
            Become a Mentor
          </Button>
        </div>
      </section>
    </div>
  );
}
