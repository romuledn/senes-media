// ─── SENES MEDIA · Contact page (Designova layout) ────────────────

function ContactPage({ navigate }) {
  const d = window.SENES_DATA;
  const [form, setForm] = React.useState({
    name: "", email: "", company: "", budget: "", services: [], timeline: "", message: "",
  });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const toggleService = (s) => {
    setForm({ ...form, services: form.services.includes(s) ? form.services.filter(x => x !== s) : [...form.services, s] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/mdajvoje", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          services: form.services.join(", "),
          timeline: form.timeline,
          message: form.message,
        }),
      });
      if (res.ok) setSent(true);
    } catch (err) {}
    setSending(false);
  };

  return (
    <div className="page">
      <section className="page-hero" style={{ minHeight: "clamp(480px, 60vh, 640px)" }}>
        <div className="page-hero-bg">
          <img src="assets/hero-lens.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="page-hero-content container" style={{ padding: 0 }}>
          <div className="page-hero-left">
            <div className="page-hero-pill">
              <span className="dot" />
              <span>Get in touch</span>
            </div>
            <h1 className="page-hero-title">
              Let's<br/>
              <span className="it">talk.</span>
            </h1>
            <p className="page-hero-blurb">
              We would love to hear about your project and help bring your ideas to life.
            </p>
          </div>
        </div>
      </section>

      <div className="info-bar">
        <div className="info-cell">
          <div className="corner" />
          <h4>{d.contact.email}</h4>
          <p>Email is fastest. We read every brief personally and reply within 30 minutes.</p>
        </div>
        <div className="info-cell">
          <div className="corner" />
          <h4>{d.contact.phone}</h4>
          <p>By appointment. Use the form to schedule a call — saves us both a phone-tag week.</p>
        </div>
        <div className="info-cell">
          <div className="corner" />
          <h4>SENES Media</h4>
          <p>A multidisciplinary studio — available worldwide. Bring your project, leave with a clear next step.</p>
        </div>
      </div>

      {/* Form */}
      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>PROJECT BRIEF · 02</div>
              <h2 className="display title">Tell us <span className="it">about it.</span></h2>
            </div>
            <div className="meta">Share a few details and we'll respond within 30 minutes<br/>All fields required except company</div>
          </div>

          {sent ? (
            <div style={{ padding: "100px 0", textAlign: "center" }}>
              <div className="eyebrow" style={{ marginBottom: 24, justifyContent: "center", color: "var(--red)" }}>BRIEF RECEIVED</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 72, lineHeight: 1, marginBottom: 20 }}>
                Got it. <span className="it" style={{ color: "var(--red)" }}>Thank you.</span>
              </div>
              <p style={{ fontSize: 17, color: "var(--paper-2)", maxWidth: 480, marginInline: "auto", lineHeight: 1.5 }}>
                We'll review your brief and reply within 30 minutes with a proposed call time, or a polite no.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <Field label="Your name" required>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} data-cursor="text" placeholder="Full name" required />
              </Field>
              <Field label="Email" required>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-cursor="text" placeholder="you@company.com" required />
              </Field>
              <Field label="Company">
                <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} data-cursor="text" placeholder="Optional" />
              </Field>
              <Field label="Need">
                <div className="chip-row">
                  {["Web design", "Development", "Brand identity", "Art direction", "Media production", "Consultation"].map((s) => (
                    <button type="button" key={s} onClick={() => toggleService(s)} data-cursor="hover"
                      className={`chip ${form.services.includes(s) ? "on" : ""}`}>{s}</button>
                  ))}
                </div>
              </Field>
              <Field label="Timeline">
                <div className="chip-row">
                  {["ASAP", "1–3 months", "3–6 months", "Flexible"].map((t) => (
                    <button type="button" key={t} onClick={() => setForm({ ...form, timeline: t })} data-cursor="hover"
                      className={`chip ${form.timeline === t ? "on" : ""}`}>{t}</button>
                  ))}
                </div>
              </Field>
              <Field label="The project" required>
                <textarea rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} data-cursor="text" placeholder="What are you trying to accomplish? Where are you stuck?" required />
              </Field>

              <div style={{ marginTop: 40, display: "flex", justifyContent: "flex-end", alignItems: "center", flexWrap: "wrap", gap: 24, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
                <Magnetic strength={0.25}>
                  <button type="submit" className="btn primary" data-cursor="hover" style={{ padding: "20px 32px" }} disabled={sending}>
                    {sending ? "Sending…" : <>Send Brief <Arrow /></>}
                  </button>
                </Magnetic>
              </div>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .contact-form { max-width: 880px; margin: 0 auto; }
        .field { padding: 22px 0; border-bottom: 1px solid var(--line); display: grid; grid-template-columns: 160px 1fr; gap: 32px; align-items: start; }
        .field-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--paper-3); padding-top: 14px; }
        .field-label .req { color: var(--red); margin-left: 4px; }
        .field input, .field textarea {
          width: 100%;
          background: transparent;
          border: none;
          font-family: var(--serif);
          font-size: 22px;
          letter-spacing: -0.005em;
          color: var(--paper);
          padding: 10px 0;
          outline: none;
          resize: vertical;
        }
        .field input::placeholder, .field textarea::placeholder { color: var(--paper-4); }
        .field textarea { font-family: var(--sans); font-size: 16px; line-height: 1.5; }
        @media (max-width: 880px) {
          .field { grid-template-columns: 1fr; gap: 8px; }
        }
        .chip-row { display: flex; flex-wrap: wrap; gap: 8px; padding: 6px 0; }
        .chip {
          padding: 9px 16px;
          border-radius: 100px;
          font-family: var(--sans);
          font-size: 13px;
          font-weight: 500;
          background: rgba(255,255,255,0.03);
          color: var(--paper-2);
          box-shadow: inset 0 0 0 1px var(--line-2);
          transition: all 0.2s;
        }
        .chip:hover { color: var(--paper); box-shadow: inset 0 0 0 1px var(--paper-3); }
        .chip.on {
          background: var(--red);
          color: #fff;
          box-shadow: 0 8px 20px -8px rgba(230, 51, 39, 0.5);
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="field">
      <div className="field-label">{label}{required && <span className="req">*</span>}</div>
      <div>{children}</div>
    </div>
  );
}

Object.assign(window, { ContactPage, Field });
