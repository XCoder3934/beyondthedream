"use client";

import { trackEvent } from "@/lib/analytics";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/Button";
import type { Mentor } from "@/types/mentor";

interface MentorModalProps {
  mentor: Mentor | null;
  onClose: () => void;
}

export function MentorModal({ mentor, onClose }: MentorModalProps) {
  const { openAuth } = useAuth();

  if (!mentor) return null;

  function handleApply() {
    trackEvent("mentor_apply_click", { mentor_id: mentor!.id });
    openAuth("apply");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close mentor details"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="glass-panel relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] p-6 shadow-2xl animate-fade-in sm:p-8">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{mentor.name}</h2>
            <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              {mentor.category}
            </span>
          </div>
          {mentor.avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mentor.avatar}
              alt=""
              className="h-16 w-16 rounded-2xl border border-border object-cover shadow-lg"
            />
          )}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{mentor.bio}</p>

        <div className="mt-6">
          <h3 className="text-sm font-medium">Yetenekler</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {mentor.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-border/70 bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Button onClick={handleApply} className="flex-1">
            Öğrenci olarak başvur
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Kapat
          </Button>
        </div>
      </div>
    </div>
  );
}
