import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Questions about mentorship or volunteering? Send us a message.
          </p>
          <ContactForm className="mt-6 max-w-md" />
        </div>

        <div className="flex flex-col justify-between gap-8">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Beyond the Dream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
