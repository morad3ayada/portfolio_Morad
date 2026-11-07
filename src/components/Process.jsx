import { motion } from "framer-motion";
import { useContent } from "../data/useContent";
import SectionHeading from "./SectionHeading";
import { useLanguage } from "../i18n/LanguageContext";

export default function Process() {
  const { process } = useContent();
  const { t } = useLanguage();
  return (
    <section id="process" className="section relative overflow-hidden" aria-label="My process">
      <div className="aurora top-[0%] right-[-10%] w-[460px] h-[460px] bg-gold-500/10" aria-hidden="true" />

      <div className="container-x relative">
        <SectionHeading
          index="07"
          eyebrow={t("process.eyebrow")}
          title="From idea to"
          accent="app store"
          description="A clear, predictable workflow that keeps you informed from the first conversation to launch day."
          className="mb-10 sm:mb-14"
        />

        <div className="flex flex-wrap justify-center gap-4">
          {process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-45px" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="card card-hover relative overflow-hidden p-5 sm:p-6 group w-full sm:w-[calc(50%_-_0.5rem)] lg:w-[calc(25%_-_0.75rem)]"
            >
              {/* top progress line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/25 to-transparent" />

              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-[2.6rem] leading-none font-extrabold bg-gradient-to-b from-gold-200/70 to-gold-600/20 bg-clip-text text-transparent">
                  {step.step}
                </span>
                <span className="grid place-items-center w-7 h-7 rounded-full border border-white/[0.08] text-faint group-hover:border-gold-300/30 group-hover:text-gold-300 transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                </span>
              </div>

              <h3 className="font-display text-[15px] font-semibold text-cream mb-2">
                {step.title}
              </h3>
              <p className="text-[12.5px] leading-[1.75] text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
