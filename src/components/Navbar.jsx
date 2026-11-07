import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToSection } from "../lib/scrollToSection";

import { useLanguage } from "../i18n/LanguageContext";

const navLinks = [
  { label: "Home", key: "nav.home", href: "#home" },
  { label: "About", key: "nav.about", href: "#about" },
  { label: "Skills", key: "nav.skills", href: "#skills" },
  { label: "Work", key: "nav.work", href: "#projects" },
  { label: "Journey", key: "nav.journey", href: "#experience" },
  { label: "Services", key: "nav.services", href: "#services" },
  { label: "Contact", key: "nav.contact", href: "#contact" },
];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].href.slice(1));
        if (el && el.getBoundingClientRect().top <= 220) {
          setActive(navLinks[i].label);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = useCallback((href, label) => {
    setActive(label);
    setMobileOpen(false);
    // Run once immediately and once after the menu overlay unmounts so the
    // scroll still lands correctly on mobile, where the body is scroll-locked
    // while the drawer is open.
    scrollToSection(href);
    requestAnimationFrame(() => scrollToSection(href));
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-600 via-gold-200 to-gold-600 origin-left z-[61]"
        style={{ scaleX: progressWidth }}
      />

      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center justify-between gap-4 rounded-full px-3 sm:px-4 py-2.5 w-full max-w-6xl border transition-all duration-500 ${
            scrolled
              ? "glass-pill border-gold-200/20 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.95)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home", "Home"); }}
            className="flex items-center gap-2.5 shrink-0 pl-1"
          >
            <span className="relative grid place-items-center w-9 h-9 rounded-full overflow-hidden shadow-[0_8px_24px_-8px_rgba(184,168,138,0.8)]">
  <img src="/logo.png" alt="Morad Ayada logo" className="w-full h-full object-cover" />
</span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-semibold tracking-tight text-[15px] text-cream">
                Morad<span className="text-gold-300">.</span>
              </span>
              <span className="font-mono text-[9px] tracking-[0.22em] text-faint uppercase mt-0.5">
                {t("nav.developer")}
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href, link.label); }}
                className={`relative px-4 py-2 rounded-full text-[13.5px] font-medium transition-colors duration-300 ${
                  active === link.label ? "text-gold-200" : "text-muted hover:text-cream"
                }`}
              >
                {active === link.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gold-400/10 border border-gold-300/25"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{t(link.key)}</span>
              </a>
            ))}
          </div>

          {/* CTA / toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="grid place-items-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-cream hover:bg-white/10 transition-colors font-mono text-[11px] font-semibold"
              aria-label="Switch language"
            >
              {lang === "en" ? "AR" : "EN"}
            </button>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact", "Contact"); }}
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500 text-[#120d00] px-5 py-2.5 text-[13px] font-display font-semibold hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.8)] transition-shadow duration-300"
            >
              {t("nav.letsTalk")} <ArrowUpRight size={15} />
            </a>
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-cream hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-ink/95 backdrop-blur-2xl flex flex-col items-center justify-start overflow-y-auto pt-28 pb-10 px-6"
          >
            <div className="flex flex-col items-stretch gap-2 w-full max-w-xs">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.045 }}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href, link.label); }}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl font-display text-xl font-medium border transition-all ${
                    active === link.label
                      ? "text-gold-200 bg-gold-400/10 border-gold-300/25"
                      : "text-muted border-transparent hover:text-cream"
                  }`}
                >
                  {t(link.key)}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                onClick={(e) => { e.preventDefault(); scrollTo("#contact", "Contact"); }}
                className="mt-4 w-full text-center py-4 rounded-2xl bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500 text-[#120d00] font-display font-bold text-lg"
              >
                {t("nav.letsTalk")}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
