// ─── SENES MEDIA · About page (Designova layout) ─────────────────

function AboutPage({ navigate }) {
  const d = window.SENES_DATA;
  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="assets/portfolio/uzuri/06-family.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div className="page-hero-content container" style={{ padding: 0 }}>
          <div className="page-hero-left">
            <div className="page-hero-pill">
              <span className="dot" />
              <span>About SENES Media</span>
            </div>
            <h1 className="page-hero-title">
              Creativity <span className="it">meets</span><br/>
              technology.
            </h1>
            <p className="page-hero-blurb">
              SENES is a multidisciplinary media company built on the belief that creativity and technology together shape the future of communication.
            </p>
            <div className="page-hero-actions">
              <button className="btn primary" data-cursor="hover" onClick={() => navigate("contact")}>Work with us <Arrow /></button>
              <button className="btn dark" data-cursor="hover" onClick={() => navigate("work")}>See the work ↗</button>
            </div>
          </div>
        </div>
      </section>

      <div className="info-bar">
        <div className="info-cell">
          <div className="corner" />
          <h4>Multidisciplinary</h4>
          <p>Digital development, visual design, communications, and media production — under one team.</p>
        </div>
        <div className="info-cell">
          <div className="corner" />
          <h4>Collaborative</h4>
          <p>Every project reflects the unique goals and identity of our clients while holding professional standards.</p>
        </div>
        <div className="info-cell">
          <div className="corner" />
          <h4>Quality-first</h4>
          <p>Not just beautiful designs or functional websites — experiences that inspire and strengthen brand voices.</p>
        </div>
      </div>

      {/* Story + Vision & Mission */}
      <section className="section story-section">
        <div className="story-bg" aria-hidden>
          <div className="story-bg-scrim" />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
            <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}>02 · WHO WE ARE</div>
            <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 88px)", marginBottom: 40 }}>
              Our <span className="it" style={{ color: "var(--red)" }}>Story.</span>
            </h2>
            <p style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1.35, letterSpacing: "-0.01em", marginBottom: 28, color: "var(--paper)" }} data-cursor="text">
              In today's digital world, brands must communicate more effectively than ever before. At SENES, we help organizations translate ideas into powerful visual identities, engaging digital platforms, and compelling media content.
            </p>
            <p style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.45, color: "var(--paper-2)" }} data-cursor="text">
              We approach every project with a focus on <span style={{ color: "var(--red)" }}>quality</span>, <span style={{ color: "var(--red)" }}>creativity</span>, and <span style={{ color: "var(--red)" }}>strategy</span>. Our work is not just about producing beautiful designs or functional websites — it is about creating experiences that inspire audiences and strengthen the voice of the brands we work with.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="vm-grid" style={{ marginTop: 64 }}>
            <div className="vm-card vm-mission">
              <div className="vm-glow" />
              <div className="vm-eyebrow">Our Mission</div>
              <h3 className="vm-title">Bringing art to the <span className="vm-em">new world.</span></h3>
            </div>
            <div className="vm-card vm-vision">
              <img className="vm-video bg-zoom" src="assets/bg-desk.jpg" alt="" />
              <div className="vm-glow" />
              <div className="vm-eyebrow">Our Vision</div>
              <h3 className="vm-title">To become a leading creative and digital media company that shapes <span className="vm-em">modern storytelling, communication,</span> and <span className="vm-em">digital innovation</span> across industries.</h3>
            </div>
          </div>
        </div>

        <style>{`
          .story-section {
            position: relative;
            overflow: hidden;
            isolation: isolate;
          }
          .story-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
          }
          .story-bg img, .story-bg video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 40%;
            opacity: 0.4;
          }
          .story-bg-scrim {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(180deg, var(--ink) 0%, rgba(10,10,11,0.6) 22%, rgba(10,10,11,0.68) 78%, var(--ink) 100%),
              radial-gradient(ellipse 60% 70% at 30% 45%, rgba(10,10,11,0.4), transparent 75%);
          }
          .vm-grid {
            display: grid;
            grid-template-columns: 1fr 1.4fr;
            gap: 28px;
          }
          @media (max-width: 880px) { .vm-grid { grid-template-columns: 1fr; } }
          .vm-card {
            position: relative;
            overflow: hidden;
            border-radius: 22px;
            padding: 48px;
            min-height: 320px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            isolation: isolate;
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(18px) saturate(150%);
            -webkit-backdrop-filter: blur(18px) saturate(150%);
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 24px 60px -28px rgba(0,0,0,0.6);
          }
          .vm-mission { background: linear-gradient(150deg, rgba(230,51,39,0.12) 0%, rgba(255,255,255,0.03) 60%); }
          .vm-vision  { background: linear-gradient(150deg, rgba(20,33,61,0.28) 0%, rgba(255,255,255,0.03) 60%); }
          .vm-video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -2;
            opacity: 0.4;
          }
          .vm-vision::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            background: linear-gradient(180deg, rgba(10,10,11,0.35) 0%, rgba(10,10,11,0.2) 45%, rgba(10,10,11,0.72) 100%);
            pointer-events: none;
          }
          .vm-glow {
            position: absolute;
            inset: 0;
            z-index: -1;
            pointer-events: none;
          }
          .vm-mission .vm-glow {
            background: radial-gradient(ellipse 55% 45% at 20% 25%, var(--red), transparent 70%);
            filter: blur(48px);
            opacity: 0.32;
            animation: vm-pulse-a 6s ease-in-out infinite;
          }
          .vm-vision .vm-glow {
            background: radial-gradient(ellipse 55% 45% at 80% 25%, var(--red), transparent 70%),
                        radial-gradient(ellipse 40% 40% at 30% 80%, var(--navy), transparent 70%);
            filter: blur(52px);
            opacity: 0.36;
            animation: vm-pulse-b 7s ease-in-out infinite;
          }
          @keyframes vm-pulse-a {
            0%, 100% { transform: translate(0,0) scale(1); opacity: 0.28; }
            50% { transform: translate(8%, 6%) scale(1.18); opacity: 0.45; }
          }
          @keyframes vm-pulse-b {
            0%, 100% { transform: translate(0,0) scale(1.05); opacity: 0.3; }
            50% { transform: translate(-8%, 5%) scale(1.2); opacity: 0.48; }
          }
          .vm-eyebrow {
            font-family: var(--mono);
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--paper-2);
            margin-bottom: 20px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          .vm-eyebrow::before {
            content: "";
            width: 7px; height: 7px;
            border-radius: 50%;
            background: currentColor;
            box-shadow: 0 0 14px 2px currentColor;
            animation: vm-dot 2s ease-in-out infinite;
          }
          .vm-mission .vm-eyebrow { color: var(--red-soft); }
          .vm-vision .vm-eyebrow { color: var(--red-soft); }
          @keyframes vm-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
          .vm-title {
            font-family: var(--serif);
            font-size: clamp(30px, 3.6vw, 52px);
            line-height: 1.1;
            letter-spacing: -0.02em;
            font-weight: 500;
            color: var(--paper);
            text-wrap: balance;
          }
          .vm-em { font-style: italic; }
          .vm-mission .vm-em { color: var(--red); text-shadow: 0 0 24px rgba(230,51,39,0.5); }
          .vm-vision .vm-em { color: var(--red); text-shadow: 0 0 24px rgba(230,51,39,0.5); }
        `}</style>
      </section>

      {/* Philosophy / Our Approach */}
      <section className="section approach-section">
        <div className="approach-bg" aria-hidden>
          <img className="bg-zoom" src="assets/bg-bulb.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="approach-bg-scrim" />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>OUR APPROACH · 04</div>
              <h2 className="display title">Four <span className="it">principles.</span></h2>
            </div>
            <div className="meta">How every project<br/>moves through the studio</div>
          </div>
          <div className="philosophy-grid">
            {[
              { t: "Creative Thinking", b: "Creativity is the foundation of great communication. Every project begins with understanding your vision and transforming it into a meaningful concept." },
              { t: "Strategic Development", b: "We combine creative thinking with digital expertise to build solutions that are not only visually impressive but also effective and practical." },
              { t: "Innovation", b: "We continuously explore new technologies and creative techniques to ensure our clients stay ahead in a rapidly evolving digital environment." },
              { t: "Quality & Excellence", b: "Every project is executed with precision, attention to detail, and a commitment to delivering results that exceed expectations." },
            ].map((p) => (
              <div key={p.t} className="philosophy-card">
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 32, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 20, color: "var(--red)" }}>{p.t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--paper)" }}>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All reviews */}
      <section className="section" style={{ background: "var(--ink-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>WORDS · 05</div>
              <h2 className="display title">From those <span className="it">who hired us.</span></h2>
            </div>
            <div className="meta">8 unedited reviews<br/>collected on completion</div>
          </div>
          <div className="review-grid">
            {d.reviews.map((r) => (
              <div key={r.author} className="review-card">
                <div className="eyebrow no-dot" style={{ marginBottom: 20, color: "var(--red)" }}>★ ★ ★ ★ ★</div>
                <p className="review-quote" style={{ minHeight: 130 }} data-cursor="text">"{r.quote}"</p>
                <div className="review-meta">
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{r.author}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--paper-3)", marginTop: 4 }}>{r.role}</div>
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--paper-3)" }}>{r.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews → CTA */}

      <style>{`
        .timeline { border-top: 1px solid var(--line); }
        .timeline-row {
          display: grid;
          grid-template-columns: 100px 280px 1fr;
          gap: 32px;
          align-items: start;
          padding: 28px 0;
          border-bottom: 1px solid var(--line);
        }
        .timeline-year { font-family: var(--mono); font-size: 13px; letter-spacing: 0.14em; color: var(--red); }
        .timeline-name { font-family: var(--serif); font-size: 28px; line-height: 1.1; letter-spacing: -0.01em; }
        .timeline-blurb { font-size: 15px; line-height: 1.6; color: var(--paper-2); max-width: 560px; }
        @media (max-width: 880px) {
          .timeline-row { grid-template-columns: 80px 1fr; }
          .timeline-blurb { grid-column: 2; }
        }
        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
          border: 1px solid var(--line);
          border-right: 0; border-bottom: 0;
          border-radius: 18px;
          overflow: hidden;
        }
        @media (max-width: 880px) { .philosophy-grid { grid-template-columns: 1fr; } }
        .philosophy-card { padding: 40px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }

        /* Approach section — looping video bg + glass cards */
        .approach-section { position: relative; overflow: hidden; }
        .approach-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .approach-bg video { width: 100%; height: 100%; object-fit: cover; }
        .approach-bg-scrim {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, var(--ink) 0%, rgba(10,10,11,0.55) 22%, rgba(10,10,11,0.55) 78%, var(--ink) 100%),
            radial-gradient(ellipse 80% 70% at 50% 50%, rgba(10,10,11,0.25), rgba(10,10,11,0.6) 95%);
        }
        .approach-section .philosophy-grid {
          border: none;
          gap: 20px;
          background: transparent;
          border-radius: 0;
          overflow: visible;
        }
        .approach-section .philosophy-card {
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 20px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 60px -30px rgba(0,0,0,0.6);
          transition: transform 0.4s var(--easing-out), background 0.3s, border-color 0.3s;
        }
        .approach-section .philosophy-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.22);
        }
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid var(--line);
          border-right: 0; border-bottom: 0;
          border-radius: 18px;
          overflow: hidden;
        }
        @media (max-width: 880px) { .tools-grid { grid-template-columns: repeat(2, 1fr); } }
        .tools-card { padding: 28px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
      `}</style>
    </div>
  );
}

Object.assign(window, { AboutPage });
