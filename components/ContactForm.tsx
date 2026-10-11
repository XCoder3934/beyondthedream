"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name")),
          email: String(form.get("email")),
          phone: String(form.get("phone")) || null,
          message: String(form.get("message")),
        }),
      });
      if (!response.ok) {
        const result: { code?: string; upstreamStatus?: number } | null = await response
          .json()
          .catch(() => null);
        if (result?.code === "contact_service_unreachable") {
          setError("Mesaj servisine ulaşılamıyor. Supabase bağlantısını kontrol edin.");
        } else if (result?.upstreamStatus === 404) {
          setError("Mesaj tablosu bulunamadı. Supabase migration 002 uygulanmalı.");
        } else if (result?.upstreamStatus === 401 || result?.upstreamStatus === 403) {
          setError("Supabase mesaj gönderimini reddetti. Migration 002 izinlerini kontrol edin.");
        } else {
          setError("Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.");
        }
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className={cn("text-sm text-muted-foreground", className)}>
        Mesajınız bize ulaştı. Teşekkür ederiz.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      <input type="text" name="name" required maxLength={120} placeholder="İsim" className="field-input" />
      <input type="email" name="email" required maxLength={254} placeholder="E-posta" className="field-input" />
      <input type="tel" name="phone" maxLength={40} placeholder="Telefon" className="field-input" />
      <textarea
        name="message"
        required
        maxLength={5000}
        rows={3}
        placeholder="Mesaj"
        className="field-input resize-none"
      />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
      >
        {loading ? "Gönderiliyor…" : "Mesaj gönder"}
      </button>
    </form>
  );
}
