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
        "group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 text-left",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{mentor.name}</h3>
          <span className="mt-2 inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            {mentor.category}
          </span>
        </div>
        {mentor.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mentor.avatar}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {mentor.bio}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </button>
  );
}
