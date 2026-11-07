import { motion } from "framer-motion";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  className = "",
}) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`${isCenter ? "text-center mx-auto" : "text-left"} max-w-2xl ${className}`}
    >
      <div className={`flex items-center gap-3 mb-5 ${isCenter ? "justify-center" : ""}`}>
        {index && (
          <span className="font-mono text-[11px] tracking-[0.2em] text-gold-400/70">
            {index}
          </span>
        )}
        <span className="h-px w-8 bg-gradient-to-r from-gold-400/60 to-transparent" />
        <span className="eyebrow">{eyebrow}</span>
      </div>

      <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(1.9rem,4vw,3.1rem)] text-balance">
        {title}{" "}
        {accent && <span className="serif-accent">{accent}</span>}
      </h2>

      {description && (
        <p className={`mt-5 text-muted leading-relaxed text-[15px] ${isCenter ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
