/**
 * Nav-aware smooth scrolling.
 *
 * The navbar is a floating fixed pill, so `scrollIntoView` would either tuck the
 * section's top padding under it or leave a large empty band above the heading.
 * We instead land on the section's content container (which starts exactly at the
 * heading) with a small, consistent gap below the navbar.
 */

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function navOffset() {
  const pill = document.querySelector("nav > div");
  const bottom = pill ? pill.getBoundingClientRect().bottom : 88;
  return bottom + 20;
}

export function scrollToSection(hash, { instant = false } = {}) {
  const el = typeof hash === "string" ? document.querySelector(hash) : hash;
  if (!el) return;

  const behavior = instant || reduceMotion() ? "instant" : "smooth";

  // Home always goes back to the very top of the page.
  if (el.id === "home") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  // `.container-x` is the content wrapper: its top edge is the heading, because
  // the heading is always the first child. Unlike the animated heading itself it
  // has no transform, so the measurement is exact.
  const anchor = el.querySelector(".container-x") || el;
  const top = anchor.getBoundingClientRect().top + window.scrollY - navOffset();

  window.scrollTo({ top: Math.max(0, Math.round(top)), behavior });
}
