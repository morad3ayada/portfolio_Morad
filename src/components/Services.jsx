import { motion } from "framer-motion";
import {
  Smartphone,
  Server,
  Cloud,
  Database,
  Palette,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { useContent } from "../data/useContent";
import SectionHeading from "./SectionHeading";
import { useLanguage } from "../i18n/LanguageContext";

const iconMap = { Smartphone, Server, Cloud, Database, Palette, Layers };

export default function Services() {
  const { services } = useContent();
  const { t } = useLanguage();
  return (
    <section id="services" className="section relative overflow-hidden" aria-label="Services">
      <div className="absolute inset-0 grid-bg opacity-[0.3] [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_78%)] pointer-events-none" />

      <div className="container-x relative">
        <SectionHeading
          index="06"
          eyebrow={t("services.eyebrow")}
          title="What I can"
          accent="build for you"
          description="End-to-end mobile and backend development, backed by real-world production experience."
          className="mb-10 sm:mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Smartphone;
            const featured = i === 0;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="card card-hover relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between group"
              >
                {featured && (
                  <div className="aurora -bottom-16 -right-16 w-56 h-56 bg-gold-400/20" aria-hidden="true" />
                )}

                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <span className={`grid place-items-center rounded-2xl border transition-colors duration-300 ${
                      featured
                        ? "w-14 h-14 bg-gradient-to-br from-gold-200 to-gold-500 text-[#120d00] border-transparent shadow-[0_16px_40px_-16px_rgba(212,175,55,0.8)]"
                        : "w-12 h-12 bg-gold-400/10 border-gold-300/20 text-gold-300 group-hover:bg-gold-400/15"
                    }`}>
                      <Icon size={featured ? 24 : 20} />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className={`font-display font-semibold text-cream leading-snug ${featured ? "text-xl sm:text-2xl" : "text-[15.5px]"}`}>
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-[1.75] text-muted">
                    {service.description}
                  </p>
                </div>

                <div className="relative flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/[0.06]">
                  {service.tags.map((tag) => (
                    <span key={tag} className="tag !text-[10px] !py-1">{tag}</span>
                  ))}
                  <span className="ml-auto grid place-items-center w-6 h-6 rounded-full border border-white/[0.08] text-faint opacity-0 group-hover:opacity-100 group-hover:text-gold-300 group-hover:border-gold-300/30 transition-all duration-300">
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
