import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

const footerLinks = [
  { href: "/about", label: "Hakkında" },
  { href: "/privacy", label: "Gizlilik Politikası" },
  { href: "/terms", label: "Şartlar ve Koşullar" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">

        {/* Contact Section */}
        <div>
          {/* Flex container to align Title and Instagram Icon side-by-side */}
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold tracking-tight">İletişim</h2>
            <a
              href="https://www.instagram.com/beyond.the_dream?igsh=MXFpdnd6Y3RsMXFyMQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                // stroke-slate-900: High contrast for light mode, white for dark mode
                className="stroke-slate-900 dark:stroke-white transition-colors duration-300 group-hover:stroke-[url(#insta-gradient)]"
              >
                <defs>
                  <linearGradient id="insta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#833ab4' }} />
                    <stop offset="50%" style={{ stopColor: '#fd1d1d' }} />
                    <stop offset="100%" style={{ stopColor: '#fcb045' }} />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Mentörlük veya gönüllülük hakkında sorularınız mı var? Bize bir mesaj gönderin.
          </p>

          <ContactForm className="mt-6 max-w-md" />
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col justify-between gap-8">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
            © {new Date().getFullYear()} Beyond the Dream. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}