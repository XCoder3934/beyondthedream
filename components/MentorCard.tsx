"use client";

import { cn } from "@/lib/utils";
import type { Mentor } from "@/types/mentor";

interface MentorCardProps {
  mentor: Mentor;
  onSelect: (mentor: Mentor) => void;
}

export function MentorCard({ mentor, onSelect }: MentorCardProps) {
  const skills = mentor.skills.slice(0, 5);

  return (
    <button
      type="button"
      onClick={() => onSelect(mentor)}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface/80 p-5 text-left shadow-[0_14px_45px_-36px_rgba(32,43,78,0.55)] backdrop-blur-xl",
        "transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-34px_color-mix(in_srgb,var(--accent)_45%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-accent/5 blur-2xl transition-colors group-hover:bg-cyan/10" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold tracking-tight">{mentor.name}</h3>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-accent/15 bg-accent/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
            <span className="h-1 w-1 rounded-full bg-cyan" />
            {mentor.category}
          </span>
        </div>
        {mentor.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mentor.avatar}
            alt=""
            className="h-12 w-12 rounded-2xl border border-border object-cover shadow-md"
          />
        )}
      </div>

      <p className="relative mt-5 line-clamp-2 min-h-12 text-sm leading-6 text-muted-foreground">
        {mentor.bio}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-border/70 bg-muted/60 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="relative mt-6 flex items-center justify-between border-t border-border/70 pt-4 text-xs font-medium text-muted-foreground transition-colors group-hover:text-accent">
        <span>Profili görüntüle</span>
        <span aria-hidden="true" className="text-base transition-transform group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
}
