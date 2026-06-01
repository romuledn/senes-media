// ─── SENES MEDIA · nav, footer ────────────────────────────────────

function Nav({ page, navigate }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "work", label: "Our Work" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  // close menu on outside click
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [open]);

  const go = (id) => { navigate(id); setOpen(false); };

  return (
    <nav className="nav" ref={menuRef}>
      <a href="#" onClick={(e) => { e.preventDefault(); go("home"); }} className="nav-logo" data-cursor="hover">
        <img src="assets/senes-full-logo.png" alt="SENES Media" className="nav-logo-img" />
      </a>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }}
             className={`nav-link ${page === l.id ? "active" : ""}`}
             data-cursor="hover">
            {l.label}
          </a>
        ))}
      </div>
      <div className="nav-right">
        <a href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }} className="nav-cta" data-cursor="hover">
          Get in touch <Arrow size={12} />
        </a>

        {/* Mobile hamburger */}
        <button
          className={`nav-burger ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          data-cursor="hover"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`nav-dropdown ${open ? "open" : ""}`}>
        <div className="nav-dropdown-links">
          {links.map((l, i) => (
            <a key={l.id} href={`#${l.id}`}
               onClick={(e) => { e.preventDefault(); go(l.id); }}
               className={`nav-dropdown-link ${page === l.id ? "active" : ""}`}
               style={{ transitionDelay: open ? `${0.04 + i * 0.035}s` : "0s" }}>
              <span className="nav-dropdown-num">0{i + 1}</span>
              <span>{l.label}</span>
              {page === l.id && <span className="nav-dropdown-dot" />}
            </a>
          ))}
        </div>
        <div className="nav-dropdown-divider" />
        <a href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }}
           className="nav-dropdown-cta"
           style={{ transitionDelay: open ? `${0.04 + links.length * 0.035}s` : "0s" }}>
          Get in touch <Arrow size={12} />
        </a>
        <div className="nav-dropdown-foot">
          <span>info@senesmedia.com</span>
        </div>
      </div>
    </nav>
  );
}

function Footer({ navigate }) {
  const d = window.SENES_DATA;
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: 24 }}>Senes Media · A Multidisciplinary Studio</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
            We help organizations translate ideas into powerful visual identities, engaging digital platforms, and compelling media content.
          </div>
        </div>
        <div>
          <h6>Sitemap</h6>
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); navigate("home"); }} data-cursor="hover">Home</a></li>
            <li><a href="#work" onClick={(e) => { e.preventDefault(); navigate("work"); }} data-cursor="hover">Our Work</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); navigate("about"); }} data-cursor="hover">About Us</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); navigate("services"); }} data-cursor="hover">Services</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }} data-cursor="hover">Contact</a></li>
          </ul>
        </div>
        <div>
          <h6>Elsewhere</h6>
          <ul>
            {d.contact.social.map((s) => <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer" data-cursor="hover">{s.name} ↗</a></li>)}
          </ul>
        </div>
        <div>
          <h6>Studio</h6>
          <ul>
            <li><a href={`mailto:${d.contact.email}`} data-cursor="hover">{d.contact.email}</a></li>
            <li style={{ color: "var(--paper-2)" }}>{d.contact.phone}</li>
            <li style={{ color: "var(--paper-2)" }}>{d.contact.address[0]}<br/>{d.contact.address[1]}</li>
          </ul>
        </div>
      </div>

      <div className="footer-big">
        Let's build something <span className="it">worth the time.</span>
      </div>

      <div className="footer-row">
        <div>© 2026 Senes Media · All rights reserved</div>
        <div>Where strategy meets craft</div>
        <div>Local · <span id="local-clock">--:--:--</span></div>
      </div>
    </footer>
  );
}

// ─── Global CTA closer — shows above the footer on every page ────
function CTACloser({ navigate }) {
  return (
    <section className="cta-closer">
      <div className="cta-video-wrap">
        <img
          className="cta-video bg-zoom"
          src="assets/bg-work.jpg"
          alt=""
          loading="lazy"
        />
        <div className="cta-scrim" />
      </div>
      <div className="cta-glow" />
      <div className="container" style={{ position: "relative", textAlign: "center", zIndex: 3 }}>
        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}>BEGIN · LET'S BRING YOUR IDEAS TO LIFE</div>
        <h2 className="display" style={{ fontSize: "clamp(64px, 11vw, 180px)" }}>
          Have a <span className="it" style={{ color: "var(--red)" }}>project?</span>
        </h2>
        <p style={{ fontFamily: "var(--serif)", fontSize: 22, marginTop: 28, color: "var(--paper-2)", maxWidth: 540, marginInline: "auto", lineHeight: 1.4 }}>
          We would love to hear about your project and help bring your ideas to life.
        </p>
        <div style={{ marginTop: 40 }}>
          <Magnetic strength={0.3}>
            <button className="btn primary" data-cursor="hover" onClick={() => navigate("contact")} style={{ padding: "20px 36px" }}>
              Start a conversation <Arrow />
            </button>
          </Magnetic>
        </div>
      </div>

      <style>{`
        .cta-closer {
          padding: 160px 0 180px;
          background: var(--ink);
          border-top: 1px solid var(--line);
          position: relative;
          overflow: hidden;
        }
        .cta-video-wrap { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .cta-video {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          filter: saturate(1) contrast(1.02) brightness(0.92);
        }
        .cta-scrim {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, var(--ink) 0%, rgba(10,10,11,0.2) 28%, rgba(10,10,11,0.2) 72%, var(--ink) 100%),
            radial-gradient(ellipse 70% 70% at 50% 50%, rgba(10,10,11,0.08), rgba(10,10,11,0.4) 95%);
        }
        .cta-glow {
          position: absolute; inset: 0; z-index: 1;
          background: radial-gradient(ellipse 60% 60% at 50% 70%, rgba(230, 51, 39, 0.28), transparent 60%);
          pointer-events: none;
          mix-blend-mode: screen;
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { Nav, Footer, CTACloser });
