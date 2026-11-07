import { motion } from "framer-motion";
import { ExternalLink, Code2, GitBranch, Star } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { personalInfo } from "../data/content";

export default function GitHub() {
  const username = personalInfo.github.replace("https://github.com/", "");

  return (
    <section id="github" className="section relative overflow-hidden" aria-label="GitHub">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="card gold-border relative overflow-hidden rounded-[1.8rem] p-6 sm:p-10 lg:p-14"
        >
          <div className="aurora -top-24 -right-16 w-96 h-96 bg-gold-400/20" aria-hidden="true" />
          <div className="absolute inset-0 grid-bg opacity-[0.35] [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)] pointer-events-none" />
          <div className="orbit inset-[-120px] opacity-40 hidden sm:block" aria-hidden="true" />

          <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-gold-400/70">08</span>
                <span className="h-px w-8 bg-gradient-to-r from-gold-400/60 to-transparent" />
                <span className="eyebrow">Open Source</span>
              </div>

              <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(1.9rem,4vw,3rem)]">
                Code in the <span className="serif-accent">open</span>
              </h2>

              <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-muted">
                Repositories, experiments, and contributions. I believe in clean,
                maintainable code and learning in public.
              </p>

              <div className="flex flex-wrap items-center gap-5 mt-7">
                <span className="flex items-center gap-2 text-[12px] text-cream/60">
                  <Code2 size={14} className="text-gold-300" /> Clean architecture
                </span>
                <span className="flex items-center gap-2 text-[12px] text-cream/60">
                  <GitBranch size={14} className="text-gold-300" /> Version controlled
                </span>
                <span className="flex items-center gap-2 text-[12px] text-cream/60">
                  <Star size={14} className="text-gold-300" /> Always learning
                </span>
              </div>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-8 !px-6 !py-3.5"
              >
                <GithubIcon size={17} /> View My GitHub
                <ExternalLink size={15} />
              </a>
            </div>

            <div className="flex lg:flex-col items-center gap-5">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-gold-400/20 blur-2xl" aria-hidden="true" />
                <div className="relative grid place-items-center w-24 h-24 sm:w-28 sm:h-28 rounded-[1.6rem] bg-gradient-to-br from-surface-2 to-ink border border-gold-200/20 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
                  <GithubIcon size={42} className="text-gold-200" />
                </div>
              </div>
              <div className="text-center lg:text-center">
                <p className="font-display font-semibold text-cream text-[15px]">@{username}</p>
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-faint mt-1">GitHub Profile</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
