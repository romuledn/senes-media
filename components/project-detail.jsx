// ─── SENES MEDIA · Project Detail Overlay ──────────────────────────
// Fullscreen modal that opens when a project card is clicked.
// Renders the project header + a vertical gallery of all images.

function ProjectDetail({ project, onClose }) {
  const scrollRef = React.useRef(null);
  const [allProjects] = React.useState(window.SENES_DATA.projects);
  const [lightbox, setLightbox] = React.useState(-1); // -1 closed, else image index

  React.useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (lightbox >= 0) setLightbox(-1);
        else onClose();
      }
      if (lightbox >= 0 && project) {
        if (e.key === "ArrowLeft")  setLightbox((i) => (i - 1 + project.images.length) % project.images.length);
        if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % project.images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, lightbox]);

  // Reset scroll + lightbox on project change
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setLightbox(-1);
  }, [project?.id]);

  if (!project) return null;

  const idx = allProjects.findIndex((p) => p.id === project.id);
  const prev = idx > 0 ? allProjects[idx - 1] : null;
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;

  return (
    <div className="pd-root" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="pd-scroll" ref={scrollRef}>
        {/* Close + meta header bar */}
        <div className="pd-topbar">
          <div className="pd-crumb">
            <span className="pd-crumb-num">{project.id}</span>
            <span className="pd-crumb-sep">/</span>
            <span className="pd-crumb-cat">{project.category}</span>
          </div>
          <button className="pd-close" onClick={onClose} data-cursor="hover" data-cursor-label="Close (ESC)">
            <span className="pd-close-line" />
            <span className="pd-close-line" />
          </button>
        </div>

        {/* Hero / project title */}
        <div className="pd-hero" style={{ background: `linear-gradient(180deg, ${project.color} 0%, var(--ink) 100%)` }}>
          <div className="pd-hero-bg">
            <img src={project.cover} alt={project.name} />
          </div>
          <div className="pd-hero-inner">
            <div className="pd-eyebrow">
              <span className="pd-dot" style={{ background: project.accent }} />
              <span>{project.year} · {project.services.join(" · ")}</span>
            </div>
            <h1 className="pd-title">{project.name}</h1>
            <p className="pd-desc">{project.description}</p>
          </div>
        </div>

        {/* Brief / meta panel */}
        <div className="pd-brief">
          <div className="pd-brief-grid">
            <div>
              <div className="pd-label">Client</div>
              <div className="pd-value">{project.name}</div>
            </div>
            <div>
              <div className="pd-label">Year</div>
              <div className="pd-value">{project.year}</div>
            </div>
            <div>
              <div className="pd-label">Discipline</div>
              <div className="pd-value">{project.category}</div>
            </div>
            <div>
              <div className="pd-label">Deliverables</div>
              <div className="pd-value">{project.services.length}</div>
            </div>
            {project.website && (
              <div className="pd-website">
                <div className="pd-label">Live site</div>
                <a href={project.website} target="_blank" rel="noopener noreferrer"
                   className="pd-website-link" data-cursor="hover" data-cursor-label="Open ↗">
                  <span>{project.website.replace(/^https?:\/\/(www\.)?/, "")}</span>
                  <span className="pd-website-arrow">↗</span>
                </a>
              </div>
            )}
          </div>

          <div className="pd-brief-text">
            <div className="pd-label" style={{ marginBottom: 20 }}>The brief</div>
            <p>{project.brief}</p>
          </div>
        </div>

        {/* Image gallery — side-by-side grid, click to open slider */}
        <div className="pd-gallery">
          <div className="pd-gallery-head">
            <div className="pd-label">Gallery · {project.images.length} item{project.images.length === 1 ? "" : "s"}</div>
            <div className="pd-gallery-hint">Click any tile to view full-size</div>
          </div>
          <div className="pd-grid">
            {project.images.map((img, i) => (
              <button key={img.src} className="pd-tile"
                onClick={() => setLightbox(i)}
                data-cursor="drag" data-cursor-label="Open">
                <div className="pd-tile-img" style={{ aspectRatio: img.aspect || "4/3" }}>
                  <img src={img.src} alt={img.caption} loading={i < 4 ? "eager" : "lazy"} />
                  <div className="pd-tile-zoom">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <circle cx="11" cy="11" r="7"/>
                      <line x1="16" y1="16" x2="21" y2="21"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </div>
                </div>
                <div className="pd-tile-cap">
                  <span className="pd-tile-num">— 0{i + 1}</span>
                  <span>{img.caption}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer / next-project */}
        <div className="pd-footer">
          <div className="pd-footer-row">
            <button
              className="pd-nav-btn"
              disabled={!prev}
              onClick={() => prev && onClose("open", prev)}
              data-cursor={prev ? "hover" : undefined}
            >
              {prev ? (
                <React.Fragment>
                  <span className="pd-arrow-back">←</span>
                  <span>
                    <span className="pd-nav-label">Previous</span>
                    <span className="pd-nav-name">{prev.name}</span>
                  </span>
                </React.Fragment>
              ) : <span style={{ opacity: 0.4 }}>— First project</span>}
            </button>

            <button className="pd-close-text" onClick={onClose} data-cursor="hover">
              Close project
            </button>

            <button
              className="pd-nav-btn right"
              disabled={!next}
              onClick={() => next && onClose("open", next)}
              data-cursor={next ? "hover" : undefined}
            >
              {next ? (
                <React.Fragment>
                  <span style={{ textAlign: "right" }}>
                    <span className="pd-nav-label">Next project</span>
                    <span className="pd-nav-name">{next.name}</span>
                  </span>
                  <span className="pd-arrow-fwd">→</span>
                </React.Fragment>
              ) : <span style={{ opacity: 0.4 }}>Last project —</span>}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .pd-root {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(8, 8, 10, 0.86);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: pd-fade 0.35s var(--easing-out);
        }
        @keyframes pd-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .pd-scroll {
          position: absolute;
          inset: 24px;
          background: var(--ink);
          border-radius: var(--card-radius);
          overflow-y: auto;
          overflow-x: hidden;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.7);
          animation: pd-rise 0.5s var(--easing-out);
        }
        @media (max-width: 720px) { .pd-scroll { inset: 12px; border-radius: 16px; } }
        @keyframes pd-rise {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Topbar (sticky) */
        .pd-topbar {
          position: sticky;
          top: 0;
          z-index: 5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 32px;
          background: linear-gradient(180deg, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.6) 80%, transparent 100%);
          backdrop-filter: blur(8px);
        }
        .pd-crumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--paper-2);
        }
        .pd-crumb-num { color: var(--red); }
        .pd-crumb-sep { color: var(--paper-4); }
        .pd-close {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: background 0.25s, transform 0.25s var(--easing-out);
        }
        .pd-close:hover { background: var(--red); transform: rotate(90deg); }
        .pd-close-line {
          position: absolute;
          width: 16px;
          height: 1.5px;
          background: var(--paper);
          transform: rotate(45deg);
        }
        .pd-close-line:nth-child(2) { transform: rotate(-45deg); }

        /* Hero */
        .pd-hero {
          padding: 80px 32px 100px;
          position: relative;
          overflow: hidden;
        }
        .pd-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .pd-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.32;
          filter: saturate(1.05);
        }
        .pd-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            linear-gradient(180deg, rgba(10,10,11,0.35) 0%, rgba(10,10,11,0.55) 55%, var(--ink) 100%),
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,0,0,0.5), transparent);
          pointer-events: none;
        }
        .pd-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }
        .pd-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 16px;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(12px);
          border-radius: 100px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--paper);
          margin-bottom: 32px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
        }
        .pd-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          box-shadow: 0 0 12px currentColor;
        }
        .pd-title {
          font-family: var(--serif);
          font-size: clamp(48px, 9vw, 140px);
          line-height: 0.95;
          letter-spacing: -0.025em;
          font-weight: 500;
          margin-bottom: 28px;
        }
        .pd-desc {
          font-family: var(--serif);
          font-size: clamp(18px, 1.8vw, 26px);
          line-height: 1.35;
          color: var(--paper-2);
          max-width: 720px;
        }

        /* Brief */
        .pd-brief {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 32px;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 80px;
          align-items: start;
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 880px) {
          .pd-brief { grid-template-columns: 1fr; gap: 40px; padding: 56px 24px; }
        }
        .pd-brief-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px 32px;
        }
        .pd-label {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--paper-3);
          margin-bottom: 8px;
        }
        .pd-value {
          font-family: var(--serif);
          font-size: 20px;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .pd-brief-text p {
          font-size: 16px;
          line-height: 1.7;
          color: var(--paper-2);
        }

        /* Gallery — side-by-side grid */
        .pd-gallery {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 32px 80px;
        }
        @media (max-width: 720px) { .pd-gallery { padding: 32px 16px 56px; } }
        .pd-gallery-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 24px;
          margin-bottom: 32px;
          border-bottom: 1px solid var(--line);
        }
        .pd-gallery-hint {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--paper-3);
        }
        .pd-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 920px;
          margin: 0 auto;
        }
        .pd-tile {
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          cursor: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pd-tile-img {
          position: relative;
          width: 100%;
          background: var(--ink-3);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 16px 40px -16px rgba(0,0,0,0.5);
          transition: transform 0.4s var(--easing-out), box-shadow 0.4s;
        }
        .pd-tile:hover .pd-tile-img {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px -16px rgba(0,0,0,0.7);
        }
        .pd-tile-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s var(--easing-out);
        }
        .pd-tile:hover .pd-tile-img img { transform: scale(1.04); }
        .pd-tile-zoom {
          position: absolute;
          top: 14px; right: 14px;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(8px);
          color: var(--paper);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.3s, transform 0.3s var(--easing-out), background 0.3s;
        }
        .pd-tile:hover .pd-tile-zoom { opacity: 1; transform: scale(1); }
        .pd-tile:hover .pd-tile-zoom { background: var(--red); }
        .pd-tile-cap {
          display: flex;
          gap: 14px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--paper-2);
        }
        .pd-tile-num { color: var(--red); flex-shrink: 0; }

        /* Website link in brief */
        .pd-website { grid-column: 1 / -1; padding-top: 4px; }
        .pd-website-link {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 14px 22px;
          margin-top: 4px;
          background: rgba(255,255,255,0.04);
          border-radius: 100px;
          box-shadow: inset 0 0 0 1px var(--line-2);
          font-family: var(--sans);
          font-size: 14px;
          color: var(--paper);
          transition: all 0.3s;
        }
        .pd-website-link:hover {
          background: var(--red);
          box-shadow: inset 0 0 0 1px var(--red);
          color: #fff;
        }
        .pd-website-arrow {
          font-size: 16px;
          transition: transform 0.3s var(--easing-out);
        }
        .pd-website-link:hover .pd-website-arrow { transform: translate(3px, -3px); }

        /* ─── Lightbox ─── */
        .pd-lightbox {
          position: fixed;
          inset: 0;
          z-index: 250;
          background: rgba(4, 4, 6, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: grid;
          grid-template-rows: auto 1fr auto auto;
          padding: 24px;
          animation: pd-lb-fade 0.3s var(--easing-out);
        }
        @keyframes pd-lb-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 720px) { .pd-lightbox { padding: 12px; } }
        .pd-lb-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 8px;
        }
        .pd-lb-counter {
          font-family: var(--mono);
          font-size: 13px;
          letter-spacing: 0.14em;
        }
        .pd-lb-close {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: background 0.25s, transform 0.25s var(--easing-out);
        }
        .pd-lb-close:hover { background: var(--red); transform: rotate(90deg); }
        .pd-lb-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 0;
          min-height: 0;
          position: relative;
          grid-row: 2;
          grid-column: 1 / -1;
        }
        .pd-lb-stage img {
          max-width: min(1100px, 92%);
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 30px 80px -20px rgba(0,0,0,0.8);
          animation: pd-lb-pop 0.4s var(--easing-out);
        }
        @keyframes pd-lb-pop {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .pd-lb-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px; height: 56px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          color: var(--paper);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: background 0.25s, transform 0.25s var(--easing-out);
        }
        .pd-lb-nav.prev { left: 32px; }
        .pd-lb-nav.next { right: 32px; }
        .pd-lb-nav:hover { background: var(--red); }
        .pd-lb-nav.prev:hover { transform: translateY(-50%) translateX(-4px); }
        .pd-lb-nav.next:hover { transform: translateY(-50%) translateX(4px); }
        @media (max-width: 720px) {
          .pd-lb-nav { width: 44px; height: 44px; }
          .pd-lb-nav.prev { left: 12px; }
          .pd-lb-nav.next { right: 12px; }
        }
        .pd-lb-caption {
          text-align: center;
          padding: 0 32px 16px;
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--paper-2);
          display: flex;
          gap: 14px;
          justify-content: center;
        }
        .pd-lb-rail {
          display: flex;
          gap: 8px;
          padding: 12px;
          overflow-x: auto;
          justify-content: center;
          background: rgba(255,255,255,0.03);
          border-radius: 100px;
          max-width: fit-content;
          margin: 0 auto;
        }
        .pd-lb-rail::-webkit-scrollbar { display: none; }
        .pd-lb-thumb {
          width: 56px; height: 42px;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          padding: 0;
          background: none;
          opacity: 0.55;
          transition: opacity 0.25s, transform 0.25s var(--easing-out);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
        }
        .pd-lb-thumb:hover { opacity: 0.85; transform: translateY(-2px); }
        .pd-lb-thumb.active { opacity: 1; box-shadow: inset 0 0 0 2px var(--red); }
        .pd-lb-thumb img { width: 100%; height: 100%; object-fit: cover; }

        /* Footer nav */
        .pd-footer {
          border-top: 1px solid var(--line);
          padding: 40px 32px 56px;
          background: var(--ink-2);
        }
        .pd-footer-row {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 32px;
          align-items: center;
        }
        @media (max-width: 720px) {
          .pd-footer-row { grid-template-columns: 1fr; gap: 16px; }
          .pd-footer-row > * { width: 100%; }
        }
        .pd-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          background: none;
          color: var(--paper);
          text-align: left;
          transition: color 0.25s;
        }
        .pd-nav-btn.right { justify-self: end; }
        .pd-nav-btn:disabled { color: var(--paper-3); cursor: default; }
        .pd-nav-btn:not(:disabled):hover { color: var(--red); }
        .pd-nav-btn:not(:disabled):hover .pd-arrow-back { transform: translateX(-6px); }
        .pd-nav-btn:not(:disabled):hover .pd-arrow-fwd { transform: translateX(6px); }
        .pd-arrow-back, .pd-arrow-fwd {
          font-size: 22px;
          transition: transform 0.25s var(--easing-out);
          line-height: 1;
        }
        .pd-nav-label {
          display: block;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--paper-3);
          margin-bottom: 6px;
        }
        .pd-nav-name {
          display: block;
          font-family: var(--serif);
          font-size: 22px;
          letter-spacing: -0.01em;
        }
        .pd-close-text {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--paper-3);
          padding: 12px 20px;
          border-radius: 100px;
          box-shadow: inset 0 0 0 1px var(--line-2);
          transition: all 0.25s;
        }
        .pd-close-text:hover { color: var(--paper); box-shadow: inset 0 0 0 1px var(--paper-3); }
      `}</style>
    </div>
  );
}

Object.assign(window, { ProjectDetail });
