import { useState, useRef } from 'react'
import GradientBlinds from '../GradientBlinds'
import './ExperienceSection.css'

export interface Experience {
  id: number
  title: string
  company: string
  date: string
  type: string
  description: string
  fullDescription: string
  responsibilities: string[]
  skills: string[]
  accentBg?: string
  isHighlight?: boolean
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Graphic Designer & Video Editor',
    company: 'Self-Employed',
    date: 'Agu 2025 - Skrg',
    type: 'Freelance',
    description: 'Fokus pada produksi video kreatif, visual branding, dan desain grafis berkualitas tinggi untuk berbagai klien.',
    fullDescription: 'Bekerja secara independen menangani proyek visual branding, editing video promosi, konten media sosial, dan materi pemasaran digital untuk berbagai klien individu maupun bisnis.',
    responsibilities: [
      'Membuat video editing berkualitas tinggi untuk Reels, TikTok, dan YouTube',
      'Merancang visual branding, logo, dan identitas grafis yang konsisten',
      'Mengelola workflow produksi media dari konsep hingga final rendering'
    ],
    skills: ['Premiere Pro', 'CapCut', 'Photoshop', 'Lightroom', 'Graphic Design'],
    isHighlight: true
  },
  {
    id: 2,
    title: 'Wedding Content Creator',
    company: 'Wedding Organizer',
    date: 'Okt 2025 - Skrg',
    type: 'Part-time',
    description: 'Dokumentasi visual momen pernikahan secara estetik dan cinematic untuk pasangan & WO.',
    fullDescription: 'Spesialis pembuatan konten dokumentasi pernikahan reel/short video secara real-time dan cinematic, menangkap momen sakral dan resepsi dengan estetika tinggi.',
    responsibilities: [
      'Pengambilan gambar & video dokumentasi momen pernikahan secara candid & cinematic',
      'Editing cepat (same-day edit) untuk dipublikasikan di Instagram Reels & TikTok',
      'Berkoordinasi dengan tim Wedding Organizer dan fotografer utama'
    ],
    skills: ['Videography', 'Color Grading', 'Mobile Editing', 'CapCut Pro', 'Storytelling']
  },
  {
    id: 3,
    title: 'Intern IT System Owner',
    company: 'PT PLN Nusantara Power',
    date: 'Jul 2025 - Agu 2025',
    type: 'Internship',
    description: 'Pengelolaan sistem IT, monitoring infrastruktur, dan dokumentasi sistem enterprise.',
    fullDescription: 'Magang industri di PT PLN Nusantara Power, bertanggung jawab mendokumentasikan, memantau, dan mendukung pemeliharaan sistem informasi operasional serta asistensi manajemen IT.',
    responsibilities: [
      'Monitoring kesehatan sistem aplikasi internal dan performa server',
      'Penyusunan dokumentasi teknis dan standar operasional prosedur (SOP) IT',
      'Membantu analisis kebutuhan pengguna dan perbaikan bug awal'
    ],
    skills: ['IT Operations', 'System Monitoring', 'Technical Docs', 'VS Code', 'Database']
  },
  {
    id: 4,
    title: 'Staf Creative Media',
    company: 'Soedirman Digital School',
    date: 'Mei 2025 - Okt 2025',
    type: 'Organization',
    description: 'Perancangan aset visual, video promosi program, dan pengelolaan media sosial organisasi.',
    fullDescription: 'Mengabdi sebagai Staf Creative Media di Soedirman Digital School, memimpin pembuatan desain poster, feeds Instagram, banner event, dan video promosi kegiatan pelatihan digital.',
    responsibilities: [
      'Merancang poster edukatif dan promosi kelas digital harian/mingguan',
      'Mengedit video recap kegiatan dan trailer program pelatihan',
      'Menjaga konsistensi branding dan tone of voice visual organisasi'
    ],
    skills: ['Canva', 'Photoshop', 'Social Media Admin', 'Figma', 'Content Strategy']
  },
  {
    id: 5,
    title: 'Content Creator',
    company: 'Purwokerto Healing',
    date: 'Apr 2025 - Okt 2025',
    type: 'Contract',
    description: 'Riset tren, liputan destinasi/kuliner lokal, dan pembuatan konten video viral.',
    fullDescription: 'Mengembangkan dan memproduksi konten seputar gaya hidup, kuliner, dan lokasi wisata menarik di Purwokerto yang terbukti meningkatkan keterlibatan audiens.',
    responsibilities: [
      'Melakukan riset tempat hits, kuliner, dan tren gaya hidup lokal',
      'Pengambilan video langsung di lapangan dan voiceover narasi',
      'Analisis performa konten dan optimasi strategi algoritma media sosial'
    ],
    skills: ['Content Creation', 'Copywriting', 'Video Editing', 'Analytics', 'Audience Growth']
  },
  {
    id: 6,
    title: 'UI/UX Designer',
    company: 'FundEx x Rakamin Academy',
    date: 'Mar 2025',
    type: 'Project',
    description: 'Redesain user interface & user experience platform investasi finansial digital.',
    fullDescription: 'Proyek kolaborasi studi kasus perancangan antarmuka aplikasi investasi finansial, mencakup user research, wireframing, prototyping interaktif, serta usability testing.',
    responsibilities: [
      'Melakukan user research dan penyusunan user persona & journey map',
      'Membuat wireframe low-fidelity hingga hi-fidelity UI component system',
      'Mengembangkan prototype interaktif dan melakukan usability testing'
    ],
    skills: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping', 'User Research']
  }
]

export default function ExperienceSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
  }

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const cardWidth = 360
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    setTimeout(checkScroll, 350)
  }

  return (
    <section id="experience" className="exp-new-section">
      <div id="exp-gradient-bg">
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

      <div className="exp-new-container">
        {/* Header */}
        <div className="exp-new-header">
          <div className="exp-new-header-left">
            <span className="exp-new-eyebrow">CAREER &amp; EXPERIENCE</span>
            <h2 className="exp-new-title" title="Comprehensive Work & Creative Experience">
              Comprehensive Work &amp; Creative Experience
            </h2>
          </div>
          <div className="exp-new-nav">
            <button
              className={`exp-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => handleScroll('left')}
              aria-label="Previous Slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className={`exp-nav-btn active ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => handleScroll('right')}
              aria-label="Next Slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Card Track */}
        <div
          className="exp-cards-track"
          ref={scrollContainerRef}
          onScroll={checkScroll}
        >
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={`exp-card ${exp.isHighlight ? 'is-highlight' : ''}`}
            >
              {/* Card Header Pills */}
              <div className="exp-card-header">
                <div className="exp-card-badges">
                  <span className="exp-pill exp-pill-date">{exp.date}</span>
                  <span className="exp-pill exp-pill-type">{exp.type}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="exp-card-body">
                <h3 className="exp-card-title" title={exp.title}>{exp.title}</h3>
                <p className="exp-card-company">{exp.company}</p>
                <p className="exp-card-desc">{exp.description}</p>
              </div>

              {/* Card Footer Action Button */}
              <div className="exp-card-footer">
                <button
                  className="exp-read-more-btn"
                  onClick={() => setSelectedExp(exp)}
                >
                  <span>Read More</span>
                  <div className="exp-btn-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedExp && (
        <div className="exp-modal-backdrop" onClick={() => setSelectedExp(null)}>
          <div className="exp-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="exp-modal-close"
              onClick={() => setSelectedExp(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="exp-modal-header">
              <div className="exp-modal-badges">
                <span className="exp-modal-pill">{selectedExp.date}</span>
                <span className="exp-modal-pill accent">{selectedExp.company}</span>
              </div>
              <h2 className="exp-modal-title">{selectedExp.title}</h2>
            </div>
            <div className="exp-modal-body">
              <div className="exp-modal-content">
                <p className="exp-modal-desc">{selectedExp.fullDescription}</p>

                <div className="exp-modal-section">
                  <h4>Tanggung Jawab &amp; Kontribusi:</h4>
                  <ul>
                    {selectedExp.responsibilities.map((resp, idx) => (
                      <li key={idx}>
                        <span className="bullet">✦</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="exp-modal-section">
                  <h4>Skill &amp; Tools:</h4>
                  <div className="exp-modal-tags">
                    {selectedExp.skills.map((skill, idx) => (
                      <span key={idx} className="exp-skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
