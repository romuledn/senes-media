// ─── SENES MEDIA · App entry · routing + tweaks ───────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ED3225",
  "workLayout": "default",
  "grain": true,
  "atmosphere": "ember"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = React.useState(() => {
    const h = window.location.hash.replace("#", "");
    return ["home", "work", "about", "services", "contact"].includes(h) ? h : "home";
  });
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  React.useEffect(() => {
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (["home", "work", "about", "services", "contact"].includes(h)) setPage(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // apply accent
  React.useEffect(() => {
    document.documentElement.style.setProperty("--red", t.accent);
    document.documentElement.style.setProperty("--red-bright", lighten(t.accent, 0.1));
    document.documentElement.style.setProperty("--red-deep", darken(t.accent, 0.15));
  }, [t.accent]);

  // atmosphere palette → CSS vars used by hero-atmosphere
  React.useEffect(() => {
    const palette = ATMOS[t.atmosphere] || ATMOS.ember;
    document.documentElement.style.setProperty("--atm-a", palette.a);
    document.documentElement.style.setProperty("--atm-b", palette.b);
    document.documentElement.style.setProperty("--atm-c", palette.c);
  }, [t.atmosphere]);

  // local clock — South Africa (SAST, UTC+2)
  React.useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const opt = { timeZone: "Africa/Johannesburg", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
      const txt = new Intl.DateTimeFormat("en-GB", opt).format(d) + " SAST";
      const el = document.getElementById("local-clock");
      if (el) el.textContent = txt;
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  // ─── Auto-reveal: site-wide fade-up that re-triggers on scroll ──
  React.useEffect(() => {
    const setup = setTimeout(() => {
      const selectors = [
        "main h1", "main h2", "main h3", "main .display",
        "main .manifesto-text", "main .philosophy",
        "main .work-card", "main .review-card",
        "main .pricing-card", "main .philosophy-card", "main .tools-card",
        "main .info-cell", "main .timeline-row", "main .process-row",
        "main .service-row", "main .laptop-wrap", "main .stat",
        "main .pd-figure",
      ];
      const targets = document.querySelectorAll(selectors.join(","));
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ar-in");
          } else {
            // Re-arm only if scrolled clearly out of view
            const r = e.boundingClientRect;
            if (r.top > window.innerHeight || r.bottom < 0) {
              e.target.classList.remove("ar-in");
            }
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });

      let groupIndex = new Map();
      targets.forEach((el) => {
        // Skip elements already wrapped in a Reveal, or inside a hero
        if (el.closest(".reveal, .page-hero, .home-hero, .pd-hero")) return;
        // Stagger within the same parent
        const parent = el.parentElement;
        const idx = (groupIndex.get(parent) || 0);
        groupIndex.set(parent, idx + 1);
        el.style.setProperty("--ar-delay", `${Math.min(idx, 6) * 60}ms`);
        el.classList.add("auto-reveal");
        obs.observe(el);
      });
      window.__senesObs = obs;
    }, 60);

    return () => {
      clearTimeout(setup);
      if (window.__senesObs) window.__senesObs.disconnect();
    };
  }, [page]);

  const [activeProject, setActiveProject] = React.useState(null);
  const openProject = (project) => setActiveProject(project);
  const closeProject = (action, nextProject) => {
    if (action === "open" && nextProject) {
      setActiveProject(nextProject);
      return;
    }
    setActiveProject(null);
  };

  const renderPage = () => {
    const props = { navigate: setPage, layout: t.workLayout, openProject };
    if (page === "home")     return <HomePage {...props} />;
    if (page === "work")     return <WorkPage {...props} />;
    if (page === "about")    return <AboutPage {...props} />;
    if (page === "services") return <ServicesPage {...props} />;
    if (page === "contact")  return <ContactPage {...props} />;
    return <HomePage {...props} />;
  };

  return (
    <React.Fragment>
      <Cursor />
      {t.grain && <div className="grain" />}
      <Nav page={page} navigate={(p) => { setPage(p); setMobileNavOpen(false); }}
           mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
      <main key={page} className="page-anim">
        {renderPage()}
      </main>
      <CTACloser navigate={setPage} />
      <Footer navigate={setPage} />

      <ProjectDetail project={activeProject} onClose={closeProject} />

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={["#ED3225", "#FF6B35", "#D4A574", "#7BB4E2", "#4ADE80", "#A78BFA"]}
          onChange={(v) => setTweak("accent", v)} />

        <TweakSection label="Hero atmosphere" />
        <TweakRadio label="Mood" value={t.atmosphere}
          options={["ember", "dusk", "cobalt"]}
          onChange={(v) => setTweak("atmosphere", v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Work grid" value={t.workLayout}
          options={["default", "grid", "list", "stagger"]}
          onChange={(v) => setTweak("workLayout", v)} />

        <TweakSection label="Feel" />
        <TweakToggle label="Film grain" value={t.grain}
          onChange={(v) => setTweak("grain", v)} />
      </TweaksPanel>

      <style>{`
        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 9998;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>");
          opacity: 0.045;
          mix-blend-mode: overlay;
        }
      `}</style>
    </React.Fragment>
  );
}

const ATMOS = {
  ember:  { a: "rgba(230, 51, 39, 0.55)",  b: "rgba(180, 30, 25, 0.4)",  c: "rgba(255, 90, 75, 0.32)" },
  dusk:   { a: "rgba(160, 60, 200, 0.45)", b: "rgba(80, 40, 160, 0.4)",  c: "rgba(220, 120, 200, 0.28)" },
  cobalt: { a: "rgba(40, 100, 220, 0.5)",  b: "rgba(20, 60, 160, 0.42)", c: "rgba(100, 160, 255, 0.28)" },
};

// ─── tiny color helpers ──────────────────────────────────────
function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/.{2}/g);
  return m ? m.map(x => parseInt(x, 16)) : [0,0,0];
}
function rgbToHex([r,g,b]) {
  return "#" + [r,g,b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2,"0")).join("");
}
function lighten(hex, amt) {
  const [r,g,b] = hexToRgb(hex);
  return rgbToHex([r + (255-r)*amt, g + (255-g)*amt, b + (255-b)*amt]);
}
function darken(hex, amt) {
  const [r,g,b] = hexToRgb(hex);
  return rgbToHex([r*(1-amt), g*(1-amt), b*(1-amt)]);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
