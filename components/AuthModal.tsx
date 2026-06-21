"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type AuthIntent = "login" | "apply" | "match" | "become-mentor";

interface AuthModalProps {
  open: boolean;
  intent: AuthIntent;
  onClose: () => void;
}

export function AuthModal({ open, intent, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role } },
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      trackEvent("user_signup", { role, intent });
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    onClose();
  }

  async function handleGoogleAuth() {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close auth modal"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl animate-fade-in">
        <h2 className="text-xl font-semibold tracking-tight">
          {mode === "login" ? "Tekrar hoş geldiniz" : "Hesabınızı oluşturun"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {intent === "become-mentor"
            ? "Mentör olarak başvurmak için giriş yapın."
            : intent === "match"
              ? "Mentör eşleşmenizi bulmak için giriş yapın."
              : intent === "apply"
                ? "Bir mentöre başvurmak için giriş yapın."
                : "Google veya e-posta ile devam edin."}
        </p>

        <div className="mt-6 space-y-4">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            disabled={loading}
            onClick={handleGoogleAuth}
          >
            Google ile devam et
          </Button>

          <div className="relative py-2 text-center text-xs text-muted-foreground">
            <span className="bg-surface px-2">veya</span>
            <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-3">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-2">
                {(["öğrenci", "mentör"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRole(option)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-sm capitalize transition-colors",
                      role === option
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <input
              type="email"
              required
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-input"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Lütfen bekleyin…" : mode === "login" ? "Giriş yap" : "Kayıt ol"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? "Yeni misiniz?" : "Zaten bir hesabınız var mı?"}{" "}
            <button
              type="button"
              className="font-medium text-accent"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Hesap oluştur" : "Giriş yap"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
