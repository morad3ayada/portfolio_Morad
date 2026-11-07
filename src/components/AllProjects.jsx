import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "../data/useContent";
import SectionHeading from "./SectionHeading";
import { useLanguage } from "../i18n/LanguageContext";
import TiltCard from "./TiltCard";

function getFilterTags(project) {
  const tags = [];
  const tech = project.technologies.join(" ").toLowerCase();
  if (tech.includes("flutter") || tech.includes("dart")) tags.push("flutter");
  if (project.category !== "AI / Healthcare" && project.category !== "Media" && project.category !== "Web Platform") tags.push("mobile");
  if (tech.includes("python") || tech.includes("deep learning")) tags.push("ai");
  if (project.category === "Graphic Design") tags.push("design");
  if (project.featured) tags.push("featured");
  return tags;
}

export default function AllProjects({ onOpenProject }) {
  const { projects } = useContent();
  const { t } = useLanguage();
  const filters = [
    { label: t("allProjects.filter.all"), value: "all" },
    { label: t("allProjects.filter.flutter"), value: "flutter" },
    { label: t("allProjects.filter.mobile"), value: "mobile" },
    { label: t("allProjects.filter.ai"), value: "ai" },
    { label: t("allProjects.filter.design"), value: "design" },
    { label: t("allProjects.filter.featured"), value: "featured" },
  ];
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => getFilterTags(p).includes(activeFilter));

  return (
    <section id="all-projects" className="section relative overflow-hidden" aria-label="All projects">
      <div className="absolute inset-0 grid-bg opacity-[0.3] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />

      <div className="container-x relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mb-8 sm:mb-12">
          <SectionHeading
            index="04"
            eyebrow={t("allProjects.eyebrow")}
            title={t("allProjects.title")}
            accent={t("allProjects.titleAccent")}
            align="left"
            description={t("allProjects.description")}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2 shrink-0"
            role="tablist"
            aria-label="Project filters"
          >
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                role="tab"
                aria-selected={activeFilter === f.value}
                className={`rounded-full px-4 py-2 text-[12.5px] font-medium border transition-all duration-300 ${
                  activeFilter === f.value
                    ? "bg-gold-400/10 text-gold-200 border-gold-300/30"
                    : "bg-white/[0.02] text-muted border-white/[0.06] hover:text-cream hover:border-gold-200/20"
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                transition={{ duration: 0.4, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full sm:w-[calc(50%_-_0.625rem)] lg:w-[calc(33.333%_-_1rem)]"
              >
                <TiltCard className="h-full">
                  <div
                    onClick={() => onOpenProject(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenProject(project); }}
                    aria-label={`View ${project.name} details`}
                    className="card card-hover group cursor-pointer overflow-hidden h-full flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={project.screenshots[0]?.file}
                        alt={`${project.name} — ${project.type}`}
                        className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-[900ms] ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/25 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <span className="absolute top-3 left-3 chip !py-1 !px-2.5 !text-[10px] backdrop-blur-md">
                        {project.category}
                      </span>

                      {project.status === "live" && (
                        <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-[#0b0b0d]/70 backdrop-blur-md border border-gold-300/30 px-2.5 py-1 text-[9.5px] font-mono uppercase tracking-wider text-gold-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-300 animate-pulse" /> Live
                        </span>
                      )}

                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="font-display text-xl font-bold text-cream leading-tight group-hover:text-gold-200 transition-colors duration-300">
                          {project.name}
                        </h3>
                        <p className="text-[11px] text-cream/55 line-clamp-1 mt-0.5">{project.type}</p>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-[13px] leading-relaxed text-muted line-clamp-2 mb-5 flex-1">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="tag !text-[10px] !py-1">{tech}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                        <span className="flex items-center gap-1.5 text-[12px] font-medium text-gold-300">
                          {t("allProjects.viewDetails")}
                          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </span>
                        <span className="font-mono text-[10px] text-faint">
                          {project.screenshots.length} {t("allProjects.shots")}
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
