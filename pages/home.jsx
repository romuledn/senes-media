// ─── SENES MEDIA · Home — Task/Build Stunning layout ──────────────

function HomePage({ navigate, layout, openProject }) {
  const d = window.SENES_DATA;
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="page home-page">
      {/* ─── HERO: full-bleed atmospheric ──────────────────── */}
      <section className="home-hero">
        <HeroAtmosphere />

        <div className="home-hero-overlay">
          <div className="hero-pill-tag">
            <span className="hero-pill-badge">SENES</span>
            <span>We Design · We Code · We Communicate · <span style={{ color: "var(--red-soft)", fontWeight: 600 }}>We Influence</span></span>
          </div>

          <h1 className="home-hero-headline display">
            Powerful <span className="it">craft</span> for a<br/>
            new <span className="it">digital world.</span>
          </h1>

          <p className="home-hero-sub">
            A multidisciplinary studio crafting websites, brands, and media for clients who prefer lasting over loud.
          </p>

          <ServiceRotator />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
            <Magnetic strength={0.25}>
              <button className="btn primary" data-cursor="hover" data-cursor-label="See work" onClick={() => navigate("work")} style={{ padding: "18px 30px" }}>
                View Selected Work <Arrow />
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button className="btn ghost" data-cursor="hover" onClick={() => navigate("about")} style={{ padding: "18px 30px" }}>
                Read the Story
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-hint">
          <span className="hero-scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ─── MANIFESTO ─────────────────────────────────── */}
      <section className="manifesto">
        <div className="container">
          <Reveal>
            <p className="manifesto-text">
              SENES is a multidisciplinary media company built on the belief that <span style={{ color: "var(--red)" }}>creativity</span> and <span style={{ color: "var(--red)" }}>technology</span> together shape the future of <span style={{ color: "var(--red)" }}>communication.</span>
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ marginTop: 48, textAlign: "center" }}>
              <Magnetic strength={0.25}>
                <button className="btn ghost" data-cursor="hover" onClick={() => navigate("about")}>
                  About Us <Arrow />
                </button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SELECTED WORK ──────────────────────────────── */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 88px)", marginBottom: 16 }}>
                Selected <span className="it">Work</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--paper-3)", maxWidth: 480, marginInline: "auto" }}>
                A curated collection of recent projects where editorial design meets engineered systems.
              </p>
            </div>
          </Reveal>

          <div className={`work-grid layout-${layout || "default"}`}>
            {d.projects.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <a href={`#project-${p.slug}`}
                  onClick={(e) => { e.preventDefault(); openProject?.(p); }}
                  className="work-card" data-cursor="drag" data-cursor-label="View project">
                  <div className="work-thumb">
                    <div className="work-cover" style={{ aspectRatio: "4/3" }}>
                      <img src={p.cover} alt={p.name} loading="lazy" />
                    </div>
                    <div className="work-overlay">
                      <div>— {p.id}</div>
                      <div className="work-arrow"><Arrow size={16} /></div>
                    </div>
                  </div>
                  <div className="work-meta">
                    <div>
                      <div className="work-name">{p.name}</div>
                      <div className="work-cat">{p.category}</div>
                    </div>
                    <div className="work-year">{p.year}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div style={{ marginTop: 56, textAlign: "center" }}>
              <button className="btn ghost" data-cursor="hover" onClick={() => navigate("work")}>
                See full archive <Arrow />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── REVIEWS preview ──────────────────────────── */}
      <section className="section" style={{ background: "var(--ink-2)", borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 16 }}>WORDS · FROM THOSE WHO HIRED US</div>
              <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>
                Receipts, <span className="it" style={{ color: "var(--red)" }}>not promises.</span>
              </h2>
            </div>
          </Reveal>
          <div className="review-grid">
            {d.reviews.slice(0, 4).map((r, i) => (
              <Reveal key={r.author} delay={i * 100}>
                <div className="review-card">
                  <div className="eyebrow no-dot" style={{ marginBottom: 20, color: "var(--red)" }}>★ ★ ★ ★ ★</div>
                  <p className="review-quote">"{r.quote}"</p>
                  <div className="review-meta">
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{r.author}</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--paper-3)", marginTop: 4 }}>{r.role}</div>
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--paper-3)" }}>{r.year}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <div style={{ marginTop: 48, textAlign: "center" }}>
              <button className="btn ghost" data-cursor="hover" onClick={() => navigate("about")}>
                Read all 8 reviews <Arrow />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA closer ─────────────────────────────── */}
      {/* CTA closer is now global — rendered in App before Footer */}

      <style>{`
        .home-hero {
          position: relative;
          min-height: clamp(720px, 95vh, 1000px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 140px 32px 80px;
          overflow: hidden;
        }
        .home-hero-overlay {
          position: relative;
          z-index: 5;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 980px;
        }
        .hero-pill-tag {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 8px 8px 8px 14px;
          background: rgba(20, 20, 22, 0.6);
          backdrop-filter: blur(16px);
          border-radius: 100px;
          font-family: var(--sans);
          font-size: 13px;
          color: var(--paper-2);
          box-shadow: inset 0 0 0 1px var(--line-2);
          margin-bottom: 48px;
        }
        .hero-pill-badge {
          padding: 4px 10px;
          background: var(--red);
          color: #fff;
          border-radius: 100px;
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.16em;
          font-weight: 500;
        }
        .home-hero-headline {
          font-size: clamp(56px, 9vw, 144px);
          line-height: 0.96;
          margin-bottom: 32px;
          font-weight: 500;
          text-wrap: balance;
          text-shadow: 0 2px 30px rgba(0,0,0,0.5);
        }
        .home-hero-headline .it {
          color: var(--red);
          font-style: italic;
          font-weight: 400;
          text-shadow: 0 0 32px rgba(230, 51, 39, 0.45);
        }
        .home-hero-sub {
          font-size: clamp(15px, 1.4vw, 18px);
          color: var(--paper-2);
          margin-bottom: 40px;
          max-width: 580px;
          line-height: 1.5;
        }
        .email-pill {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          padding: 6px 6px 6px 20px;
          gap: 14px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.5);
        }
        .email-pill-icon { color: var(--paper-3); }
        .email-pill input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font: inherit;
          font-size: 15px;
          color: var(--paper);
          padding: 12px 0;
        }
        .email-pill input::placeholder { color: var(--paper-3); }
        .email-pill-cta {
          padding: 12px 24px;
          background: var(--red);
          color: #fff;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          transition: background 0.2s;
          box-shadow: 0 8px 20px -8px rgba(230, 51, 39, 0.5);
        }
        .email-pill-cta:hover { background: var(--red-bright); }

        .hero-scroll-hint {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 12px;
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.24em;
          color: var(--paper-3);
          z-index: 5;
        }
        .hero-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(180deg, transparent, var(--paper-3));
          animation: scroll-pulse 2s ease-in-out infinite;
        }
        @keyframes scroll-pulse {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(1.2); opacity: 1; }
        }

        /* manifesto */
        .manifesto {
          padding: 100px 0 80px;
          text-align: center;
        }
        .manifesto-text {
          font-family: var(--serif);
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.25;
          letter-spacing: -0.01em;
          max-width: 920px;
          margin: 0 auto;
          color: var(--paper-2);
          text-wrap: balance;
        }

        /* stats */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        @media (max-width: 880px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }
        .stat { padding: 0 32px; }
        .stat-value {
          font-family: var(--serif);
          font-size: clamp(72px, 9vw, 140px);
          line-height: 0.92;
          letter-spacing: -0.04em;
          font-weight: 500;
        }

        /* reviews */
        .review-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
          border: 1px solid var(--line);
          border-right: 0; border-bottom: 0;
          border-radius: 18px;
          overflow: hidden;
        }
        @media (max-width: 880px) { .review-grid { grid-template-columns: 1fr; } }
        .review-card {
          padding: 36px;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .review-quote {
          font-family: var(--serif);
          font-size: 22px;
          line-height: 1.35;
          letter-spacing: -0.005em;
          margin-bottom: 32px;
        }
        .review-meta {
          padding-top: 20px;
          border-top: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: end;
        }

        /* Look inside head — responsive */
        .look-inside-head {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 880px) {
          .look-inside-head { grid-template-columns: 1fr; gap: 24px; }
        }

        /* CTA closer styles now live in chrome.jsx (CTACloser) */
      `}</style>
    </div>
  );
}

// ─── Animated cinematic hero atmosphere ────────────────────────────
function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere">
      <img className="hero-video bg-zoom" src="assets/hero-laptop.jpg" alt="" fetchpriority="high" />
      <div className="atm-darken" />

      <style>{`
        .hero-atmosphere {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #0a0a0b;
        }
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          filter: saturate(0.9) contrast(1.05) brightness(0.85);
        }
        .atm-darken {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(180deg,
            rgba(10,10,11,0.5) 0%,
            rgba(10,10,11,0.4) 30%,
            rgba(10,10,11,0.65) 60%,
            rgba(10,10,11,0.9) 100%);
          pointer-events: none;
        }
        @media (max-width: 880px) {
          .atm-darken { background: rgba(10, 10, 11, 0.7); }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { HomePage });

// ─── Service text rotator — 3-slide cycle below the hero ────
function ServiceRotator() {
  const slides = [
    { tag: "We do", name: "Graphic Design",  blurb: "Brand identities that visually communicate." },
    { tag: "We do", name: "Web Development", blurb: "Modern websites that perform and endure." },
    { tag: "We do", name: "Video & Media",   blurb: "Stories that strengthen brand presence." },
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="svc-rotator" aria-live="polite">
      <div className="svc-rotator-line">
        <span className="svc-tag">{slides[i].tag}</span>
        <span className="svc-name-wrap" key={`n-${i}`}>
          <span className="svc-name">{slides[i].name}</span>
        </span>
      </div>
      <div className="svc-blurb-wrap" key={`b-${i}`}>
        <span className="svc-blurb">{slides[i].blurb}</span>
      </div>
      <div className="svc-dots">
        {slides.map((_, k) => (
          <button key={k} className={`svc-dot ${k === i ? "active" : ""}`}
            onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} />
        ))}
      </div>

      <style>{`
        .svc-rotator {
          margin: 0 auto 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px 28px 18px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border-radius: 22px;
          box-shadow: inset 0 0 0 1px var(--line-2);
          max-width: 560px;
        }
        .svc-rotator-line {
          display: inline-flex;
          align-items: baseline;
          gap: 12px;
          font-family: var(--serif);
          font-size: clamp(22px, 2.6vw, 32px);
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .svc-tag {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--paper-3);
          padding-right: 6px;
          border-right: 1px solid var(--line-2);
        }
        .svc-name-wrap {
          display: inline-block;
          overflow: hidden;
        }
        .svc-name {
          display: inline-block;
          color: var(--red);
          font-style: italic;
          animation: svc-in 0.55s var(--easing-out);
        }
        .svc-blurb-wrap {
          font-family: var(--sans);
          font-size: 13px;
          color: var(--paper-2);
          animation: svc-fade 0.6s var(--easing-out);
        }
        @keyframes svc-in {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes svc-fade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .svc-dots {
          display: flex;
          gap: 6px;
          margin-top: 4px;
        }
        .svc-dot {
          width: 18px;
          height: 3px;
          border-radius: 2px;
          background: var(--paper-4);
          padding: 0;
          transition: background 0.3s, width 0.3s var(--easing-out);
          cursor: none;
        }
        .svc-dot.active { background: var(--red); width: 28px; }
      `}</style>
    </div>
  );
}

Object.assign(window, { ServiceRotator });

// ─── Light intro section — Portox/Andro layout, light variant ────
function LightIntro({ navigate }) {
  const tools = [
    { name: "Figma",  letter: "F",  bg: "#fff" },
    { name: "Framer", letter: "Fr", active: true },
    { name: "Sketch", letter: "◆",  bg: "#fff" },
    { name: "After Effects", letter: "Ae", bg: "#fff" },
    { name: "Webflow", letter: "W", bg: "#fff" },
    { name: "Next.js", letter: "N",  bg: "#fff" },
  ];
  const stats = [
    { value: "10+",  label: "Years of experience" },
    { value: "62",   label: "Happy clients" },
    { value: "140+", label: "Projects shipped" },
    { value: "04",   label: "Industry awards" },
  ];

  return (
    <section className="light-intro">
      {/* Background — the laptop image */}
      <div className="li-bg" aria-hidden>
        <img src="assets/laptop-glow.jpg" alt="" />
        <div className="li-bg-fade" />
      </div>

      {/* Floating tools card top-right */}
      <div className="li-tools" data-cursor="hover">
        <div className="li-tools-label">EXP in:</div>
        <div className="li-tools-grid">
          {tools.map((t) => (
            <div key={t.name} className={`li-tool ${t.active ? "active" : ""}`} title={t.name}>
              <span>{t.letter}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Left content */}
      <div className="li-content">
        <h2 className="li-headline">
          Slow craft <span className="li-amp">for the</span><br/>
          modern <span className="li-amp">web.</span>
        </h2>
        <Magnetic strength={0.25}>
          <button className="li-cta" data-cursor="hover" onClick={() => navigate("contact")}>
            Hire Us
            <span className="li-cta-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M6 3h7v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </span>
          </button>
        </Magnetic>
      </div>

      {/* Bottom row: bio + stats */}
      <div className="li-footer">
        <div className="li-bio">
          In today's digital world, brands must communicate more effectively than ever before. At SENES, we help organizations translate ideas into powerful visual identities, engaging digital platforms, and compelling media content.
        </div>
        <div className="li-stats">
          {stats.map((s, i) => (
            <div key={s.label} className="li-stat">
              <div className="li-stat-value">{s.value}</div>
              <div className="li-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .light-intro {
          position: relative;
          background: var(--ink);
          color: var(--paper);
          padding: 64px 56px 40px;
          min-height: clamp(720px, 92vh, 960px);
          display: grid;
          grid-template-rows: 1fr auto;
          overflow: hidden;
          isolation: isolate;
          border-top: 1px solid var(--line);
        }
        @media (max-width: 880px) { .light-intro { padding: 48px 24px 32px; min-height: auto; } }

        /* Background image bleeds from right; ink gradient on left for legibility */
        .li-bg {
          position: absolute; inset: 0; z-index: 0;
          pointer-events: none;
        }
        .li-bg img {
          position: absolute;
          right: 0;
          top: 0;
          width: 75%;
          height: 100%;
          object-fit: cover;
          object-position: 55% 60%;
        }
        @media (max-width: 880px) { .li-bg img { width: 100%; opacity: 0.5; } }
        .li-bg-fade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, var(--ink) 0%, var(--ink) 38%, rgba(10, 10, 11, 0.7) 52%, rgba(10, 10, 11, 0) 75%, rgba(10, 10, 11, 0) 100%),
            linear-gradient(180deg, rgba(10, 10, 11, 0.2) 0%, transparent 30%, transparent 70%, rgba(10, 10, 11, 0.65) 100%);
        }

        /* Floating tools card top-right */
        .li-tools {
          position: absolute;
          top: 32px;
          right: 56px;
          z-index: 3;
          padding: 18px 20px;
          background: rgba(20, 20, 22, 0.78);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          color: #fff;
          box-shadow: 0 20px 50px -20px rgba(0,0,0,0.6);
        }
        @media (max-width: 880px) { .li-tools { right: 24px; transform: scale(0.85); transform-origin: top right; } }
        .li-tools-label {
          font-family: var(--sans);
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 12px;
          text-align: right;
          padding-right: 6px;
        }
        .li-tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 36px);
          gap: 8px;
        }
        .li-tool {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--sans);
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          transition: transform 0.25s var(--easing-out), background 0.25s;
        }
        .li-tool:hover { transform: translateY(-2px); background: rgba(255,255,255,0.12); }
        .li-tool.active {
          background: var(--red);
          color: #fff;
          border-color: var(--red);
          box-shadow: 0 6px 16px -6px rgba(230, 51, 39, 0.5);
        }

        /* Left content */
        .li-content {
          position: relative;
          z-index: 2;
          max-width: 720px;
          align-self: center;
          padding-top: 60px;
        }
        @media (max-width: 880px) { .li-content { padding-top: 100px; } }

        .li-headline {
          font-family: var(--serif);
          font-size: clamp(60px, 9vw, 144px);
          line-height: 0.94;
          letter-spacing: -0.02em;
          font-weight: 500;
          color: var(--paper);
          margin-bottom: 44px;
          text-wrap: balance;
        }
        .li-amp {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          color: var(--red);
        }

        /* CTA pill */
        .li-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 14px 14px 14px 32px;
          border-radius: 100px;
          background: var(--red);
          color: #fff;
          font-family: var(--sans);
          font-size: 15px;
          font-weight: 500;
          box-shadow: 0 16px 40px -16px rgba(230, 51, 39, 0.55);
          transition: background 0.25s, transform 0.25s var(--easing-out);
        }
        .li-cta:hover { background: var(--red-bright); }
        .li-cta-arrow {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s var(--easing-out);
        }
        .li-cta:hover .li-cta-arrow { transform: rotate(-45deg); }

        /* Footer row: bio + stats */
        .li-footer {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.2fr 2.5fr;
          gap: 48px;
          align-items: end;
          padding-top: 56px;
        }
        @media (max-width: 880px) { .li-footer { grid-template-columns: 1fr; gap: 32px; } }

        .li-bio {
          font-family: var(--sans);
          font-size: clamp(13px, 1vw, 14px);
          line-height: 1.6;
          color: var(--paper-2);
          max-width: 420px;
        }

        .li-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        @media (max-width: 880px) { .li-stats { grid-template-columns: repeat(2, 1fr); gap: 24px; } }
        .li-stat {
          padding: 16px 0;
          border-top: 1px solid var(--line-2);
          padding-right: 24px;
        }
        .li-stat-value {
          font-family: var(--serif);
          font-size: clamp(44px, 5vw, 68px);
          line-height: 1;
          letter-spacing: -0.03em;
          font-weight: 500;
          color: var(--paper);
          margin-bottom: 18px;
        }
        .li-stat-label {
          font-family: var(--sans);
          font-size: 12px;
          color: var(--paper-3);
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { LightIntro });