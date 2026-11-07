import { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Smartphone, Tag, User, Layers, ArrowUpRight } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setCurrentImage(0);
      setDirection(1);
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") { setDirection(-1); setCurrentImage((p) => p > 0 ? p - 1 : (project?.screenshots.length || 1) - 1); }
      if (e.key === "ArrowRight") { setDirection(1); setCurrentImage((p) => p < (project?.screenshots.length || 1) - 1 ? p + 1 : 0); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  if (!project) return null;

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 180 : -180, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d > 0 ? -180 : 180, opacity: 0, scale: 0.97 }),
  };

  const next = (e) => { e.stopPropagation(); setDirection(1); setCurrentImage((p) => p < project.screenshots.length - 1 ? p + 1 : 0); };
  const prev = (e) => { e.stopPropagation(); setDirection(-1); setCurrentImage((p) => p > 0 ? p - 1 : project.screenshots.length - 1); };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} project details`}
      >
        <div className="absolute inset-0 bg-ink/90 backdrop-blur-xl" />

        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 44, scale: 0.94 }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[1.7rem] bg-[#0b0b0d] border border-gold-200/15 shadow-[0_60px_140px_-50px_rgba(0,0,0,1)]"
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            className="absolute top-4 right-4 z-20 grid place-items-center w-10 h-10 rounded-full bg-ink/70 backdrop-blur-md border border-white/10 text-muted hover:text-gold-200 hover:border-gold-300/40 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </motion.button>

          {/* Gallery */}
          <div className="relative aspect-[4/5] sm:aspect-[16/9] bg-black rounded-t-[1.7rem] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentImage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                src={project.screenshots[currentImage]?.file}
                alt={project.screenshots[currentImage]?.label}
                className="w-full h-full object-contain absolute inset-0"
              />
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12 flex items-end justify-between">
              <div>
                <p className="text-[13px] text-cream/90 font-medium">{project.screenshots[currentImage]?.label}</p>
                <p className="font-mono text-[10.5px] text-gold-300/70 mt-1 tracking-wider">
                  {String(currentImage + 1).padStart(2, "0")} / {String(project.screenshots.length).padStart(2, "0")}
                </p>
              </div>
            </div>

            {project.screenshots.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-ink/60 hover:bg-gold-400/20 border border-white/10 hover:border-gold-300/30 text-cream backdrop-blur-md transition-all"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-ink/60 hover:bg-gold-400/20 border border-white/10 hover:border-gold-300/30 text-cream backdrop-blur-md transition-all"
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {project.screenshots.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto border-b border-white/[0.06] scrollbar-hide">
              {project.screenshots.map((shot, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > currentImage ? 1 : -1); setCurrentImage(i); }}
                  className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border transition-all duration-300 ${
                    i === currentImage
                      ? "border-gold-300 shadow-[0_0_18px_rgba(212,175,55,0.25)]"
                      : "border-white/[0.06] opacity-45 hover:opacity-80"
                  }`}
                  aria-label={`View ${shot.label}`}
                >
                  <img src={shot.file} alt={shot.label} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-9 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="chip">{project.category}</span>
                {project.role && <span className="tag">{project.role}</span>}
                {project.status === "live" && (
                  <span className="flex items-center gap-1.5 rounded-full bg-gold-400/10 border border-gold-300/25 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-gold-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-300 animate-pulse" />{t("modal.live")}
                  </span>
                )}
              </div>
              <h2 className="font-display text-2xl sm:text-[2rem] font-extrabold tracking-tight text-cream leading-none">
                {project.name}
              </h2>
              <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase text-gold-300/75">
                {project.type}
              </p>
            </div>

            <p className="text-[14px] leading-[1.85] text-muted">{project.description}</p>

            {project.userRoles && (
              <div className="card !rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <User size={15} className="text-gold-300" />
                  <h4 className="font-display text-[12.5px] font-semibold text-cream">{t("modal.userRoles")}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.userRoles.map((role) => (
                    <span key={role} className="tag !text-[10.5px]">{role}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="card !rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3.5">
                <Layers size={15} className="text-gold-300" />
                <h4 className="font-display text-[12.5px] font-semibold text-cream">{t("modal.keyFeatures")}</h4>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[12.5px] text-muted leading-relaxed">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-gold-300 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card !rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={15} className="text-gold-300" />
                <h4 className="font-display text-[12.5px] font-semibold text-cream">{t("modal.technologies")}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="chip !text-[10.5px]">{tech}</span>
                ))}
              </div>
            </div>

            {project.role && (
              <div className="card !rounded-2xl p-5">
                <h4 className="font-display text-[12.5px] font-semibold text-cream mb-1.5">{t("modal.myRole")}</h4>
                <p className="text-[12.5px] text-muted">{project.role}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-1">
              {project.links?.appStore && (
                <a href={project.links.appStore} target="_blank" rel="noopener noreferrer" className="btn-gold !px-5 !py-3 !text-[13px]">
                  <Smartphone size={15} /> App Store <ArrowUpRight size={14} />
                </a>
              )}
              {project.links?.googlePlay && (
                <a href={project.links.googlePlay} target="_blank" rel="noopener noreferrer" className="btn-gold !px-5 !py-3 !text-[13px]">
                  <Smartphone size={15} /> Google Play <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
