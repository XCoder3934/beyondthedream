import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FaInstagram } from "react-icons/fa"; // Import the icon

const footerLinks = [
  { href: "/about", label: "Hakkında" },
  { href: "/privacy", label: "Gizlilik Politikası" },
  { href: "/terms", label: "Şartlar ve Koşullar" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">İletişim</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Mentörlük veya gönüllülük hakkında sorularınız mı var? Bize bir mesaj gönderin.
          </p>
          <ContactForm className="mt-6 max-w-md" />
        </div>

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


            <Link
              href="https://www.instagram.com/beyond.the_dream?igsh=MXFpdnd6Y3RsMXFyMQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300"
            >
              <FaInstagram
                className="block w-5 h-5 text-gray-900 dark:text-gray-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-purple-500 hover:via-pink-500 hover:to-orange-500"
              />
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Beyond the Dream. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}