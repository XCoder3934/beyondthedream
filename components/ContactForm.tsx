"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className={cn("text-sm text-muted-foreground", className)}>
        Bize ulaştığınız için teşekkürler. En kısa sürede size döneceğiz.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      <input type="text" name="name" required placeholder="İsim" className="field-input" />
      <input type="email" name="email" required placeholder="E-posta" className="field-input" />
      <input type="tel" name="phone" placeholder="Telefon" className="field-input" />
      <textarea
        name="message"
        required
        rows={3}
        placeholder="Mesaj"
        className="field-input resize-none"
      />
      <button
        type="submit"
        className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
      >
        Mesaj gönder
      </button>
    </form>
  );
}
