"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Search } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { AccountMenu } from "@/components/AccountMenu";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/mentors", label: "Mentörler" },
  { href: "/match", label: "Eşleşme" },
  { href: "/about", label: "Hakkında" },
];

export function Navbar() {
  const pathname = usePathname();
  const { openAuth, user, authLoading, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const donationUrl =
    process.env.NEXT_PUBLIC_DONATION_URL ?? "https://example.com/donate";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Beyond the Dream">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Beyond the Dream" className="h-10 w-10 rounded-full ring-1 ring-accent/20" />
          <span className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold tracking-tight">Beyond the Dream</span>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">MENTÖRLÜK AĞI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-2xl border border-border/70 bg-surface/60 p-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all",
                pathname === link.href
                  ? "bg-accent/10 text-accent shadow-sm"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative mr-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Ara..."
              className="h-9 w-36 rounded-xl border border-border/70 bg-surface/60 pl-9 pr-3 text-xs outline-none transition-all placeholder:text-muted-foreground/70 focus:w-44 focus:border-accent/50 focus:bg-surface"
            />
          </div>
          <ThemeToggle />
          {authLoading ? (
            <span className="h-9 w-24 animate-pulse rounded-xl bg-muted/70" aria-label="Hesap yükleniyor" />
          ) : user ? (
            <AccountMenu user={user} onSignOut={signOut} />
          ) : (
            <Button
              variant="secondary"
              size="sm"
              className="rounded-xl border-border/70 bg-surface/60"
              onClick={() => openAuth("login")}
            >
              Giriş yap
            </Button>
          )}
          <a
            href={donationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-accent px-4 text-xs font-semibold text-accent-foreground shadow-[0_8px_24px_-12px_var(--accent)] transition-all hover:-translate-y-0.5 hover:bg-accent/90"
          >
            Destek Ol
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {authLoading ? (
            <span className="h-10 w-10 animate-pulse rounded-full bg-muted/70" aria-label="Hesap yükleniyor" />
          ) : user ? (
            <AccountMenu user={user} onSignOut={signOut} />
          ) : null}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-surface/70"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Menü</span>
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-foreground" />
              <span className="block h-0.5 w-5 bg-foreground" />
              <span className="block h-0.5 w-5 bg-foreground" />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/70 bg-background/95 px-4 py-4 backdrop-blur-2xl md:hidden animate-fade-in">
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Ara..."
                className="h-10 w-full rounded-xl border border-border/70 bg-surface/70 pl-9 pr-3 text-sm outline-none transition-colors focus:border-accent focus:bg-surface"
              />
            </div>
            <ThemeToggle />
          </div>
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm transition-colors",
                  pathname === link.href
                    ? "bg-accent/10 font-medium text-accent"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            {!authLoading && !user && (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openAuth("login");
                }}
                className="rounded-xl px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              >
                Giriş yap
              </button>
            )}
            <a
              href={donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              Destek
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-surface/70 text-muted-foreground transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-foreground"
      aria-label="Tema değiştir"
    >
      <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-transform" />
      <Moon className="absolute h-4 w-4 scale-0 dark:scale-100 transition-transform" />
    </button>
  );
}
