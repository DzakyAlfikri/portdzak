import { useState, useEffect, useRef } from 'react'
import { getProjects, saveProjects } from '../firebase/services'
import './AdminPanel.css'

const ADMIN_PASSWORD = 'jaki2026'

interface DesignProject {
  id: string
  title: string
  cat: string
  img: string
  desc: string
}

interface WebsiteProject {
  id: string
  title: string
  cat: string
  img: string
  desc: string
}

interface PhotoItem {
  id: string
  title: string
  category: string
  src: string
  date?: string
  description?: string
  aspect?: 'tall' | 'square' | 'wide' | 'portrait'
}

interface VideoItem {
  id: string
  title: string
  category: string
  duration: string
  thumbnail: string
  videoUrl: string
  description?: string
}

type AdminTab = 'foto-video' | 'desain' | 'website'

export default function AdminPanel({ onBack }: { onBack: () => void }) {
  const [locked, setLocked] = useState(true)
  const [password, setPassword] = useState('')
  const [pwError, setPwError] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('jaki_admin_auth') === 'true') setLocked(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setLocked(false)
      sessionStorage.setItem('jaki_admin_auth', 'true')
      setPwError('')
    } else {
      setPwError('Password salah!')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('jaki_admin_auth')
    setLocked(true)
    setPassword('')
  }

  const [activeTab, setActiveTab] = useState<AdminTab>('foto-video')
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [designs, setDesigns] = useState<DesignProject[]>([])
  const [websites, setWebsites] = useState<WebsiteProject[]>([])

  // Load from Firestore on mount
  useEffect(() => {
    getProjects().then(data => {
      if (!data) return
      if (data.photos) setPhotos(data.photos)
      if (data.videos) setVideos(data.videos)
      if (data.designs) setDesigns(data.designs)
      if (data.websites) setWebsites(data.websites)
    }).catch(() => {})
  }, [])

  // Debounced save to Firestore
  const saving = useRef(false)
  useEffect(() => {
    if (saving.current) return
    saving.current = true
    const timer = setTimeout(() => {
      saveProjects({ photos, videos, designs, websites }).catch(console.error)
      saving.current = false
    }, 500)
    return () => { clearTimeout(timer); saving.current = false }
  }, [photos, videos, designs, websites])

  /* ── FOTO & VIDEO FORM ── */
  const [fvType, setFvType] = useState<'foto' | 'video'>('foto')
  const [fvTitle, setFvTitle] = useState('')
  const [fvCategory, setFvCategory] = useState('Dokumentasi')
  const [fvSrc, setFvSrc] = useState('')
  const [fvAspect, setFvAspect] = useState<'tall' | 'square' | 'wide' | 'portrait'>('portrait')
  const [fvDuration, setFvDuration] = useState('02:00')
  const [fvVideoUrl, setFvVideoUrl] = useState('')
  const [fvDesc, setFvDesc] = useState('')

  const photoCats = ['Dokumentasi', 'Portrait', 'Event', 'Street', 'Nature', 'Lifestyle']
  const videoCats = ['Aftermovie', 'Cinematic', 'Commercial', 'Dokumenter', 'Teaser', 'Company Profile']

  const handleFvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setFvSrc(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleFvSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fvTitle || !fvSrc) { alert('Isi Judul dan Gambar!'); return }
    if (fvType === 'foto') {
      setPhotos([{ id: 'p_' + Date.now(), title: fvTitle, category: fvCategory, src: fvSrc, date: new Date().getFullYear().toString(), description: fvDesc, aspect: fvAspect }, ...photos])
    } else {
      setVideos([{ id: 'v_' + Date.now(), title: fvTitle, category: fvCategory, duration: fvDuration, thumbnail: fvSrc, videoUrl: fvVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', description: fvDesc }, ...videos])
    }
    setFvTitle(''); setFvSrc(''); setFvVideoUrl(''); setFvDesc('')
  }

  /* ── DESAIN FORM ── */
  const [dTitle, setDTitle] = useState('')
  const [dCat, setDCat] = useState('Branding')
  const [dImg, setDImg] = useState('')
  const [dDesc, setDDesc] = useState('')
  const dCats = ['Branding', 'Social Media', 'Graphic Design', 'Illustration', 'Typography']

  const handleDFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { const r = new FileReader(); r.onloadend = () => setDImg(r.result as string); r.readAsDataURL(file) }
  }

  const handleDSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dTitle || !dImg) { alert('Isi Judul dan Gambar!'); return }
    setDesigns([{ id: 'd_' + Date.now(), title: dTitle, cat: dCat, img: dImg, desc: dDesc }, ...designs])
    setDTitle(''); setDImg(''); setDDesc('')
  }

  /* ── WEBSITE FORM ── */
  const [wTitle, setWTitle] = useState('')
  const [wCat, setWCat] = useState('Web Development')
  const [wImg, setWImg] = useState('')
  const [wDesc, setWDesc] = useState('')
  const wCats = ['Web Development', 'UI/UX Design', 'Frontend', 'Full Stack', 'Mobile']

  const handleWFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { const r = new FileReader(); r.onloadend = () => setWImg(r.result as string); r.readAsDataURL(file) }
  }

  const handleWSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!wTitle || !wImg) { alert('Isi Judul dan Gambar!'); return }
    setWebsites([{ id: 'w_' + Date.now(), title: wTitle, cat: wCat, img: wImg, desc: wDesc }, ...websites])
    setWTitle(''); setWImg(''); setWDesc('')
  }

  /* ── GLOBAL ACTIONS ── */
  const handleExportAll = () => {
    const data = { photos, videos, designs, websites }
    const a = document.createElement('a')
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2))
    a.download = "portfolio_all_projects.json"
    a.click()
  }

  const handleImportJSON = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e: any) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string)
          if (data.photos) setPhotos(data.photos)
          if (data.videos) setVideos(data.videos)
          if (data.designs) setDesigns(data.designs)
          if (data.websites) setWebsites(data.websites)
          alert('Data berhasil diimport!')
        } catch { alert('File JSON tidak valid!') }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleResetAll = () => {
    if (!confirm('Hapus SEMUA data proyek?')) return
    setPhotos([]); setVideos([])
    setDesigns([]); setWebsites([])
  }

  if (locked) {
    return (
      <div className="admin-lock-screen">
        <div className="admin-lock-card">
          <h1 className="admin-lock-title">Admin Panel</h1>
          <p className="admin-lock-sub">Masukkan password untuk mengelola proyek</p>
          <form onSubmit={handleLogin} className="admin-lock-form">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="admin-lock-input"
              autoFocus
            />
            {pwError && <p className="admin-lock-error">{pwError}</p>}
            <button type="submit" className="admin-lock-btn">Buka Admin</button>
          </form>
          <button className="admin-lock-back" onClick={onBack}>← Kembali ke Beranda</button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-left">
          <button className="admin-nav-back" onClick={onBack}>← Beranda</button>
          <h1 className="admin-title">Admin Panel</h1>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-tabs">
        {(['foto-video', 'desain', 'website'] as AdminTab[]).map(tab => (
          <button key={tab} className={`admin-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'foto-video' ? '📸 Foto & Video' : tab === 'desain' ? '🎨 Desain & Content' : '🌐 Website'}
          </button>
        ))}
        <button className="admin-tab export-tab" onClick={handleExportAll}>📥 Export All</button>
        <button className="admin-tab import-tab" onClick={handleImportJSON}>📥 Import JSON</button>
        <button className="admin-tab reset-tab" onClick={handleResetAll}>🔄 Reset</button>
      </div>

      <div className="admin-content">
        {/* ── FOTO & VIDEO ── */}
        {activeTab === 'foto-video' && (
          <div className="admin-section">
            <form onSubmit={handleFvSubmit} className="admin-form">
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Tipe</label>
                  <div className="admin-type-group">
                    <button type="button" className={`admin-type-btn ${fvType === 'foto' ? 'active' : ''}`} onClick={() => { setFvType('foto'); setFvCategory('Dokumentasi') }}>📷 Foto</button>
                    <button type="button" className={`admin-type-btn ${fvType === 'video' ? 'active' : ''}`} onClick={() => { setFvType('video'); setFvCategory('Aftermovie') }}>🎬 Video</button>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Kategori</label>
                  <select value={fvCategory} onChange={e => setFvCategory(e.target.value)}>
                    {(fvType === 'foto' ? photoCats : videoCats).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-group">
                <label>Judul</label>
                <input type="text" required placeholder="Judul proyek..." value={fvTitle} onChange={e => setFvTitle(e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>{fvType === 'foto' ? 'Gambar (file / URL)' : 'Thumbnail (file / URL)'}</label>
                <input type="file" accept="image/*" onChange={handleFvFile} />
                <input type="text" placeholder="Atau URL gambar..." value={fvSrc} onChange={e => setFvSrc(e.target.value)} style={{ marginTop: 8 }} />
                {fvSrc && <img src={fvSrc} alt="preview" className="admin-preview" />}
              </div>
              {fvType === 'foto' ? (
                <div className="admin-form-group">
                  <label>Aspect Ratio (Masonry)</label>
                  <select value={fvAspect} onChange={e => setFvAspect(e.target.value as any)}>
                    <option value="tall">Tall (3:4)</option>
                    <option value="portrait">Portrait</option>
                    <option value="square">Square (1:1)</option>
                    <option value="wide">Wide</option>
                  </select>
                </div>
              ) : (
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Durasi</label>
                    <input type="text" placeholder="02:30" value={fvDuration} onChange={e => setFvDuration(e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label>URL Video (MP4)</label>
                    <input type="text" placeholder="https://..." value={fvVideoUrl} onChange={e => setFvVideoUrl(e.target.value)} />
                  </div>
                </div>
              )}
              <div className="admin-form-group">
                <label>Deskripsi</label>
                <textarea rows={3} placeholder="Deskripsi..." value={fvDesc} onChange={e => setFvDesc(e.target.value)} />
              </div>
              <button type="submit" className="admin-submit">+ Tambah Proyek</button>
            </form>

            <div className="admin-list">
              <h3>Foto ({photos.length})</h3>
              <div className="admin-items">
                {photos.map(p => (
                  <div key={p.id} className="admin-item">
                    <img src={p.src} alt={p.title} />
                    <div><strong>{p.title}</strong><span>{p.category}</span></div>
                    <button onClick={() => setPhotos(photos.filter(x => x.id !== p.id))}>Hapus</button>
                  </div>
                ))}
              </div>
              <h3>Video ({videos.length})</h3>
              <div className="admin-items">
                {videos.map(v => (
                  <div key={v.id} className="admin-item">
                    <img src={v.thumbnail} alt={v.title} />
                    <div><strong>{v.title}</strong><span>{v.category} ({v.duration})</span></div>
                    <button onClick={() => setVideos(videos.filter(x => x.id !== v.id))}>Hapus</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── DESAIN & CONTENT ── */}
        {activeTab === 'desain' && (
          <div className="admin-section">
            <form onSubmit={handleDSubmit} className="admin-form">
              <div className="admin-form-group">
                <label>Judul</label>
                <input type="text" required placeholder="Judul proyek..." value={dTitle} onChange={e => setDTitle(e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Kategori</label>
                <select value={dCat} onChange={e => setDCat(e.target.value)}>
                  {dCats.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label>Gambar (file / URL)</label>
                <input type="file" accept="image/*" onChange={handleDFile} />
                <input type="text" placeholder="Atau URL gambar..." value={dImg} onChange={e => setDImg(e.target.value)} style={{ marginTop: 8 }} />
                {dImg && <img src={dImg} alt="preview" className="admin-preview" />}
              </div>
              <div className="admin-form-group">
                <label>Deskripsi</label>
                <textarea rows={3} placeholder="Deskripsi..." value={dDesc} onChange={e => setDDesc(e.target.value)} />
              </div>
              <button type="submit" className="admin-submit">+ Tambah Proyek</button>
            </form>

            <div className="admin-list">
              <h3>Desain & Content ({designs.length})</h3>
              <div className="admin-items">
                {designs.map(d => (
                  <div key={d.id} className="admin-item">
                    <img src={d.img} alt={d.title} />
                    <div><strong>{d.title}</strong><span>{d.cat}</span></div>
                    <button onClick={() => setDesigns(designs.filter(x => x.id !== d.id))}>Hapus</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── WEBSITE ── */}
        {activeTab === 'website' && (
          <div className="admin-section">
            <form onSubmit={handleWSubmit} className="admin-form">
              <div className="admin-form-group">
                <label>Judul</label>
                <input type="text" required placeholder="Judul proyek..." value={wTitle} onChange={e => setWTitle(e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Kategori</label>
                <select value={wCat} onChange={e => setWCat(e.target.value)}>
                  {wCats.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label>Gambar (file / URL)</label>
                <input type="file" accept="image/*" onChange={handleWFile} />
                <input type="text" placeholder="Atau URL gambar..." value={wImg} onChange={e => setWImg(e.target.value)} style={{ marginTop: 8 }} />
                {wImg && <img src={wImg} alt="preview" className="admin-preview" />}
              </div>
              <div className="admin-form-group">
                <label>Deskripsi</label>
                <textarea rows={3} placeholder="Deskripsi..." value={wDesc} onChange={e => setWDesc(e.target.value)} />
              </div>
              <button type="submit" className="admin-submit">+ Tambah Proyek</button>
            </form>

            <div className="admin-list">
              <h3>Website ({websites.length})</h3>
              <div className="admin-items">
                {websites.map(w => (
                  <div key={w.id} className="admin-item">
                    <img src={w.img} alt={w.title} />
                    <div><strong>{w.title}</strong><span>{w.cat}</span></div>
                    <button onClick={() => setWebsites(websites.filter(x => x.id !== w.id))}>Hapus</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
