import { Mail, ArrowUp, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { useContent } from "../data/useContent";
import { scrollToSection } from "../lib/scrollToSection";
import { useLanguage } from "../i18n/LanguageContext";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { personalInfo } = useContent();
  const { t } = useLanguage();
  const scrollTo = (href) => scrollToSection(href);

  return (
    <footer className="relative border-t border-gold-200/10 pt-12 sm:pt-14 pb-8 px-5 sm:px-8 lg:px-12 xl:px-16 overflow-hidden" role="contentinfo">
      <div className="aurora -bottom-40 left-1/2 -translate-x-1/2 w-[640px] h-[320px] bg-gold-500/10" aria-hidden="true" />

      <div className="relative container-x">
        <div className="grid md:grid-cols-[1.4fr_1fr_auto] gap-10 items-start">
          {/* Brand */}
          <div>
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
              className="inline-flex items-center gap-2.5"
            >
              <span className="grid place-items-center w-9 h-9 rounded-full overflow-hidden">
  <img src="/logo.png" alt="Morad Ayada logo" className="w-full h-full object-cover" />
</span>
              <span className="font-display font-semibold tracking-tight text-[15px] text-cream">
                Morad<span className="text-gold-300">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[12.5px] leading-relaxed text-faint">
              Flutter &amp; cross-platform developer building production mobile apps from Assiut, Egypt — shipping to the world.
            </p>

            <div className="flex items-center gap-2 mt-5">
              {[
                { href: personalInfo.github, icon: GithubIcon, label: "GitHub" },
                { href: personalInfo.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
                { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid place-items-center w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] text-faint hover:text-gold-200 hover:border-gold-300/35 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-gold-300/70 mb-4">Navigate</p>
            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-[12.5px] text-muted hover:text-gold-200 transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Back to top */}
          <div className="flex md:justify-end">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
              className="group flex flex-col items-center gap-2"
              aria-label="Back to top"
            >
              <span className="grid place-items-center w-11 h-11 rounded-full bg-white/[0.03] border border-white/[0.08] text-muted group-hover:text-gold-200 group-hover:border-gold-300/35 group-hover:-translate-y-1 transition-all duration-300">
                <ArrowUp size={16} />
              </span>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-faint">Top</span>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10.5px] tracking-wide text-faint">
            © {new Date().getFullYear()} Morad Ayada. {t("footer.rights")}
          </p>
          <p className="text-[11.5px] text-faint flex items-center gap-1.5">
            {t("footer.builtWith")} <Heart size={12} className="text-gold-400" aria-hidden="true" /> and a lot of Flutter.
          </p>
        </div>
      </div>
    </footer>
  );
}
