// ─── SENES MEDIA · Laptop X-Ray Hero ──────────────────────────────
// A laptop. On hover, the cursor becomes a lens — beneath the website
// mockup lies the source code that builds it.

function LaptopXray() {
  const wrapRef = React.useRef(null);
  const screenRef = React.useRef(null);
  const maskRef = React.useRef(null);
  const labelRef = React.useRef(null);
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const screen = screenRef.current;
    if (!wrap || !screen) return;
    let tiltX = 0, tiltY = 0;
    let cursorX = 50, cursorY = 50;
    let raf;
    const tick = () => {
      if (screen) {
        screen.style.setProperty("--tilt-x", `${tiltX}deg`);
        screen.style.setProperty("--tilt-y", `${tiltY}deg`);
        screen.style.setProperty("--mx", `${cursorX}%`);
        screen.style.setProperty("--my", `${cursorY}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      const r = screen.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      cursorX = x * 100;
      cursorY = y * 100;
      // outer tilt — subtle parallax based on whole wrapper
      const wr = wrap.getBoundingClientRect();
      const wx = (e.clientX - wr.left) / wr.width - 0.5;
      const wy = (e.clientY - wr.top) / wr.height - 0.5;
      tiltY = wx * 6;
      tiltX = -wy * 4;
      if (labelRef.current) {
        labelRef.current.style.left = `${e.clientX - r.left}px`;
        labelRef.current.style.top  = `${e.clientY - r.top}px`;
      }
    };
    wrap.addEventListener("mousemove", onMove);
    tick();
    return () => { wrap.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={wrapRef} className="laptop-wrap"
         onMouseEnter={() => setHovering(true)}
         onMouseLeave={() => setHovering(false)}
         data-cursor="drag" data-cursor-label="Hold to inspect">
      {/* Ambient red glow */}
      <div className="laptop-glow" />

      {/* The laptop itself */}
      <div className="laptop" ref={screenRef}>
        {/* Screen bezel */}
        <div className="laptop-screen">
          {/* Notch / camera */}
          <div className="laptop-notch">
            <div className="laptop-camera" />
          </div>

          {/* Inner screen */}
          <div className="laptop-inner">
            {/* LAYER 1 — code (beneath) */}
            <div className="layer code-layer">
              <CodeView />
            </div>

            {/* LAYER 2 — website mockup (above; clipped on hover) */}
            <div className={`layer site-layer ${hovering ? "active" : ""}`}>
              <SiteMock />
            </div>

            {/* Lens label */}
            <div ref={labelRef} className={`lens-label ${hovering ? "show" : ""}`}>
              <span>VIEW SOURCE</span>
              <span className="lens-pulse" />
            </div>
          </div>

          {/* Screen reflection */}
          <div className="laptop-reflect" />
        </div>

        {/* Laptop base */}
        <div className="laptop-base">
          <div className="laptop-hinge" />
          <div className="laptop-foot" />
        </div>
      </div>

      <style>{`
        .laptop-wrap {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          aspect-ratio: 16 / 11;
          perspective: 1800px;
          perspective-origin: 50% 50%;
        }
        .laptop-glow {
          position: absolute;
          inset: -10% -8% -20% -8%;
          background:
            radial-gradient(ellipse 50% 35% at 50% 55%, rgba(230, 51, 39, 0.32), transparent 70%),
            radial-gradient(ellipse 80% 50% at 50% 75%, rgba(230, 51, 39, 0.18), transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }
        .laptop {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .laptop-screen {
          position: absolute;
          left: 6%;
          right: 6%;
          top: 0;
          height: 86%;
          background: linear-gradient(165deg, #2a2a2c 0%, #1a1a1c 50%, #0e0e10 100%);
          border-radius: 16px 16px 4px 4px;
          padding: 2.2% 1.6% 1.4%;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.06),
            inset 0 1px 0 rgba(255,255,255,0.08),
            0 30px 60px -20px rgba(0,0,0,0.7),
            0 0 0 1px rgba(0,0,0,0.4);
        }
        .laptop-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 18%;
          height: 14px;
          background: #000;
          border-radius: 0 0 12px 12px;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .laptop-camera {
          width: 5px; height: 5px;
          background: #1c1c1f;
          border-radius: 50%;
          box-shadow: inset 0 0 2px rgba(255,255,255,0.2);
        }
        .laptop-inner {
          position: relative;
          width: 100%;
          height: 100%;
          background: #0A0A0B;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.6), inset 0 0 80px rgba(0,0,0,0.5);
        }
        .layer { position: absolute; inset: 0; }
        .site-layer {
          z-index: 2;
          clip-path: circle(0% at 50% 50%);
          transition: clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .site-layer.active {
          clip-path: circle(0px at var(--mx, 50%) var(--my, 50%));
          transition: clip-path 0.05s linear;
        }
        .site-layer:not(.active) {
          clip-path: circle(150% at 50% 50%);
        }
        .laptop-reflect {
          position: absolute;
          inset: 2.2% 1.6% 1.4%;
          background: linear-gradient(115deg, rgba(255,255,255,0.04) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.02) 100%);
          pointer-events: none;
          border-radius: 6px;
          z-index: 4;
        }
        .laptop-base {
          position: absolute;
          left: -1%; right: -1%;
          top: 86%;
          height: 14%;
          background:
            linear-gradient(180deg, #1c1c1e 0%, #0d0d0f 30%, #08080a 100%);
          border-radius: 4px 4px 14px 14px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.08),
            0 30px 50px -10px rgba(0,0,0,0.8);
        }
        .laptop-hinge {
          position: absolute;
          top: 0;
          left: 35%;
          right: 35%;
          height: 14%;
          background: linear-gradient(180deg, #000 0%, #1a1a1c 100%);
          border-radius: 0 0 6px 6px;
        }
        .laptop-foot {
          position: absolute;
          bottom: 18%;
          left: 50%;
          transform: translateX(-50%);
          width: 18%;
          height: 4px;
          background: #1a1a1c;
          border-radius: 2px;
          opacity: 0.8;
        }

        .lens-label {
          position: absolute;
          transform: translate(28px, 28px);
          padding: 6px 12px;
          background: var(--red);
          color: #fff;
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border-radius: 100px;
          pointer-events: none;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          box-shadow: 0 0 30px rgba(230, 51, 39, 0.6);
        }
        .lens-label.show { opacity: 1; }
        .lens-pulse {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #fff;
          animation: pulse 1.4s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.6); }
        }
      `}</style>
    </div>
  );
}

// ─── Mini website mockup that appears on the laptop screen ─────
function SiteMock() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0A0A0B", color: "var(--paper)", display: "flex", flexDirection: "column", fontFamily: "var(--sans)", overflow: "hidden" }}>
      {/* Mock nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--serif)", fontSize: 14, letterSpacing: "0.06em" }}>
          <LogoMark size={14} />SENES
        </div>
        <div style={{ display: "flex", gap: 14, fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--paper-2)" }}>
          <span>Index</span><span style={{ color: "var(--paper)" }}>Work</span><span>About</span><span>Services</span><span>Contact</span>
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 10px", background: "var(--paper)", color: "var(--ink)", borderRadius: 100 }}>Reserve →</div>
      </div>

      {/* Hero */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 0, position: "relative", overflow: "hidden" }}>
        <div style={{ padding: "32px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--paper-2)" }}>
            <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "var(--red)", marginRight: 6, verticalAlign: "middle" }}/>
            EST · SENES · MEDIA STUDIO
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 52, lineHeight: 0.92, letterSpacing: "-0.02em", fontWeight: 500 }}>
            Slow craft<br/>
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--red)" }}>for the</span><br/>
            modern web.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ padding: "8px 14px", background: "var(--red)", borderRadius: 100, fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase" }}>View Work →</div>
            <div style={{ padding: "8px 14px", borderRadius: 100, boxShadow: "inset 0 0 0 1px var(--line-2)", fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase" }}>Read Story</div>
          </div>
        </div>
        <div style={{ position: "relative", background: "linear-gradient(135deg, #1a1a1c, #0a0a0b)", borderLeft: "1px solid var(--line)" }}>
          <div style={{ position: "absolute", inset: 12, background: "repeating-linear-gradient(45deg, #1c1c1e, #1c1c1e 8px, #16161a 8px, #16161a 16px)", borderRadius: 2 }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 35% 40%, rgba(230, 51, 39, 0.4), transparent 60%)" }}/>
            <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "var(--mono)", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              FEATURED ⟶ AETHER · 2025
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar / ticker */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 24px", borderTop: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--paper-3)" }}>
        <span>10 YRS · 140 SHIPPED · 62 CLIENTS</span>
        <span style={{ color: "var(--paper-2)" }}>↓ SCROLL TO ENTER</span>
        <span>WORK · 01 / 10</span>
      </div>
    </div>
  );
}

// ─── Code view (the "x-ray" layer beneath the website) ─────
function CodeView() {
  const lines = [
    { l: 1, t: [ ["k","import"], ["t"," "], ["s","{ motion }"], ["t"," "], ["k","from"], ["t"," "], ["str","\"framer-motion\""] ] },
    { l: 2, t: [ ["k","import"], ["t"," LogoMark "], ["k","from"], ["t"," "], ["str","\"./components\""] ] },
    { l: 3, t: [] },
    { l: 4, t: [ ["k","export default function"], ["t"," "], ["fn","Hero"], ["t","() {"] ] },
    { l: 5, t: [ ["t","  "], ["k","return"], ["t"," ("] ] },
    { l: 6, t: [ ["t","    <"], ["tag","section"], ["t"," "], ["a","className"], ["t","="], ["str","\"hero\""], ["t",">"] ] },
    { l: 7, t: [ ["t","      <"], ["tag","Eyebrow"], ["t",">"], ["t","SENES Media Studio"], ["t","</"], ["tag","Eyebrow"], ["t",">"] ] },
    { l: 8, t: [ ["t","      <"], ["tag","h1"], ["t"," "], ["a","className"], ["t","="], ["str","\"display\""], ["t",">"] ] },
    { l: 9, t: [ ["t","        Slow craft"], ["t"," "], ["t","<"], ["tag","br"], ["t","/>"] ] },
    { l:10, t: [ ["t","        <"], ["tag","em"], ["t"," "], ["a","style"], ["t","={{ "], ["a","color"], ["t",": "], ["str","\"#ED3225\""], ["t"," }}>"] ] },
    { l:11, t: [ ["t","          for the"] ] },
    { l:12, t: [ ["t","        </"], ["tag","em"], ["t",">"], ["t"," "], ["t","<"], ["tag","br"], ["t","/>"] ] },
    { l:13, t: [ ["t","        modern web."] ] },
    { l:14, t: [ ["t","      </"], ["tag","h1"], ["t",">"] ] },
    { l:15, t: [ ["t","      <"], ["tag","p"], ["t",">{"] ] },
    { l:16, t: [ ["c","        // we believe creativity & code"] ] },
    { l:17, t: [ ["c","        // shape how brands communicate"] ] },
    { l:18, t: [ ["t","      }</"], ["tag","p"], ["t",">"] ] },
    { l:19, t: [ ["t","      <"], ["tag","Magnetic"], ["t","><"], ["tag","Button"], ["t"," "], ["a","intent"], ["t","="], ["str","\"primary\""], ["t",">"] ] },
    { l:20, t: [ ["t","        View Work →"] ] },
    { l:21, t: [ ["t","      </"], ["tag","Button"], ["t","></"], ["tag","Magnetic"], ["t",">"] ] },
    { l:22, t: [ ["t","    </"], ["tag","section"], ["t",">"] ] },
    { l:23, t: [ ["t","  );"] ] },
    { l:24, t: [ ["t","}"] ] },
    { l:25, t: [] },
    { l:26, t: [ ["c","// ──────────────────────────────────────"] ] },
    { l:27, t: [ ["c","// shipped 2026 · senes media · v3.2"] ] },
    { l:28, t: [ ["c","// stack: next 14 · gsap · tailwind"] ] },
  ];
  const color = {
    k: "#FF6B5E", t: "#C8C5BC", s: "#E6E1D6", str: "#88B889",
    tag: "#FF8A7D", a: "#D4B976", fn: "#7DA9D1", c: "#5C5851",
  };
  return (
    <div style={{
      width: "100%", height: "100%", background: "#0A0A0B",
      fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.7,
      padding: "16px 0", overflow: "hidden",
      position: "relative",
    }}>
      {/* Header bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 28, display: "flex", alignItems: "center", padding: "0 14px", background: "#0d0d0f", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 9, letterSpacing: "0.12em", color: "#6F6B65", textTransform: "uppercase", gap: 16 }}>
        <span style={{ display: "flex", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }}/>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E" }}/>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }}/>
        </span>
        <span>~/senes-media/src/Hero.jsx</span>
        <span style={{ marginLeft: "auto", color: "#5C5851" }}>UTF-8 · LF · JSX</span>
      </div>

      <div style={{ paddingTop: 36, display: "flex" }}>
        <div style={{ width: 36, flexShrink: 0, textAlign: "right", paddingRight: 12, color: "#3F3D38", borderRight: "1px solid rgba(255,255,255,0.04)" }}>
          {lines.map(({ l }) => <div key={l}>{l}</div>)}
        </div>
        <div style={{ paddingLeft: 14, flex: 1 }}>
          {lines.map(({ l, t }) => (
            <div key={l} style={{ whiteSpace: "pre", overflow: "hidden" }}>
              {t.length === 0 ? <span>&nbsp;</span> : t.map((seg, i) => (
                <span key={i} style={{ color: color[seg[0]] || color.t, fontStyle: seg[0] === "c" ? "italic" : "normal" }}>{seg[1]}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scanning line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, rgba(230, 51, 39, 0.7), transparent)",
        animation: "scan 3.5s linear infinite",
      }}/>
      <style>{`
        @keyframes scan { from { top: 32px; } to { top: 100%; } }
      `}</style>
    </div>
  );
}

Object.assign(window, { LaptopXray });
