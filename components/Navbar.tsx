"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Beyond the Dream
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
