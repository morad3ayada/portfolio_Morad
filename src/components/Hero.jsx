import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Mail, Download, Sparkles, MapPin } from "lucide-react";
import { useContent } from "../data/useContent";
import { useLanguage } from "../i18n/LanguageContext";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { scrollToSection } from "../lib/scrollToSection";

const marqueeWords = [
  "Flutter", "Dart", ".NET", "Firebase", "REST API",
  "Kotlin", "Material Design", "Cross-Platform", "App Store", "Google Play",
];

export default function Hero() {
  const { personalInfo } = useContent();
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 0.94]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-0"
    >
      {/* Aurora glows */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="aurora glow-pulse top-[-8%] left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-gold-400/20" />
        <div className="aurora top-[18%] right-[6%] w-[420px] h-[420px] bg-gold-200/10" />
        <div className="aurora bottom-[4%] left-[4%] w-[360px] h-[360px] bg-gold-600/15" />
      </motion.div>
      <div className="absolute inset-0 grid-bg opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)] pointer-events-none" />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16"
      >
        <div className="container-x grid lg:grid-cols-[1.15fr_0.85fr] gap-10 sm:gap-12 lg:gap-10 items-center">

          {/* ── Left ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5 sm:mb-7"
            >
              <span className="chip">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                </span>
                {t("hero.available")}
              </span>
              <span className="flex items-center gap-1.5 text-[13px] text-faint">
                <MapPin size={13} /> {personalInfo.location}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="eyebrow mb-4"
            >
              Software Developer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(2.8rem,7vw,5.4rem)]"
            >
              <span className="block text-cream">Morad</span>
              <span className="block serif-accent pr-2">Ayada</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="mt-5 sm:mt-6 max-w-xl text-[15px] sm:text-base leading-relaxed text-muted"
            >
              {personalInfo.shortBio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.54 }}
              className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollToSection("#projects"); }}
                className="btn-gold"
              >
                <Sparkles size={17} /> {t("hero.exploreWork")}
              </a>
              <a href="/cv/Morad_Helmy_CV.docx" download className="btn-ghost">
                <Download size={17} /> {t("hero.downloadCv")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.66 }}
              className="mt-7 sm:mt-9 flex items-center gap-3"
            >
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
                  className="grid place-items-center w-11 h-11 rounded-full bg-white/[0.03] border border-white/10 text-muted hover:text-gold-200 hover:border-gold-300/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
              <span className="h-px w-10 bg-gradient-to-r from-gold-400/50 to-transparent" />
              <span className="font-mono text-[11px] tracking-widest text-faint uppercase">
                {personalInfo.yearsOfExperience} yrs exp
              </span>
            </motion.div>
          </div>

          {/* ── Right: portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[235px] xs:w-[270px] sm:w-[320px] lg:w-[360px]">
              {/* orbit rings */}
              <div className="orbit inset-[-22px] spin-slow" aria-hidden="true" />
              <div className="orbit inset-[-44px] opacity-60" aria-hidden="true" />
              {/* glow */}
              <div className="absolute -inset-6 rounded-[2.2rem] bg-gradient-to-tr from-gold-500/25 via-gold-300/10 to-transparent blur-2xl" />
              {/* frame */}
              <div className="relative rounded-[2rem] overflow-hidden border border-gold-200/20 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
                <img
                  src={personalInfo.profilePhoto}
                  alt="Morad Ayada"
                  className="w-full h-[300px] xs:h-[340px] sm:h-[420px] lg:h-[470px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-[2rem]" />

                {/* floating card */}
                <div className="absolute bottom-3 left-3 right-3 rounded-2xl glass border border-gold-200/15 px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-display text-[13px] font-semibold text-cream">{t("hero.flutterSpecialist")}</p>
                    <p className="text-[11px] text-muted">{t("hero.crossPlatform")}</p>
                  </div>
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-gold-400/15 text-gold-200">
                    <Sparkles size={15} />
                  </span>
                </div>
              </div>

              {/* floating badge */}
              <div className="absolute -top-3 -right-3 sm:-right-5 rounded-2xl bg-gradient-to-br from-gold-100 to-gold-400 text-[#120d00] px-4 py-2.5 shadow-[0_18px_40px_-16px_rgba(212,175,55,0.9)] rotate-3">
                <p className="font-display text-lg font-extrabold leading-none">2+</p>
                <p className="font-mono text-[9px] tracking-wider uppercase mt-0.5">{t("hero.yearsExp")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Marquee strip ── */}
      <div className="relative z-10 w-full mt-10 sm:mt-16 lg:mt-20 border-y border-gold-200/10 bg-white/[0.015] py-3.5 sm:py-4 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0" aria-hidden={dup === 1}>
              {marqueeWords.map((w) => (
                <span key={`${dup}-${w}`} className="flex items-center gap-6 px-6">
                  <span className="font-display text-sm sm:text-base text-muted/70 whitespace-nowrap">{w}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative z-10 w-full flex justify-center py-4 sm:py-5">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-faint">
          {t("hero.scroll")} <ArrowDownRight size={13} className="animate-bounce" />
        </span>
      </div>
    </section>
  );
}
