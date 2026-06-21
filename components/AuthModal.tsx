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
  const [role, setRole] = useState<"student" | "mentor">("student");
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
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {intent === "become-mentor"
            ? "Sign in to apply as a mentor."
            : intent === "match"
              ? "Sign in to find your mentor match."
              : intent === "apply"
                ? "Sign in to apply to a mentor."
                : "Continue with Google or email."}
        </p>

        <div className="mt-6 space-y-4">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            disabled={loading}
            onClick={handleGoogleAuth}
          >
            Continue with Google
          </Button>

          <div className="relative py-2 text-center text-xs text-muted-foreground">
            <span className="bg-surface px-2">or</span>
            <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-3">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-2">
                {(["student", "mentor"] as const).map((option) => (
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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-input"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-medium text-accent"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Create account" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
