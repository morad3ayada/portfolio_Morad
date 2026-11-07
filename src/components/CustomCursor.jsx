import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const followerX = useSpring(0, { damping: 35, stiffness: 200, mass: 0.8 });
  const followerY = useSpring(0, { damping: 35, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    if (isMobile) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const overInteractive = (e) => {
      const target = e.target.closest("a, button, [data-cursor='pointer'], input, textarea");
      setHovering(!!target);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseover", overInteractive);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", overInteractive);
    };
  }, [isMobile, visible, cursorX, cursorY, followerX, followerY]);

  useEffect(() => {
    if (isMobile) {
      document.body.style.cursor = "auto";
    } else {
      document.body.style.cursor = "none";
    }
    return () => { document.body.style.cursor = "auto"; };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          width: clicking ? 8 : hovering ? 12 : 6,
          height: clicking ? 8 : hovering ? 12 : 6,
          borderRadius: "50%",
          backgroundColor: "#B8A88A",
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: followerX,
          top: followerY,
          x: "-50%",
          y: "-50%",
          width: hovering ? 48 : 36,
          height: hovering ? 48 : 36,
          borderRadius: "50%",
          border: `1.5px solid ${hovering ? "rgba(212,175,55,0.55)" : "rgba(166,162,154,0.22)"}`,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  );
}

