// ─── SENES MEDIA · shared components (cursor, scramble, magnetic) ─────

// ─── Custom cursor with magnetic ring + label ─────────────────
function Cursor() {
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const labelRef = React.useRef(null);
  const labelTextRef = React.useRef("");
  const target = React.useRef({ x: 0, y: 0 });
  const ring = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    let raf;
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${e.clientX + 18}px, ${e.clientY + 18}px)`;
      }
    };
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (!t) {
        ringRef.current?.classList.remove("hover", "text", "drag");
        labelRef.current?.classList.remove("show");
        return;
      }
      const mode = t.getAttribute("data-cursor");
      ringRef.current?.classList.remove("hover", "text", "drag");
      if (mode === "text") ringRef.current?.classList.add("text");
      else if (mode === "drag") ringRef.current?.classList.add("drag");
      else ringRef.current?.classList.add("hover");
      const label = t.getAttribute("data-cursor-label");
      if (label) {
        labelTextRef.current = label;
        if (labelRef.current) labelRef.current.textContent = label;
        labelRef.current?.classList.add("show");
      } else {
        labelRef.current?.classList.remove("show");
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <React.Fragment>
      <div ref={ringRef} className="cursor-ring"></div>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={labelRef} className="cursor-label"></div>
    </React.Fragment>
  );
}

// ─── Scramble text on intersect ──────────────────────────────
function Scramble({ text, className = "", as: As = "span", trigger = "view", delay = 0 }) {
  const ref = React.useRef(null);
  const [out, setOut] = React.useState(text);
  const charsRef = React.useRef("!<>-_\\/[]{}—=+*^?#________");
  const fired = React.useRef(false);

  const run = React.useCallback(() => {
    if (fired.current) return;
    fired.current = true;
    const target = text;
    const chars = charsRef.current;
    let frame = 0;
    const total = 24;
    const queue = target.split("").map((ch, i) => {
      const start = Math.floor(Math.random() * total * 0.4);
      const end = start + Math.floor(Math.random() * total * 0.6) + 6;
      return { from: chars[Math.floor(Math.random() * chars.length)], to: ch, start, end };
    });
    const step = () => {
      let output = "";
      let done = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) { output += to; done++; }
        else if (frame >= start) {
          if (Math.random() < 0.28) queue[i].from = chars[Math.floor(Math.random() * chars.length)];
          output += `<span style="color:var(--red)">${queue[i].from}</span>`;
        } else { output += to === " " ? " " : `<span style="opacity:0.3">${to}</span>`; }
      }
      setOut(output);
      frame++;
      if (done < queue.length) requestAnimationFrame(step);
      else setOut(target);
    };
    setTimeout(() => step(), delay);
  }, [text, delay]);

  React.useEffect(() => {
    if (trigger === "mount") { run(); return; }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) run(); });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [run, trigger]);

  return <As ref={ref} className={className} dangerouslySetInnerHTML={{ __html: out }} />;
}

// ─── Magnetic wrapper ───────────────────────────────────────
function Magnetic({ children, strength = 0.35, className = "", ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => { el.style.transform = `translate(0, 0)`; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [strength]);
  return <div ref={ref} className={`magnetic ${className}`} style={{ transition: "transform 0.4s var(--easing-out)", display: "inline-flex" }} {...rest}>{children}</div>;
}

// ─── Reveal on scroll (re-triggers when re-entering view) ──
function Reveal({ children, delay = 0, className = "" }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
        } else {
          // re-arm: only if user has scrolled clearly past it
          if (e.boundingClientRect.top > window.innerHeight * 0.9 ||
              e.boundingClientRect.bottom < -50) {
            el.classList.remove("in");
          }
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

// ─── SENES Logo mark (red 4-petal swirl) ─────────────────────
function LogoMark({ size = 28, color = "var(--red)" }) {
  return (
    <img
      src="assets/senes-logo.png"
      width={size}
      height={size}
      alt="SENES"
      aria-hidden
      style={{ display: "block", objectFit: "contain", flexShrink: 0 }}
    />
  );
}

// ─── Placeholder image card ─────────────────────────────────
function Placeholder({ label = "image", color = "#1a1a1a", accent = "#666", aspect = "16/10", note = "", style = {} }) {
  return (
    <div style={{
      aspectRatio: aspect,
      background: `repeating-linear-gradient(45deg, ${color}, ${color} 12px, ${color}cc 12px, ${color}cc 24px)`,
      position: "relative",
      overflow: "hidden",
      borderRadius: 0,
      ...style,
    }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 30%, ${accent}30, transparent 60%)` }}></div>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, opacity: 0.8 }}>{label}</div>
        {note ? <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>{note}</div> : null}
      </div>
      <div style={{ position: "absolute", top: 12, left: 12, width: 8, height: 8, borderTop: `1px solid ${accent}80`, borderLeft: `1px solid ${accent}80` }}></div>
      <div style={{ position: "absolute", top: 12, right: 12, width: 8, height: 8, borderTop: `1px solid ${accent}80`, borderRight: `1px solid ${accent}80` }}></div>
      <div style={{ position: "absolute", bottom: 12, left: 12, width: 8, height: 8, borderBottom: `1px solid ${accent}80`, borderLeft: `1px solid ${accent}80` }}></div>
      <div style={{ position: "absolute", bottom: 12, right: 12, width: 8, height: 8, borderBottom: `1px solid ${accent}80`, borderRight: `1px solid ${accent}80` }}></div>
    </div>
  );
}

// ─── Arrow icon ───────────────────────────────────────────
function Arrow({ size = 14 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} className="arrow" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 13 L13 3 M6 3 L13 3 L13 10"/>
    </svg>
  );
}

// ─── Marquee ──────────────────────────────────────────────
function Marquee({ children, speed = 40, direction = "left" }) {
  return (
    <div style={{ overflow: "hidden", width: "100%", display: "flex" }}>
      <div style={{
        display: "flex", gap: 64, whiteSpace: "nowrap", flexShrink: 0,
        animation: `marquee-${direction} ${speed}s linear infinite`,
      }}>
        {children}{children}{children}
      </div>
      <style>{`
        @keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

Object.assign(window, { Cursor, Scramble, Magnetic, Reveal, LogoMark, Placeholder, Arrow, Marquee });
