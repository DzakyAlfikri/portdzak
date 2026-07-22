import { useState } from 'react'
import portherofix from './assets/portherofix.png'
import helloport from './assets/helloport.png'
import GradientBlinds from './GradientBlinds'
import ProfileCard from './ProfileCard'
import ExperienceSection from './components/ExperienceSection'
import './App.css'

// ── Page type ────────────────────────────────────────────
type Page = 'home' | 'foto-video' | 'desain-content' | 'website'

// ── Category Page Component ───────────────────────────────
function CategoryPage({ page, onBack }: { page: Page; onBack: () => void }) {
  const info: Record<Exclude<Page, 'home'>, { title: string; sub: string; count: string }> = {
    'foto-video':     { title: 'Foto & Video',      sub: 'Photography · Videography · Video Editing', count: '20+ Proyek' },
    'desain-content': { title: 'Desain & Content',  sub: 'Graphic Design · Branding · Social Media',  count: '15+ Proyek' },
    'website':        { title: 'Website',            sub: 'UI/UX Design · Frontend · Development',     count: '10+ Proyek' },
  }
  const current = info[page as Exclude<Page, 'home'>]

  return (
    <main id="portfolio-root">
      <div className="catpage-nav">
        <button className="catpage-back" onClick={onBack}>
          <span className="catpage-back-arrow">←</span>
          <span>Kembali</span>
        </button>
        <span id="nav-logo" style={{ cursor: 'pointer' }} onClick={onBack}>JK.</span>
      </div>

      <section className="catpage-hero">
        <div className="container">
          <p className="catpage-eyebrow">{current.count}</p>
          <h1 className="catpage-title">{current.title}</h1>
          <p className="catpage-sub">{current.sub}</p>
        </div>
      </section>

      <section className="catpage-empty">
        <div className="container">
          <div className="catpage-placeholder">
            <p className="catpage-placeholder-text">Proyek akan segera ditambahkan.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

// ── Main App ──────────────────────────────────────────────
function App() {
  const [page, setPage] = useState<Page>('home')

  if (page !== 'home') {
    return <CategoryPage page={page} onBack={() => setPage('home')} />
  }

  const categories: { key: Exclude<Page, 'home'>; label: string; sub: string; num: string }[] = [
    { key: 'foto-video',     label: 'Foto & Video',     sub: 'Photography · Videography · Video Editing', num: '01' },
    { key: 'desain-content', label: 'Desain & Content', sub: 'Graphic Design · Branding · Social Media',  num: '02' },
    { key: 'website',        label: 'Website',           sub: 'UI/UX Design · Frontend · Development',    num: '03' },
  ]

  return (
    <main id="portfolio-root">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section id="hero">
        <div id="hero-gradient-bg">
          <GradientBlinds
            dpr={1}
            gradientColors={['#0a0a0a', '#2a2a2a', '#111111', '#3a3a3a', '#0f0f0f']}
            angle={0}
            noise={0.18}
            blindCount={8}
            blindMinWidth={50}
            spotlightRadius={0.38}
            spotlightSoftness={1.2}
            spotlightOpacity={0.9}
            mouseDampening={0.18}
            distortAmount={30}
            shineDirection="left"
            mixBlendMode="normal"
          />
        </div>

        <nav id="hero-nav">
          <span id="nav-logo">JK.</span>
          <ul id="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div id="hero-inner">
          <div id="hero-text">
            <p id="hero-eyebrow">Visual &amp; Digital</p>
            <h1 id="hero-title">
              <span className="title-thin">CREATIVE</span>
              <span className="title-bold">MEDIA</span>
              <span className="title-outline">&amp; DEVELOPER</span>
            </h1>
            <p id="hero-desc">
              Crafting purposeful digital experiences with a sharp eye for detail,
              clean aesthetics, and thoughtful interaction design.
            </p>
            <div id="hero-cta">
              <a href="#work" id="btn-primary">View Work</a>
              <a href="#contact" id="btn-secondary">Get in Touch ↗</a>
            </div>
          </div>

          <div id="hero-image-block" style={{ pointerEvents: 'none' }}>
            <ProfileCard
              avatarUrl={portherofix}
              name="Jaki"
              title="Creative Designer"
              handle="jakidesign"
              status="Open to Work"
              contactText="Contact Me"
              showUserInfo={false}
              enableTilt={false}
              enableMobileTilt={false}
              behindGlowEnabled={false}
              behindGlowColor="#ffffff"
              behindGlowSize="100%"
              miniAvatarUrl=""
              innerGradient="linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(50,50,50,0.6) 100%)"
              onContactClick={() => window.location.href = '#contact'}
            />
          </div>
        </div>

        <div id="hero-bottom">
          <div id="hero-scroll-hint">
            <span id="scroll-line"></span>
            <span id="scroll-text">SCROLL</span>
          </div>
          <div id="hero-stats">
            <div className="stat">
              <span className="stat-num">3+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">40+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">15+</span>
              <span className="stat-label">Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="about-section">
        <div className="about-img-wrap">
          <img src={helloport} alt="Dzaky Alfikri" className="about-img" />
        </div>

        <div className="container">
          <div className="about-bottom">
            <div className="about-name">Hi, I'm Dzaky Alfikri</div>
            <div className="about-desc">
              <p className="about-text">
                Mahasiswa Informatika Universitas Jenderal Soedirman dengan fokus pada Creative Media dan Digital Content Production. Berpengalaman dalam produksi konten multimedia, pengelolaan media sosial, serta pengembangan visual branding untuk organisasi dan event.
                Menggabungkan kemampuan teknis di bidang teknologi dengan kreativitas dalam fotografi, videografi, desain, dan UI/UX untuk menghasilkan konten yang relevan, engaging, dan berdampak.
              </p>
            </div>
          </div>

          <div className="apps-scroll mt-12">
            <div className="apps-track">
              {[
                { name: 'CapCut', desc: 'Video Editing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
                { name: 'Canva', desc: 'Graphic Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg' },
                { name: 'Lightroom', desc: 'Photo Editing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg' },
                { name: 'Premiere Pro', desc: 'Video Production', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg' },
                { name: 'Figma', desc: 'UI/UX Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
                { name: 'VS Code', desc: 'Development', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
                { name: 'Photoshop', desc: 'Image Editing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg' },
                { name: 'Notion', desc: 'Project Management', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg' },
              ].map((app, i) => (
                <div key={i} className="app-card">
                  <div className="app-icon-wrap">
                    <img src={app.icon} alt={app.name} className="app-icon" />
                  </div>
                  <h3 className="app-name">{app.name}</h3>
                  <span className="app-desc">{app.desc}</span>
                </div>
              ))}
              {[
                { name: 'CapCut', desc: 'Video Editing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
                { name: 'Canva', desc: 'Graphic Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg' },
                { name: 'Lightroom', desc: 'Photo Editing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg' },
                { name: 'Premiere Pro', desc: 'Video Production', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg' },
                { name: 'Figma', desc: 'UI/UX Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
                { name: 'VS Code', desc: 'Development', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
                { name: 'Photoshop', desc: 'Image Editing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg' },
                { name: 'Notion', desc: 'Project Management', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg' },
              ].map((app, i) => (
                <div key={`dup-${i}`} className="app-card">
                  <div className="app-icon-wrap">
                    <img src={app.icon} alt={app.name} className="app-icon" />
                  </div>
                  <h3 className="app-name">{app.name}</h3>
                  <span className="app-desc">{app.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─────────────────────────────────────────── */}
      <ExperienceSection />

      {/* ─── MY PROJECTS ──────────────────────────────────────── */}
      <section id="work" className="section-padding work-section">
        <div className="container">

          <div className="work-header">
            <p className="work-eyebrow">Portfolio</p>
            <h2 className="work-title">MY<br /><span className="work-title-outline">PROJECTS</span></h2>
          </div>

          <div className="work-list">
            {categories.map((cat, i) => (
              <button
                key={cat.key}
                className="work-row"
                onClick={() => setPage(cat.key)}
                aria-label={`Lihat proyek ${cat.label}`}
              >
                <span className="work-row-num">{cat.num}</span>
                <span className="work-row-label">{cat.label}</span>
                <span className="work-row-sub">{cat.sub}</span>
                <span className="work-row-arrow">→</span>
                {i < categories.length - 1 && <span className="work-row-line" />}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="section-padding">
        <div id="contact-gradient-bg">
          <GradientBlinds
            dpr={1}
            gradientColors={['#0a0a0a', '#2a2a2a', '#111111', '#3a3a3a', '#0f0f0f']}
            angle={0}
            noise={0.18}
            blindCount={8}
            blindMinWidth={50}
            spotlightRadius={0.38}
            spotlightSoftness={1.2}
            spotlightOpacity={0.9}
            mouseDampening={0.18}
            distortAmount={30}
            shineDirection="left"
            mixBlendMode="normal"
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="contact-grid">
            <div className="contact-left">
              <h2 className="contact-heading">Let's get<br />in touch</h2>
              <p className="contact-desc">
                Have a project in mind or just want to say hi? Drop me a message and I'll get back to you.
              </p>
              <div className="contact-socials">
                <a href="https://instagram.com/jakidesign" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/jakidesign" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <input type="text" id="name" placeholder="Name" className="form-input" />
              </div>
              <div className="form-group">
                <input type="email" id="email" placeholder="Email" className="form-input" />
              </div>
              <div className="form-group">
                <textarea id="message" placeholder="Message" className="form-input form-textarea" rows={5}></textarea>
              </div>
              <button type="submit" className="form-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
