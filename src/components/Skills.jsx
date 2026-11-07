import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone, Server, Database, Brain, Palette, Wrench, Sparkles,
} from "lucide-react";
import { useContent } from "../data/useContent";
import SectionHeading from "./SectionHeading";
import { useLanguage } from "../i18n/LanguageContext";

const iconMap = { Smartphone, Server, Database, Brain, Palette, Wrench };

export default function Skills() {
  const { skills } = useContent();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const active = skills[activeTab];
  const ActiveIcon = iconMap[active.icon] || Smartphone;

  return (
    <section id="skills" className="section relative overflow-hidden" aria-label="Skills and technologies">
      <div className="aurora top-[6%] left-[-12%] w-[520px] h-[520px] bg-gold-500/10" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-[0.35] [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_75%)] pointer-events-none" />

      <div className="container-x relative">
        <SectionHeading
          index="02"
          eyebrow="Toolkit"
          title="The stack behind"
          accent="every product"
          description="A focused set of tools I use daily to design, build, and ship production-grade mobile experiences."
          className="mb-10 sm:mb-14"
        />

        <div className="grid lg:grid-cols-[280px_1fr] gap-5 lg:gap-6">
          {/* Category rail */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto scrollbar-hide pb-1 lg:pb-0">
            {skills.map((cat, i) => {
              const CatIcon = iconMap[cat.icon] || Smartphone;
              const isActive = activeTab === i;
              return (
                <button
                  key={cat.category}
                  onClick={() => setActiveTab(i)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`skill-panel-${i}`}
                  className={`group relative flex items-center gap-3 shrink-0 lg:w-full lg:flex-1 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 border ${
                    isActive
                      ? "bg-gold-400/[0.09] border-gold-300/25 text-cream"
                      : "bg-white/[0.02] border-white/[0.05] text-muted hover:text-cream hover:border-gold-200/15"
                  }`}
                >
                  <span className={`font-mono text-[10px] tracking-wider ${isActive ? "text-gold-300" : "text-faint"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <CatIcon size={16} className={isActive ? "text-gold-300" : "text-faint group-hover:text-gold-200 transition-colors"} />
                  <span className="text-[13px] font-medium whitespace-nowrap">{cat.category}</span>
                  {isActive && (
                    <motion.span
                      layoutId="skill-dot"
                      className="hidden lg:block absolute right-4 w-1.5 h-1.5 rounded-full bg-gold-300"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`skill-panel-${activeTab}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="card gold-border p-5 sm:p-8 lg:p-10 lg:min-h-[26.5rem]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-7 mb-7 border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-300/20 text-gold-300">
                    <ActiveIcon size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-cream leading-tight">
                      {active.category}
                    </h3>
                    <p className="text-[11.5px] text-faint mt-1 font-mono tracking-wide">
                      {active.items.length} technologies
                    </p>
                  </div>
                </div>
                <span className="chip">
                  <Sparkles size={11} /> Hands-on
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {active.items.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                  >
                    <div className="flex items-baseline justify-between mb-2.5">
                      <span className="text-[13.5px] font-medium text-cream/90">{skill.name}</span>
                      <span className="font-mono text-[11px] text-gold-300/80">{skill.level}%</span>
                    </div>
                    <div className="h-[6px] rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.1, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 shadow-[0_0_12px_rgba(212,175,55,0.45)]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-9 pt-6 border-t border-white/[0.06] flex items-center gap-2.5 text-[11.5px] text-faint">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-300 animate-pulse" />
                Continuously learning — currently deepening backend &amp; AI integration skills.
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
