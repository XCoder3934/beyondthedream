"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/Button";
import { MENTOR_CATEGORIES } from "@/types/mentor";

interface MentorApplyModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function MentorApplyModal({ open, onClose, onSuccess }: MentorApplyModalProps) {
  const { openAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skillsInput, setSkillsInput] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      openAuth("become-mentor");
      return;
    }

    const form = new FormData(e.currentTarget);
    const skills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const { error: insertError } = await supabase.from("mentors").insert({
      name: String(form.get("name")),
      bio: String(form.get("bio")),
      category: String(form.get("category")),
      skills,
      email: String(form.get("email")),
      phone: String(form.get("phone")) || null,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    onSuccess?.();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close mentor application"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-xl animate-fade-in">
        <h2 className="text-xl font-semibold tracking-tight">Mentör Olun</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Uzmanlığınızı paylaşın ve öğrencilerin gelişmesine yardımcı olun.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input name="name" required placeholder="Ad Soyad" className="field-input" />
          <textarea
            name="bio"
            required
            rows={4}
            placeholder="Öğrencilere geçmişinizden bahsedin"
            className="field-input resize-none"
          />
          <select name="category" required className="field-input">
            <option value="">Kategori seçin</option>
            {MENTOR_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            required
            placeholder="Yetenekler (virgülle ayrılmış)"
            className="field-input"
          />
          <input name="email" type="email" required placeholder="E-posta" className="field-input" />
          <input name="phone" type="tel" placeholder="Telefon (isteğe bağlı)" className="field-input" />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Gönderiliyor…" : "Başvuruyu gönder"}
          </Button>
        </form>
      </div>
    </div>
  );
}
