"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";
import { AuthProvider } from "@/components/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAnalytics();
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
}
