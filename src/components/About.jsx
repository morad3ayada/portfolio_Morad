import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, Code2, Layers, Rocket, ArrowUpRight } from "lucide-react";
import { useContent } from "../data/useContent";
import { useLanguage } from "../i18n/LanguageContext";
import SectionHeading from "./SectionHeading";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const highlights = [
  { icon: Code2, label: "Clean Code", desc: "Readable & scalable" },
  { icon: Layers, label: "Full Lifecycle", desc: "Design → Deploy" },
  { icon: Rocket, label: "Production", desc: "App Store & Play" },
];

export default function About() {
  const { personalInfo } = useContent();
  const { t } = useLanguage();
  const highlights = [
    { icon: Code2, label: t("about.cleanCode"), desc: t("about.cleanCodeDesc") },
    { icon: Layers, label: t("about.fullLifecycle"), desc: t("about.fullLifecycleDesc") },
    { icon: Rocket, label: t("about.production"), desc: t("about.productionDesc") },
  ];
  return (
    <section id="about" className="section relative overflow-hidden" aria-label="About me">
      <div className="aurora top-[10%] right-[-10%] w-[520px] h-[520px] bg-gold-500/10" aria-hidden="true" />

      <div className="container-x relative">
        <SectionHeading
          index="01"
          eyebrow={t("about.eyebrow")}
          title={t("about.title")}
          accent={t("about.titleAccent")}
          description="From concept to app stores — I build mobile experiences that people actually use."
          align="center"
          className="mb-10 sm:mb-14"
        />

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Portrait card */}
          <motion.div {...fadeUp(0.05)} className="lg:col-span-5 relative group">
            <div className="card gold-border overflow-hidden rounded-[1.7rem] h-full min-h-[360px] sm:min-h-[440px]">
              <div className="relative h-full">
                <img
                  src="/Photo/M2.jpg"
                  alt="Morad Ayada"
                  className="w-full h-full min-h-[360px] sm:min-h-[440px] object-cover object-top group-hover:scale-[1.04] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="font-display text-xl font-bold text-cream">{personalInfo.name}</p>
                  <p className="text-gold-300 text-sm mt-1">{personalInfo.subtitle}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {[
                      { icon: MapPin, text: personalInfo.location },
                      { icon: Calendar, text: `${personalInfo.yearsOfExperience} Years` },
                      { icon: Briefcase, text: t("about.openToWork") },
                    ].map(({ icon: Icon, text }) => (
                      <span
                        key={text}
                        className="flex items-center gap-1.5 text-[11px] text-cream/80 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full"
                      >
                        <Icon size={12} className="text-gold-300 shrink-0" />
                        {text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right bento */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <motion.div {...fadeUp(0.12)} className="card card-hover p-5 sm:p-7">
              <div className="space-y-4">
                {personalInfo.longBio.map((para, i) => (
                  <p key={i} className="text-[14.5px] leading-[1.85] text-muted">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {personalInfo.stats.map((stat) => (
                <div key={stat.label} className="card card-hover p-4 text-center">
                  <p className="font-display text-2xl sm:text-[1.7rem] font-extrabold gold-text leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[10.5px] text-faint mt-2 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div {...fadeUp(0.28)} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {highlights.map(({ icon: Icon, label, desc }, i) => (
                <div key={label} className={`card card-hover p-4 text-center ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                  <span className="grid place-items-center w-9 h-9 rounded-xl bg-gold-400/10 text-gold-300 mx-auto mb-3">
                    <Icon size={16} />
                  </span>
                  <p className="text-cream text-[12px] font-semibold leading-tight">{label}</p>
                  <p className="text-faint text-[10.5px] mt-1">{desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Strengths */}
            <motion.div {...fadeUp(0.36)} className="grid sm:grid-cols-2 gap-3">
              <div className="card p-5 border-gold-300/20 bg-gold-400/[0.04]">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-300 animate-pulse" />
                  <h4 className="font-display text-[13px] font-semibold text-cream">Key Strength</h4>
                </div>
                <p className="text-muted text-[12.5px] leading-relaxed">
                  Full mobile lifecycle — concept, UI/UX, development, API integration, testing & deployment.
                </p>
              </div>

              <div className="card p-5 border-emerald-400/15 bg-emerald-400/[0.03] flex items-center gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-emerald-400/10 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </span>
                <div>
                  <p className="font-display text-[13px] font-semibold text-cream flex items-center gap-1">
                    Available Now <ArrowUpRight size={13} className="text-emerald-400" />
                  </p>
                  <p className="text-faint text-[11.5px] mt-0.5">Ready to start immediately</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
