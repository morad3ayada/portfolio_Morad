import { motion } from "framer-motion";
import { Smartphone, ArrowUpRight, Eye, Layers } from "lucide-react";
import { useContent } from "../data/useContent";
import SectionHeading from "./SectionHeading";
import { useLanguage } from "../i18n/LanguageContext";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";

function ProjectShowcase({ project, index, onOpen }) {
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 items-center"
    >
      {/* Visual */}
      <div className={`${isReversed ? "lg:order-2" : ""} relative`}>
        <span className="hidden lg:block absolute -top-12 -left-2 font-display text-[5.5rem] leading-none font-extrabold text-white/[0.035] select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        <TiltCard>
          <div
            className="relative group cursor-pointer"
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(project); }}
            aria-label={`View ${project.name} details`}
          >
            <div className="relative rounded-[1.6rem] overflow-hidden border border-gold-200/10 bg-surface group-hover:border-gold-300/30 transition-colors duration-500 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.95)]">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={project.screenshots[0]?.file}
                  alt={`${project.name} — ${project.type}`}
                  className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
                  loading="lazy"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04] rounded-[1.6rem]" />

              {/* hover action */}
              <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <span className="flex items-center gap-2 rounded-full bg-gold-300 text-[#120d00] px-5 py-2.5 text-[13px] font-display font-semibold shadow-[0_16px_40px_-12px_rgba(212,175,55,0.8)]">
                  <Eye size={15} /> View case study
                </span>
              </div>

              {/* bottom meta */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl glass border border-gold-200/15 px-4 py-2.5">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold-200/90">
                  {project.category}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-cream/70">
                  <Layers size={12} className="text-gold-300" />
                  {project.screenshots.length} screens
                </span>
              </div>
            </div>

            {project.status === "live" && (
              <div className="absolute -top-3 -right-3 rounded-2xl bg-gradient-to-br from-gold-100 to-gold-400 text-[#120d00] px-3.5 py-2 shadow-[0_16px_36px_-14px_rgba(212,175,55,0.9)] rotate-2">
                <span className="flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#120d00] animate-pulse" /> Live
                </span>
              </div>
            )}
          </div>
        </TiltCard>
      </div>

      {/* Copy */}
      <div className={`${isReversed ? "lg:order-1" : ""}`}>
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="chip">{project.category}</span>
          {project.role && (
            <span className="tag">{project.role}</span>
          )}
        </div>

        <h3 className="font-display font-extrabold tracking-[-0.025em] leading-none text-[clamp(2rem,4vw,3.2rem)] text-cream">
          {project.name}
        </h3>
        <p className="mt-2.5 font-mono text-[11.5px] tracking-[0.14em] uppercase text-gold-300/80">
          {project.type}
        </p>

        <p className="mt-5 text-[14.5px] leading-[1.85] text-muted max-w-xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.technologies.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <MagneticButton
            href="#"
            onClick={(e) => { e.preventDefault(); onOpen(project); }}
            className="btn-gold !px-6 !py-3"
          >
            View Project <ArrowUpRight size={16} />
          </MagneticButton>

          {project.links?.appStore && (
            <a
              href={project.links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-5 !py-3 !text-[13px]"
            >
              <Smartphone size={15} /> App Store
            </a>
          )}
          {project.links?.googlePlay && (
            <a
              href={project.links.googlePlay}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-5 !py-3 !text-[13px]"
            >
              <Smartphone size={15} /> Google Play
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedProjects({ onOpenProject }) {
  const { projects } = useContent();
  const { t } = useLanguage();
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="projects" className="section relative overflow-hidden" aria-label="Featured projects">
      <div className="aurora top-[22%] right-[-14%] w-[620px] h-[620px] bg-gold-400/10" aria-hidden="true" />

      <div className="container-x relative">
        <SectionHeading
          index="03"
          eyebrow={t("featured.eyebrow")}
          title={t("featured.title")}
          accent={t("featured.titleAccent")}
          description={t("featured.description")}
          className="mb-10 sm:mb-16 lg:mb-20"
        />

        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {featured.map((project, i) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={i}
              onOpen={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
