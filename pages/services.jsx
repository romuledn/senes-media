// ─── SENES MEDIA · Services page (Designova layout) ───────────────

function ServicesPage({ navigate }) {
  const d = window.SENES_DATA;
  return (
    <div className="page">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img className="bg-zoom" src="assets/bg-services.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="page-hero-content container" style={{ padding: 0 }}>
          <div className="page-hero-left">
            <div className="page-hero-pill">
              <span className="dot" />
              <span>We Design · We Code · We Communicate · <span style={{ color: "var(--red-soft)", fontWeight: 600 }}>We Influence</span></span>
            </div>
            <h1 className="page-hero-title">
              What we<br/>
              <span className="it">do.</span>
            </h1>
            <p className="page-hero-blurb">
              From identity systems to web applications to media production — five disciplines, run by one team, scoped to outcomes.
            </p>
            <div className="page-hero-actions">
              <button className="btn primary" data-cursor="hover" onClick={() => navigate("contact")}>Get a quote <Arrow /></button>
              <button className="btn dark" data-cursor="hover" onClick={() => document.getElementById("services-list")?.scrollIntoView({ behavior: "smooth" })}>Browse services ↓</button>
            </div>
          </div>
        </div>
      </section>

      <div className="info-bar">
        <div className="info-cell">
          <div className="corner" />
          <h4>Graphic Design</h4>
          <p>Logos, identities, corporate profiles, social media, print collateral.</p>
        </div>
        <div className="info-cell">
          <div className="corner" />
          <h4>Web & Apps</h4>
          <p>Modern marketing sites, e-commerce, custom systems, dashboards.</p>
        </div>
        <div className="info-cell">
          <div className="corner" />
          <h4>Media Production</h4>
          <p>Promo, documentary, social campaigns, brand storytelling on video.</p>
        </div>
      </div>

      {/* Services list */}
      <section style={{ padding: "60px 0 0" }} id="services-list">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>OFFERING · 02</div>
              <h2 className="display title">Five <span className="it">lines.</span></h2>
            </div>
            <div className="meta">Hover a row<br/>to inspect</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {d.services.map((s) => (
            <div key={s.num} className="service-row" data-cursor="hover">
              <div className="service-num">{s.num} / 05</div>
              <div className="service-name">{s.name}</div>
              <div className="service-blurb">{s.blurb}</div>
              <div className="service-deliv">
                {s.deliverables.map((d) => <div key={d}>— {d}</div>)}
              </div>
              <div className="service-arrow"><Arrow size={18} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: "var(--ink-2)", borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>METHOD · 03</div>
              <h2 className="display title">How a project <span className="it">runs.</span></h2>
            </div>
            <div className="meta">5 phases</div>
          </div>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {d.process.map((p) => (
              <div key={p.num} className="process-row">
                <div className="process-num">{p.num}</div>
                <div className="process-name">{p.name}</div>
                <div className="process-blurb">{p.blurb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing models */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>SHAPES · 04</div>
              <h2 className="display title">Three ways <span className="it">to work.</span></h2>
            </div>
            <div className="meta">Pick the one that fits</div>
          </div>
          <div className="pricing-grid">
            {[
              { num: "01", title: "Project", price: "1 Week", subtitle: "Defined scope, focused delivery", points: ["Single focused deliverable", "One structured revision round", "Frozen master file at hand-off", "Post-launch support"] },
              { num: "02", title: "Retainer", price: "2 Weeks", subtitle: "Ongoing partnership", points: ["Two-week working cycles", "Design crit + execution", "Async + weekly sync", "Priority turnaround"], featured: true },
              { num: "03", title: "Sprint", price: "3 Weeks", subtitle: "Deep, intensive build", points: ["Audit + recommendations", "Concept + 3 directions", "Strategy doc", "Hand-off to your team"] },
            ].map((p) => (
              <div key={p.num} className={`pricing-card ${p.featured ? "featured" : ""}`}>
                <div className="eyebrow" style={{ marginBottom: 28, color: p.featured ? "var(--red)" : undefined }}>— {p.num}</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 48, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: p.featured ? "var(--red)" : "var(--paper-3)", marginBottom: 28 }}>{p.price}</div>
                <div style={{ fontSize: 15, color: "var(--paper-2)", marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>{p.subtitle}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {p.points.map((pt) => <li key={pt} style={{ fontSize: 14, color: "var(--paper-2)", display: "flex", gap: 12 }}><span style={{ color: p.featured ? "var(--red)" : "var(--paper-3)" }}>→</span>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .service-row {
          display: grid;
          grid-template-columns: 100px 1.2fr 1.4fr 1.2fr 60px;
          gap: 32px;
          padding: 36px 56px;
          align-items: start;
          border-bottom: 1px solid var(--line);
          transition: background 0.4s var(--easing-out), padding-left 0.4s var(--easing-out);
        }
        .service-row:hover { background: rgba(230, 51, 39, 0.05); padding-left: 72px; }
        .service-row:hover .service-name { color: var(--red); font-style: italic; }
        .service-row:hover .service-arrow { transform: rotate(-45deg); color: var(--red); }
        .service-num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; color: var(--paper-3); padding-top: 14px; }
        .service-name {
          font-family: var(--serif);
          font-size: clamp(32px, 4vw, 56px);
          line-height: 1;
          letter-spacing: -0.02em;
          transition: color 0.3s, font-style 0.3s;
        }
        .service-blurb { font-size: 15px; line-height: 1.6; color: var(--paper-2); padding-top: 14px; }
        .service-deliv { font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; color: var(--paper-3); padding-top: 14px; display: flex; flex-direction: column; gap: 8px; }
        .service-arrow { padding-top: 14px; color: var(--paper-3); transition: transform 0.3s var(--easing-out), color 0.3s; }
        @media (max-width: 1100px) {
          .service-row { grid-template-columns: 60px 1fr; padding: 28px 24px; gap: 16px; }
          .service-blurb, .service-deliv, .service-arrow { grid-column: 2; }
        }

        .process-row {
          display: grid;
          grid-template-columns: 100px 240px 1fr 100px;
          gap: 32px;
          align-items: center;
          padding: 28px 0;
          border-bottom: 1px solid var(--line);
          transition: padding-left 0.4s var(--easing-out);
        }
        .process-row:hover { padding-left: 16px; background: rgba(230, 51, 39, 0.03); }
        .process-num { font-family: var(--mono); font-size: 12px; letter-spacing: 0.16em; color: var(--red); }
        .process-name { font-family: var(--serif); font-size: 32px; letter-spacing: -0.01em; line-height: 1; }
        .process-blurb { font-size: 15px; color: var(--paper-2); line-height: 1.5; max-width: 560px; }
        .process-weeks { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--paper-3); text-align: right; }
        @media (max-width: 880px) {
          .process-row { grid-template-columns: 60px 1fr; gap: 16px; }
          .process-blurb, .process-weeks { grid-column: 2; }
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid var(--line);
          border-right: 0; border-bottom: 0;
          border-radius: 18px;
          overflow: hidden;
        }
        @media (max-width: 880px) { .pricing-grid { grid-template-columns: 1fr; } }
        .pricing-card {
          padding: 40px;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .pricing-card.featured { background: rgba(230, 51, 39, 0.04); }
      `}</style>
    </div>
  );
}

// ─── FAQ accordion ───────────────────────────────────────────
function FAQ({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ borderTop: "1px solid var(--line)" }}>
      {items.map((it, i) => (
        <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} data-cursor="hover"
            style={{ width: "100%", textAlign: "left", padding: "28px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.14em", color: "var(--red)", minWidth: 40 }}>0{i + 1}</span>
              <span style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{it.q}</span>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--line-2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 16, transition: "transform 0.4s var(--easing-out), background 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0)", background: open === i ? "var(--red)" : "transparent", flexShrink: 0 }}>+</div>
          </button>
          <div style={{ maxHeight: open === i ? 400 : 0, overflow: "hidden", transition: "max-height 0.5s var(--easing-out)" }}>
            <div style={{ padding: "0 0 28px 72px", fontSize: 16, lineHeight: 1.6, color: "var(--paper-2)", maxWidth: 720 }}>{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { ServicesPage, FAQ });
