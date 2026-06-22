"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { MentorCard } from "@/components/MentorCard";
import { MentorModal } from "@/components/MentorModal";
import { MentorApplyModal } from "@/components/MentorApplyModal";
import { Button } from "@/components/ui/Button";
import type { Mentor } from "@/types/mentor";

interface MentorsViewProps {
  mentors: Mentor[];
}

export function MentorsView({ mentors }: MentorsViewProps) {
  const [selected, setSelected] = useState<Mentor | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);

  function handleSelect(mentor: Mentor) {
    trackEvent("mentor_view", { mentor_id: mentor.id });
    setSelected(mentor);
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {mentors.length} gönüllü yardım etmeye hazır
        </p>
        <Button variant="secondary" href="https://docs.google.com/forms/d/e/1FAIpQLSfjZfc04AxlYy97Igedx7VhgZhMXZkh3J7LoZaBDqdNH1QiYA/viewform?usp=sharing&ouid=113150891458441532903" target="_blank" rel="noopener noreferrer">
          Mentör Olun
        </Button>
      </div>

      {mentors.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-muted-foreground">Henüz mentor yok. Katılan ilk kişi olun.</p>
          <Button className="mt-4" href="https://docs.google.com/forms/d/e/1FAIpQLSfjZfc04AxlYy97Igedx7VhgZhMXZkh3J7LoZaBDqdNH1QiYA/viewform?usp=sharing&ouid=113150891458441532903" target="_blank" rel="noopener noreferrer">
            Mentör Olun
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} onSelect={handleSelect} />
          ))}
        </div>
      )}

      <MentorModal mentor={selected} onClose={() => setSelected(null)} />
      <MentorApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  );
}
