import Link from "next/link";
import { Search } from "lucide-react";
import { getMentors } from "@/lib/mentors";
import { matchesMentorSearch, searchPublicPages } from "@/lib/site-search";

export const metadata = {
  title: "Site İçi Arama",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] ?? "" : q ?? "").trim().slice(0, 120);
  const pageResults = searchPublicPages(query);
  const mentors = query ? await getMentors() : [];
  const mentorResults = mentors.filter((mentor) => matchesMentorSearch(mentor, query));
  const totalResults = pageResults.length + mentorResults.length;

  return (
    <div className="animate-fade-in mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface/65 px-6 py-8 backdrop-blur-xl sm:px-9 sm:py-10">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-accent">Site içi arama</p>
        <h1 className="relative mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Sitede ara</h1>
        <form action="/search" method="get" role="search" className="relative mt-6 flex gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              name="q"
              aria-label="Sitede ara"
              defaultValue={query}
              placeholder="Bir konu, sayfa veya mentör ara..."
              className="field-input h-11 w-full pl-10"
            />
          </div>
          <button type="submit" className="shrink-0 rounded-xl bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90">
            Ara
          </button>
        </form>
      </section>

      {!query ? (
        <p className="mt-8 text-sm text-muted-foreground">Aramak istediğiniz konuyu yazın. Sayfalar, içerikler ve herkese açık mentör profilleri aranır.</p>
      ) : totalResults === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          “{query}” için eşleşen sayfa, içerik veya herkese açık mentör bulunamadı.
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          <p className="text-sm text-muted-foreground">“{query}” için {totalResults} sonuç bulundu.</p>

          {pageResults.length > 0 && (
            <section aria-labelledby="page-results-heading">
              <h2 id="page-results-heading" className="mb-4 text-lg font-semibold">Sayfalar ve içerikler</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {pageResults.map((result) => {
                  const href = result.href === "/mentors"
                    ? `/mentors?q=${encodeURIComponent(query)}`
                    : result.href;
                  return (
                    <Link key={`${result.href}-${result.title}`} href={href} className="group rounded-2xl border border-border/70 bg-surface/70 p-5 transition-colors hover:border-accent/40 hover:bg-surface">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">{result.section}</span>
                      <h3 className="mt-2 font-semibold tracking-tight group-hover:text-accent">{result.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{result.summary}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {mentorResults.length > 0 && (
            <section aria-labelledby="mentor-results-heading">
              <h2 id="mentor-results-heading" className="mb-4 text-lg font-semibold">Mentör profilleri</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {mentorResults.map((mentor) => (
                  <Link key={mentor.id} href={`/mentors?q=${encodeURIComponent(mentor.name)}`} className="group rounded-2xl border border-border/70 bg-surface/70 p-5 transition-colors hover:border-accent/40 hover:bg-surface">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">{mentor.category}</span>
                    <h3 className="mt-2 font-semibold tracking-tight group-hover:text-accent">{mentor.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{mentor.bio}</p>
                    {mentor.skills.length > 0 && (
                      <p className="mt-3 line-clamp-1 text-xs text-muted-foreground">{mentor.skills.join(" · ")}</p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
