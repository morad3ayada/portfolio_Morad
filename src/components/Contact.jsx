import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, MapPin, CheckCircle, Copy, Check, ExternalLink, ArrowUpRight } from "lucide-react";
import { useContent } from "../data/useContent";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import SectionHeading from "./SectionHeading";
import { useLanguage } from "../i18n/LanguageContext";

export default function Contact() {
  const { personalInfo } = useContent();
  const { t } = useLanguage();
  const contactMethods = [
    { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, copyable: true },
    { icon: MessageCircle, label: "WhatsApp", value: personalInfo.phone, href: personalInfo.whatsapp, external: true },
    { icon: LinkedinIcon, label: "LinkedIn", value: personalInfo.linkedinUsername, href: personalInfo.linkedin, external: true },
    { icon: GithubIcon, label: "GitHub", value: personalInfo.github.replace("https://github.com/", ""), href: personalInfo.github, external: true },
  ];
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
      window.location.href = mailto;
      setSubmitted(true);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const inputClasses = (field) =>
    `w-full px-4 py-3.5 rounded-xl bg-white/[0.025] text-cream text-[13.5px] placeholder:text-faint/70 outline-none transition-all duration-300 ${
      errors[field]
        ? "border border-red-500/50 focus:border-red-400"
        : focusedField === field
        ? "border border-gold-300/45 shadow-[0_0_0_3px_rgba(212,175,55,0.08)]"
        : "border border-white/[0.08] hover:border-white/[0.14]"
    }`;

  return (
    <section id="contact" className="section relative overflow-hidden" aria-label="Contact">
      <div className="aurora bottom-[-12%] left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-gold-500/15 glow-pulse" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-[0.3] [mask-image:radial-gradient(ellipse_at_50%_80%,black,transparent_75%)] pointer-events-none" />

      <div className="container-x relative">
        <SectionHeading
          index="09"
          eyebrow={t("contact.eyebrow")}
          title="Let's build something"
          accent="great together"
          description="Have a project in mind or need a Flutter developer? Let's connect and turn the idea into a shipped product."
          className="mb-10 sm:mb-14"
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-4 sm:gap-5 lg:gap-7">
          {/* Left: contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              const inner = (
                <>
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-gold-400/10 border border-gold-300/15 text-gold-300 shrink-0 group-hover:bg-gold-400/15 transition-colors">
                    <Icon size={18} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-mono text-[9.5px] tracking-[0.18em] uppercase text-faint mb-1">
                      {method.label}
                    </span>
                    <span className="block text-[13.5px] text-cream font-medium truncate">{method.value}</span>
                  </span>
                </>
              );

              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 + i * 0.07 }}
                >
                  {method.copyable ? (
                    <div className="card card-hover group flex items-center gap-3.5 p-4 rounded-2xl">
                      {inner}
                      <button
                        onClick={copyEmail}
                        className="grid place-items-center w-9 h-9 rounded-lg text-faint hover:text-gold-300 hover:bg-white/[0.04] transition-all shrink-0"
                        aria-label="Copy email"
                      >
                        {copied ? <Check size={16} className="text-gold-300" /> : <Copy size={16} />}
                      </button>
                    </div>
                  ) : (
                    <a
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="card card-hover group flex items-center gap-3.5 p-4 rounded-2xl"
                    >
                      {inner}
                      <ExternalLink size={15} className="text-faint group-hover:text-gold-300 transition-colors shrink-0" />
                    </a>
                  )}
                </motion.div>
              );
            })}

            <div className="card group flex items-center gap-3.5 p-4 rounded-2xl">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-gold-400/10 border border-gold-300/15 text-gold-300 shrink-0">
                <MapPin size={18} />
              </span>
              <div>
                <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-faint mb-1">Location</p>
                <p className="text-[13.5px] text-cream font-medium">{personalInfo.location}</p>
              </div>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/25 px-2.5 py-1 text-[9.5px] font-mono uppercase tracking-wider text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Open
              </span>
            </div>

            <a
              href={personalInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 flex items-center justify-between rounded-2xl bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500 px-5 py-4 text-[#120d00] shadow-[0_18px_45px_-18px_rgba(212,175,55,0.7)] hover:shadow-[0_24px_55px_-18px_rgba(212,175,55,0.85)] transition-shadow"
            >
              <span className="flex items-center gap-2.5 font-display text-[13.5px] font-semibold">
                <MessageCircle size={18} /> Quick chat on WhatsApp
              </span>
              <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="card gold-border p-5 sm:p-8 lg:p-9"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-14"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, delay: 0.1 }}
                  className="grid place-items-center w-16 h-16 mx-auto mb-5 rounded-full bg-gold-400/10 border border-gold-300/25"
                >
                  <CheckCircle size={30} className="text-gold-300" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-cream mb-2.5">Message Ready</h3>
                <p className="text-[13.5px] text-muted mb-8">Your email client should open with the message.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="btn-ghost !px-6 !py-3 !text-[13px]"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block font-mono text-[9.5px] tracking-[0.18em] uppercase text-faint mb-2">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClasses("name")}
                      placeholder="Your name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="text-red-400 text-[11px] mt-1.5" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block font-mono text-[9.5px] tracking-[0.18em] uppercase text-faint mb-2">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClasses("email")}
                      placeholder="your@email.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="text-red-400 text-[11px] mt-1.5" role="alert">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block font-mono text-[9.5px] tracking-[0.18em] uppercase text-faint mb-2">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses("subject")}
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-mono text-[9.5px] tracking-[0.18em] uppercase text-faint mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputClasses("message")} resize-none`}
                    placeholder="Tell me about your project..."
                    aria-required="true"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-red-400 text-[11px] mt-1.5" role="alert">{errors.message}</p>}
                </div>

                <button type="submit" className="btn-gold w-full !py-4">
                  <Send size={17} /> Send Message
                </button>

                <p className="text-center text-[11px] text-faint">
                  Or email directly at{" "}
                  <a href={`mailto:${personalInfo.email}`} className="text-gold-300/90 hover:text-gold-200 transition-colors">
                    {personalInfo.email}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
