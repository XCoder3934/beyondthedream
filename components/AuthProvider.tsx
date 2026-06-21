"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AuthModal } from "@/components/AuthModal";

type AuthIntent = "login" | "apply" | "match" | "become-mentor";

interface AuthContextValue {
  openAuth: (intent?: AuthIntent) => void;
  closeAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<AuthIntent>("login");

  const openAuth = useCallback((nextIntent: AuthIntent = "login") => {
    setIntent(nextIntent);
    setOpen(true);
  }, []);

  const closeAuth = useCallback(() => setOpen(false), []);

  return (
    <AuthContext.Provider value={{ openAuth, closeAuth }}>
      {children}
      <AuthModal open={open} intent={intent} onClose={closeAuth} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
