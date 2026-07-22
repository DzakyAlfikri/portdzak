import { useState, useEffect } from 'react'
import './FotoVideoGallery.css'

// Import local assets
import ccImg from '../assets/cc.JPG'
import laptopImg from '../assets/laptop.JPG'
import vlogImg from '../assets/vlog.JPG'
import exp1 from '../assets/exp/exp1.jpg'
import exp2 from '../assets/exp/exp2.jpg'
import exp3 from '../assets/exp/exp3.jpg'
import exp4 from '../assets/exp/exp4.jpg'
import exp5 from '../assets/exp/exp5.jpg'
import exp6 from '../assets/exp/exp6.jpg'
import dummyDokumentasi from '../assets/dummy_dokumentasi.png'

export type SubMenu = 'foto' | 'video'

export interface PhotoItem {
  id: string
  title: string
  category: string
  src: string
  date?: string
  description?: string
  aspect?: 'tall' | 'square' | 'wide' | 'portrait'
}

export interface VideoItem {
  id: string
  title: string
  category: string
  duration: string
  thumbnail: string
  videoUrl: string
  description?: string
}

const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 'p1',
    title: 'Stage & Musical Performance',
    category: 'Dokumentasi',
    src: ccImg,
    date: '2025',
    description: 'Dokumentasi penampilan panggung live concert dengan lighting dramatis dan atmosfer energik.',
    aspect: 'tall',
  },
  {
    id: 'p2',
    title: 'Workspace & Creative Setup',
    category: 'Lifestyle',
    src: laptopImg,
    date: '2025',
    description: 'Eksplorasi estetika ruang kerja dan setup produksi digital.',
    aspect: 'wide',
  },
  {
    id: 'p3',
    title: 'Behind The Scene Vlog',
    category: 'Event',
    src: vlogImg,
    date: '2024',
    description: 'Momen spontan dibalik layar saat pengambilan video dokumentasi organisasi.',
    aspect: 'portrait',
  },
  {
    id: 'p4',
    title: 'Campus Life & Moments',
    category: 'Dokumentasi',
    src: exp1,
    date: '2024',
    description: 'Sorotan kegiatan akademik dan event mahasiswa Universitas Jenderal Soedirman.',
    aspect: 'square',
  },
  {
    id: 'p5',
    title: 'Urban Architecture & Lines',
    category: 'Street',
    src: exp2,
    date: '2024',
    description: 'Komposisi geometris dan arsitektur kota dengan tone warna monokrom bermakna.',
    aspect: 'tall',
  },
  {
    id: 'p6',
    title: 'Human Expression & Stage Light',
    category: 'Portrait',
    src: exp3,
    date: '2024',
    description: 'Potret ekspresif pengisi acara dalam sorotan lampu panggung.',
    aspect: 'portrait',
  },
  {
    id: 'p7',
    title: 'Crowd & Energy Coverage',
    category: 'Event',
    src: exp4,
    date: '2024',
    description: 'Antusiasme audiens dalam festival musik dan pertunjukan seni.',
    aspect: 'wide',
  },
  {
    id: 'p8',
    title: 'Artistic Lighting & Shadows',
    category: 'Portrait',
    src: exp5,
    date: '2023',
    description: 'Permainan pencahayaan low-key dan kontras shadow visual.',
    aspect: 'tall',
  },
  {
    id: 'p9',
    title: 'Event Highlight & Awarding',
    category: 'Dokumentasi',
    src: exp6,
    date: '2023',
    description: 'Momen pengabdian dan serah terima dalam organisasi mahasiswa.',
    aspect: 'square',
  },
  {
    id: 'p10',
    title: 'Official Media & Press Coverage',
    category: 'Dokumentasi',
    src: dummyDokumentasi,
    date: '2024',
    description: 'Dokumentasi resmi liputan kegiatan seminar nasional dan workshop.',
    aspect: 'wide',
  },
  {
    id: 'p11',
    title: 'Golden Hour Silhouette',
    category: 'Nature',
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    date: '2024',
    description: 'Siluet senja menawan dengan pencahayaan alami di ruang terbuka.',
    aspect: 'tall',
  },
  {
    id: 'p12',
    title: 'Neon Nights & Atmosphere',
    category: 'Street',
    src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    date: '2024',
    description: 'Nuansa warna neon malam hari dengan estetika sinematik modern.',
    aspect: 'portrait',
  },
]

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'Company & Event Aftermovie 2024',
    category: 'Aftermovie',
    duration: '02:45',
    thumbnail: vlogImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Cinematic aftermovie yang merangkum keseruan dan dinamika acara festival dari awal hingga akhir.',
  },
  {
    id: 'v2',
    title: 'Short Cinematic Reel - Sound of Stage',
    category: 'Cinematic',
    duration: '00:58',
    thumbnail: ccImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Video reel vertical short-form yang dirancang khusus untuk Instagram Reels & TikTok.',
  },
  {
    id: 'v3',
    title: 'Product Commercial & Visual Teaser',
    category: 'Commercial',
    duration: '01:30',
    thumbnail: laptopImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Promotional video teaser dengan motion graphics dan transisi cepat yang memikat penonton.',
  },
  {
    id: 'v4',
    title: 'Documentary Short: Student Journey',
    category: 'Dokumenter',
    duration: '04:12',
    thumbnail: exp3,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'Kilas balik kisah perjalanan inspiratif mahasiswa dalam mencapai target organisasi.',
  },
  {
    id: 'v5',
    title: 'Music Festival Teaser 2024',
    category: 'Teaser',
    duration: '01:15',
    thumbnail: exp4,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    description: 'Video promosi pra-event berdurasi singkat dengan rhythm pacing yang menggugah semangat.',
  },
  {
    id: 'v6',
    title: 'Organization Annual Profile Video',
    category: 'Company Profile',
    duration: '03:20',
    thumbnail: exp6,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetBites.mp4',
    description: 'Video profil resmi organisasi yang memaparkan visi, misi, serta pencapaian utama.',
  },
]

export default function FotoVideoGallery() {
  const [activeTab, setActiveTab] = useState<SubMenu>('foto')
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua')

  // Dynamic Photos & Videos state backed by LocalStorage
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const saved = localStorage.getItem('jaki_portfolio_photos')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { console.error(e) }
    }
    return DEFAULT_PHOTOS
  })

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem('jaki_portfolio_videos')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { console.error(e) }
    }
    return DEFAULT_VIDEOS
  })

  useEffect(() => {
    localStorage.setItem('jaki_portfolio_photos', JSON.stringify(photos))
  }, [photos])

  useEffect(() => {
    localStorage.setItem('jaki_portfolio_videos', JSON.stringify(videos))
  }, [videos])

  // Lightbox / Modal States
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null)
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)

  // Categories filter
  const photoCategories = ['Semua', 'Dokumentasi', 'Portrait', 'Event', 'Street', 'Nature', 'Lifestyle']
  const videoCategories = ['Semua', 'Aftermovie', 'Cinematic', 'Commercial', 'Dokumenter', 'Teaser', 'Company Profile']

  const currentCategories = activeTab === 'foto' ? photoCategories : videoCategories

  const filteredPhotos = photos.filter(p => selectedCategory === 'Semua' || p.category === selectedCategory)
  const filteredVideos = videos.filter(v => selectedCategory === 'Semua' || v.category === selectedCategory)

  const handleTabChange = (tab: SubMenu) => {
    setActiveTab(tab)
    setSelectedCategory('Semua')
  }

  return (
    <div className="fv-gallery-container">
      {/* ── Sub-menu Navigation (Foto & Video) + Admin Manage Button ── */}
      <div className="fv-subnav-wrapper">
        <div className="fv-tabs-bar">
          <div className="fv-tabs-menu">
            <button
              className={`fv-tab-btn ${activeTab === 'foto' ? 'active' : ''}`}
              onClick={() => handleTabChange('foto')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Foto</span>
              <span className="fv-tab-badge">{photos.length}</span>
            </button>

            <button
              className={`fv-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => handleTabChange('video')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              <span>Video</span>
              <span className="fv-tab-badge">{videos.length}</span>
            </button>
          </div>

        </div>

        {/* Filter Tags */}
        <div className="fv-filter-tags">
          {currentCategories.map(cat => (
            <button
              key={cat}
              className={`fv-filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── FOTO GALLERY (Masonry Layout automatically filling empty space) ── */}
      {activeTab === 'foto' && (
        <div className="fv-masonry-grid">
          {filteredPhotos.map(photo => (
            <div
              key={photo.id}
              className={`fv-masonry-item ${photo.aspect || ''}`}
              onClick={() => setActivePhoto(photo)}
            >
              <div className="fv-photo-card">
                <img src={photo.src} alt={photo.title} loading="lazy" className="fv-photo-img" />
                <div className="fv-card-overlay">
                  <div className="fv-card-tags">
                    <span className="fv-card-tag">{photo.category}</span>
                    {photo.date && <span className="fv-card-date">{photo.date}</span>}
                  </div>
                  <h3 className="fv-card-title">{photo.title}</h3>
                  <div className="fv-card-action">
                    <span>Lihat Foto</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── VIDEO GALLERY (Grid with playable video thumbnails) ── */}
      {activeTab === 'video' && (
        <div className="fv-video-grid">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              className="fv-video-card"
              onClick={() => setActiveVideo(video)}
            >
              <div className="fv-video-thumb-wrap">
                <img src={video.thumbnail} alt={video.title} loading="lazy" className="fv-video-thumb" />
                <div className="fv-video-play-overlay">
                  <div className="fv-play-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
                <span className="fv-duration-badge">{video.duration}</span>
                <span className="fv-video-category">{video.category}</span>
              </div>
              <div className="fv-video-info">
                <h3 className="fv-video-title">{video.title}</h3>
                {video.description && <p className="fv-video-desc">{video.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── PHOTO LIGHTBOX MODAL ── */}
      {activePhoto && (
        <div className="fv-lightbox-backdrop" onClick={() => setActivePhoto(null)}>
          <div className="fv-lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="fv-lightbox-close" onClick={() => setActivePhoto(null)}>✕</button>
            <div className="fv-lightbox-image-wrap">
              <img src={activePhoto.src} alt={activePhoto.title} className="fv-lightbox-img" />
            </div>
            <div className="fv-lightbox-details">
              <div className="fv-lightbox-header">
                <span className="fv-card-tag">{activePhoto.category}</span>
                {activePhoto.date && <span className="fv-card-date">{activePhoto.date}</span>}
              </div>
              <h2 className="fv-lightbox-title">{activePhoto.title}</h2>
              {activePhoto.description && (
                <p className="fv-lightbox-desc">{activePhoto.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── VIDEO PLAYER MODAL ── */}
      {activeVideo && (
        <div className="fv-lightbox-backdrop" onClick={() => setActiveVideo(null)}>
          <div className="fv-lightbox-content video-modal" onClick={e => e.stopPropagation()}>
            <button className="fv-lightbox-close" onClick={() => setActiveVideo(null)}>✕</button>
            <div className="fv-video-player-wrap">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="fv-modal-video"
                poster={activeVideo.thumbnail}
              />
            </div>
            <div className="fv-lightbox-details">
              <div className="fv-lightbox-header">
                <span className="fv-card-tag">{activeVideo.category}</span>
                <span className="fv-duration-badge">{activeVideo.duration}</span>
              </div>
              <h2 className="fv-lightbox-title">{activeVideo.title}</h2>
              {activeVideo.description && (
                <p className="fv-lightbox-desc">{activeVideo.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
