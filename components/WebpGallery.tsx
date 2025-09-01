/* WEBP GALLERY - ADDED BY STUDIO */
import React, { useState, useEffect } from 'react';

interface Image {
  webp: string;
  fallback?: string;
  alt: string;
}

interface WebpGalleryProps {
  images: Image[];
}

const WebpGallery: React.FC<WebpGalleryProps> = ({ images = [] }) => {
  const [lightboxImage, setLightboxImage] = useState<Image | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };

    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  if (!images || images.length === 0) {
    return (
      <section id="webp-gallery" className="webp-gallery" aria-label="Photo gallery">
        <div className="webp-card-placeholder">
          <p>Nenhuma imagem na galeria.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="webp-gallery" className="webp-gallery" aria-label="Photo gallery">
        <h2 className="sr-only">Gallery</h2>
        <div className="webp-grid">
          {images.map((img, i) => (
            <figure
              className="webp-card"
              key={i}
              onClick={() => setLightboxImage(img)}
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLightboxImage(img)}
              role="button"
              aria-label={`View ${img.alt} in lightbox`}
            >
              <picture>
                <source srcSet={img.webp} type="image/webp" />
                <img
                  src={img.fallback || img.webp}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="675"
                />
              </picture>
            </figure>
          ))}
        </div>
      </section>

      {lightboxImage && (
        <div
          className="webp-lightbox"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged image view"
        >
          <picture onClick={(e) => e.stopPropagation()}>
            <source srcSet={lightboxImage.webp} type="image/webp" />
            <img
              src={lightboxImage.fallback || lightboxImage.webp}
              alt={lightboxImage.alt}
            />
          </picture>
        </div>
      )}
    </>
  );
};

export default WebpGallery;