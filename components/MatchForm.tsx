"use client";

import { useCallback, useEffect, useState } from "react";
import { matchMentors } from "@/lib/matching";
import { trackEvent } from "@/lib/analytics";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/Button";
import type { MatchInput, MatchResult, Mentor } from "@/types/mentor";

interface MatchFormProps {
  mentors: Mentor[];
}

export function MatchForm({ mentors }: MatchFormProps) {
  const { openAuth } = useAuth();
  const [age, setAge] = useState("");
  const [interestsInput, setInterestsInput] = useState("");
  const [goals, setGoals] = useState("");
  const [results, setResults] = useState<MatchResult[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const showMatches = useCallback((input: MatchInput) => {
    const matched = matchMentors(input, mentors);
    trackEvent("match_submit", { interest_count: input.interests.length });
    setResults(matched);
    setSubmitted(true);
  }, [mentors]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("resumeMatch") !== "1") return;

    window.history.replaceState({}, "", "/match");
    const storageKey = "btd:pending-match";
    try {
      const storedInput = sessionStorage.getItem(storageKey);
      sessionStorage.removeItem(storageKey);
      if (!storedInput) return;
      const input = JSON.parse(storedInput) as MatchInput;
      if (
        typeof input.age !== "number" ||
        !Array.isArray(input.interests) ||
        !input.interests.every((interest) => typeof interest === "string") ||
        typeof input.goals !== "string"
      ) return;
      void (async () => {
        try {
          const { createClient } = await import("@/lib/supabase/client");
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          if (user) showMatches(input);
        } catch {
          // Leave the form available if session restoration fails.
        }
      })();
    } catch {
      // Ignore invalid transient browser state.
    }
  }, [showMatches]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const supabase = (await import("@/lib/supabase/client")).createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const interests = interestsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const input = { age: Number(age), interests, goals };

    if (!user) {
      try {
        sessionStorage.setItem("btd:pending-match", JSON.stringify(input));
      } catch {
        // Email/password login can still resume this action in the current page.
      }
      openAuth("match", () => {
        try {
          sessionStorage.removeItem("btd:pending-match");
        } catch {
          // The in-memory action can still complete if storage is unavailable.
        }
        showMatches(input);
      });
      return;
    }

    showMatches(input);
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="glass-panel space-y-5 rounded-[2rem] p-6 sm:p-8">
        <div className="mb-2 flex items-center justify-between border-b border-border/70 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Eşleşme profili</p>
            <p className="mt-1 text-xs text-muted-foreground">Sana uygun rehberliği bulmak için birkaç bilgi</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan/20 bg-cyan/10 text-sm font-semibold text-cyan">02</span>
        </div>
        <div>
          <label htmlFor="age" className="mb-1.5 block text-sm font-medium">
            Yaş
          </label>
          <input
            id="age"
            type="number"
            min={10}
            max={25}
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="field-input"
            placeholder="Yaşınız"
          />
        </div>

        <div>
          <label htmlFor="interests" className="mb-1.5 block text-sm font-medium">
            İlgi Alanları
          </label>
          <input
            id="interests"
            required
            value={interestsInput}
            onChange={(e) => setInterestsInput(e.target.value)}
            className="field-input"
            placeholder="örn. Python, Biyoloji, Yaratıcı Yazarlık"
          />
          <p className="mt-1 text-xs text-muted-foreground">Virgülle ayırın</p>
        </div>

        <div>
          <label htmlFor="goals" className="mb-1.5 block text-sm font-medium">
            Hedefler
          </label>
          <textarea
            id="goals"
            required
            rows={4}
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="field-input resize-none"
            placeholder="Mentörünüzle birlikte neler başarmayı umuyorsunuz?"
          />
        </div>

        <Button type="submit" className="group w-full rounded-xl shadow-[0_12px_32px_-16px_var(--accent)] sm:w-auto">
          Eşleşmeleri bul <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </Button>
      </form>

      {submitted && (
        <section className="animate-fade-in space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Eşleşmeleriniz</h2>
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Henüz güçlü bir eşleşme yok. İlgi alanlarınızı genişletmeyi deneyin veya tüm mentörlere göz atın.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map(({ mentor, score, matchedSkills }) => (
                <article
                  key={mentor.id}
                  className="glass-panel rounded-3xl p-5 transition-colors hover:border-accent/35"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{mentor.name}</h3>
                      <p className="text-xs text-muted-foreground">{mentor.category}</p>
                    </div>
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                      {score} puan
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    {mentor.bio}
                  </p>
                  {matchedSkills.length > 0 && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Eşleşen: {matchedSkills.join(", ")}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
