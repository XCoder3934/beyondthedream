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
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-xl animate-fade-in">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{mentor.name}</h2>
            <span className="mt-2 inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
              {mentor.category}
            </span>
          </div>
          {mentor.avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mentor.avatar}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
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
                className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground"
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
