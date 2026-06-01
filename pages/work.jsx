// ─── SENES MEDIA · Work page (Designova layout) ───────────────────

function WorkPage({ navigate, layout, openProject }) {
  const d = window.SENES_DATA;
  const [filter, setFilter] = React.useState("all");
  const filtered = filter === "all" ? d.projects : d.projects.filter(p => p.category.toLowerCase().includes(filter));
  const categories = ["all", "brand", "web", "packaging", "identity"];

  return (
    <div className="page">
      {/* ── Designova-style hero ── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="assets/portfolio/nali/2.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div className="page-hero-content container" style={{ padding: 0 }}>
          <div className="page-hero-left">
            <div className="page-hero-pill">
              <span className="dot" />
              <span>13 Selected Projects · 2023 — 2025</span>
            </div>
            <h1 className="page-hero-title">
              Work that <span className="it">earns</span><br/>
              its second life.
            </h1>
            <p className="page-hero-blurb">
              A curated archive of recent engagements across web, brand, and packaging — spanning Malawi, South Africa, Namibia, and the UK.
            </p>
            <div className="page-hero-actions">
              <button className="btn primary" data-cursor="hover" onClick={() => navigate("contact")}>Start a project <Arrow /></button>
              <button className="btn dark" data-cursor="hover" onClick={() => document.getElementById("work-grid")?.scrollIntoView({ behavior: "smooth" })}>Browse archive ↓</button>
            </div>
          </div>
        </div>
      </section>

      <div className="info-bar">
        <div className="info-cell">
          <div className="corner" />
          <h4>Creative Thinking</h4>
          <p>We believe creativity is the foundation of great communication. Every project begins with understanding your vision and transforming it into a meaningful concept.</p>
        </div>
        <div className="info-cell">
          <div className="corner" />
          <h4>Strategic Development</h4>
          <p>Our team combines creative thinking with digital expertise to build solutions that are not only visually impressive but also effective and practical.</p>
        </div>
        <div className="info-cell">
          <div className="corner" />
          <h4>Innovation</h4>
          <p>We continuously explore new technologies and creative techniques to ensure our clients stay ahead in a rapidly evolving digital environment.</p>
        </div>
      </div>

      {/* ── Filter row ── */}
      <section style={{ padding: "60px 0 32px" }} id="work-grid">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, paddingBottom: 32, borderBottom: "1px solid var(--line)" }}>
            <div className="eyebrow">FILTER · BY DISCIPLINE</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categories.map(c => (
                <button key={c} onClick={() => setFilter(c)} data-cursor="hover"
                  style={{
                    padding: "10px 18px",
                    borderRadius: 100,
                    fontFamily: "var(--sans)",
                    fontSize: 13,
                    fontWeight: 500,
                    background: filter === c ? "var(--red)" : "rgba(255,255,255,0.03)",
                    color: filter === c ? "#fff" : "var(--paper-2)",
                    boxShadow: filter === c ? "0 8px 24px -8px rgba(230,51,39,0.5)" : "inset 0 0 0 1px var(--line-2)",
                    transition: "all 0.25s",
                    textTransform: "capitalize",
                  }}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Work grid ── */}
      <section style={{ padding: "32px 0 100px" }}>
        <div className="container">
          <div className={`work-grid layout-${layout}`}>
            {filtered.map((p, i) => (
              <a key={p.id} href={`#project-${p.slug}`}
                onClick={(e) => { e.preventDefault(); openProject?.(p); }}
                className="work-card" data-cursor="drag" data-cursor-label="Open project">
                {layout !== "list" && (
                  <div className="work-thumb">
                    <div className="work-cover" style={{ aspectRatio: i % 5 === 0 ? "16/9" : "4/3" }}>
                      <img src={p.cover} alt={p.name} loading="lazy" />
                    </div>
                    <div className="work-overlay">
                      <div>— {p.id}</div>
                      <div className="work-arrow"><Arrow size={16} /></div>
                    </div>
                  </div>
                )}
                {layout === "list" ? (
                  <React.Fragment>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--red)", letterSpacing: "0.14em" }}>— {p.id}</div>
                    <div className="work-name">{p.name}</div>
                    <div className="work-cat" style={{ marginTop: 0 }}>{p.category}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--paper-3)", letterSpacing: "0.14em" }}>{p.services.join(" · ").toUpperCase()}</div>
                    <div className="work-year">{p.year}</div>
                  </React.Fragment>
                ) : (
                  <div className="work-meta">
                    <div>
                      <div className="work-name">{p.name}</div>
                      <div className="work-cat">{p.category} · {p.services.join(" · ")}</div>
                    </div>
                    <div className="work-year">{p.year}</div>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { WorkPage });
