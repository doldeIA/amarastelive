

import React, { useState, useRef, useEffect } from 'react';
import { loadAssetFromDb } from '../db';

const IMAGE_DB_KEY = 'home-image-upload-1';
const FALLBACK_IMAGE_PATH = './@amarastelive-002.png';

interface ImageUploadGridProps {
  onOpenModal: () => void;
  uploadCount: number;
}

const ImageUploadGrid: React.FC<ImageUploadGridProps> = ({ onOpenModal, uploadCount }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      try {
        let imageBlob = await loadAssetFromDb(IMAGE_DB_KEY);

        // This fallback logic should ideally run only once if the DB is empty
        if (!imageBlob) {
          try {
            const response = await fetch(FALLBACK_IMAGE_PATH);
            if (response.ok) {
              imageBlob = await response.blob();
            } else {
              console.error('Fallback image not found:', response.statusText);
            }
          } catch (fetchError) {
            console.error('Error fetching fallback image:', fetchError);
          }
        }

        if (imageBlob) {
          if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
          }
          const newUrl = URL.createObjectURL(imageBlob);
          objectUrlRef.current = newUrl;
          setImage(newUrl);
        }
      } catch (error) {
        console.error("Failed to load image:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadImage();

    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [uploadCount]); // Re-run when uploadCount changes

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full" aria-busy="true">
          <svg className="animate-spin h-10 w-10 text-black/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      );
    }
    if (image) {
      return <img src={image} alt="Uploaded content" className="w-full h-full object-cover" />;
    }
    return (
      <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        IMG 1
      </span>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto my-8 px-4 sm:px-0">
      <div className="flex flex-col gap-4">
        <button
          onClick={onOpenModal}
          disabled={isLoading}
          className="relative w-full aspect-[4/3] rounded-lg flex items-center justify-center text-primary font-bold text-5xl overflow-hidden transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black focus:ring-primary bg-white disabled:cursor-wait"
          aria-label="Open image upload window"
        >
          {renderContent()}
        </button>
      </div>
    </div>
  );
};

export default ImageUploadGrid;