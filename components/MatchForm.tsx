"use client";

import { useState } from "react";
import { matchMentors } from "@/lib/matching";
import { trackEvent } from "@/lib/analytics";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/Button";
import type { MatchResult, Mentor } from "@/types/mentor";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const supabase = (await import("@/lib/supabase/client")).createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      openAuth("match");
      return;
    }

    const interests = interestsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const matched = matchMentors(
      { age: Number(age), interests, goals },
      mentors,
    );

    trackEvent("match_submit", { interest_count: interests.length });
    setResults(matched);
    setSubmitted(true);
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-surface p-6">
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

        <Button type="submit" className="w-full sm:w-auto">
          Eşleşmeleri bul
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
                  className="rounded-2xl border border-border bg-surface p-5"
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
