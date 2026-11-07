import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Heart, ArrowUpRight } from "lucide-react";
import { useContent } from "../data/useContent";
import SectionHeading from "./SectionHeading";
import { useLanguage } from "../i18n/LanguageContext";
import { scrollToSection } from "../lib/scrollToSection";

const typeIcon = {
  work: Briefcase,
  training: GraduationCap,
  competition: Trophy,
  volunteering: Heart,
};

const typeStyle = {
  work: "text-gold-200 bg-gold-400/10 border-gold-300/25",
  training: "text-gold-200 bg-gold-400/10 border-gold-300/25",
  competition: "text-gold-200 bg-gold-400/10 border-gold-300/25",
  volunteering: "text-gold-200 bg-gold-400/10 border-gold-300/25",
};

export default function Experience() {
  const { experience } = useContent();
  const { t } = useLanguage();
  return (
    <section id="experience" className="section relative overflow-hidden" aria-label="Experience and journey">
      <div className="aurora bottom-[6%] left-[-14%] w-[540px] h-[540px] bg-gold-500/10" aria-hidden="true" />

      <div className="container-x relative">
        <SectionHeading
          index="05"
          eyebrow={t("experience.eyebrow")}
          title="A path shaped by"
          accent="shipping code"
          description="Freelance work, corporate training, national programs, and competitive challenges — each step sharpened the craft."
          className="mb-10 sm:mb-14"
        />

        <div className="space-y-3 sm:space-y-4">
          {experience.map((exp, i) => {
            const Icon = typeIcon[exp.type] || Briefcase;
            const isCurrent = i === 0;
            return (
              <motion.article
                key={`${exp.role}-${i}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="card card-hover relative overflow-hidden p-5 sm:p-7 lg:p-8"
              >
                {/* watermark index */}
                <span className="pointer-events-none select-none absolute -top-4 right-4 font-display text-[4.5rem] font-extrabold leading-none text-white/[0.03]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative grid lg:grid-cols-[210px_1fr] gap-5 lg:gap-9">
                  {/* Meta */}
                  <div className="flex lg:flex-col items-start justify-between lg:justify-start gap-3">
                    <div>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10.5px] font-medium capitalize ${typeStyle[exp.type] || typeStyle.work}`}>
                        <Icon size={11} /> {exp.type}
                      </span>
                      <p className="mt-3 font-mono text-[11px] tracking-wide text-gold-300/85">
                        {exp.period}
                      </p>
                      <p className="mt-1 text-[12.5px] text-faint">{exp.company}</p>
                    </div>

                    {isCurrent && (
                      <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/25 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-emerald-300 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Now
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="lg:border-l lg:border-white/[0.06] lg:pl-9">
                    <h3 className="font-display text-[1.05rem] sm:text-lg font-semibold text-cream leading-snug">
                      {exp.role}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-[1.8] text-muted">
                      {exp.description}
                    </p>

                    <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-[12.5px] text-cream/60 leading-relaxed">
                          <span className="mt-[7px] w-1 h-1 rounded-full bg-gold-300/70 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {exp.technologies.map((t) => (
                          <span key={t} className="tag !text-[10px] !py-1">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
            className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-faint hover:text-gold-200 transition-colors"
          >
            Be the next chapter
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
