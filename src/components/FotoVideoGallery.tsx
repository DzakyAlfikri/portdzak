import { useState, useEffect } from 'react'
import './FotoVideoGallery.css'
import { getProjects } from '../firebase/services'

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

export default function FotoVideoGallery() {
  const [activeTab, setActiveTab] = useState<SubMenu>('foto')
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua')

  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])

  useEffect(() => {
    getProjects().then(data => {
      if (!data) return
      if (data.photos) setPhotos(data.photos)
      if (data.videos) setVideos(data.videos)
    }).catch(() => {})
  }, [])

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
