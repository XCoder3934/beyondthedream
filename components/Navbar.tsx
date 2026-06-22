"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Search } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
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
  const { openAuth } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const donationUrl =
    process.env.NEXT_PUBLIC_DONATION_URL ?? "https://example.com/donate";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Beyond the Dream">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Beyond the Dream" className="h-12 w-auto rounded-full" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                pathname === link.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative mr-2">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Ara..."
              className="h-9 w-48 rounded-md border border-border bg-muted/50 pl-9 pr-3 text-sm outline-none transition-colors focus:border-accent focus:bg-surface"
            />
          </div>
          <ThemeToggle />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => openAuth("login")}
          >
            Giriş yap
          </Button>
          <a
            href={donationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent/90"
          >
            Destek Ol
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
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

      {mobileOpen && (
        <div className="border-t border-border px-4 py-4 md:hidden animate-fade-in">
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Ara..."
                className="h-9 w-full rounded-md border border-border bg-muted/50 pl-9 pr-3 text-sm outline-none transition-colors focus:border-accent focus:bg-surface"
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
                  "rounded-md px-3 py-2 text-sm",
                  pathname === link.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openAuth("login");
              }}
              className="rounded-md px-3 py-2 text-left text-sm text-muted-foreground"
            >
              Giriş yap
            </button>
            <a
              href={donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-2 text-sm text-accent"
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground"
      aria-label="Tema değiştir"
    >
      <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-transform" />
      <Moon className="absolute h-4 w-4 scale-0 dark:scale-100 transition-transform" />
    </button>
  );
}
