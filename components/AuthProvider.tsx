"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { AuthModal } from "@/components/AuthModal";
import { createClient } from "@/lib/supabase/client";

type AuthIntent = "login" | "apply" | "match" | "become-mentor";

interface AuthContextValue {
  openAuth: (intent?: AuthIntent, onAuthenticated?: () => void) => void;
  closeAuth: () => void;
  user: User | null;
  authLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<AuthIntent>("login");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const pendingAction = useRef<(() => void) | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let active = true;
    let authEventReceived = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      authEventReceived = true;
      if (!active) return;
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active || authEventReceived) return;
      setUser(error ? null : data.session?.user ?? null);
      setAuthLoading(false);
    }).catch(() => {
      if (!active || authEventReceived) return;
      setUser(null);
      setAuthLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const openAuth = useCallback((nextIntent: AuthIntent = "login", onAuthenticated?: () => void) => {
    setIntent(nextIntent);
    pendingAction.current = onAuthenticated ?? null;
    setOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    pendingAction.current = null;
    setOpen(false);
  }, []);

  const handleAuthenticated = useCallback(() => {
    const action = pendingAction.current;
    pendingAction.current = null;
    setOpen(false);
    action?.();
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await createClient().auth.signOut();
    if (error) throw error;
  }, []);

  return (
    <AuthContext.Provider value={{ openAuth, closeAuth, user, authLoading, signOut }}>
      {children}
      <AuthModal
        open={open}
        intent={intent}
        onClose={closeAuth}
        onAuthenticated={handleAuthenticated}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
