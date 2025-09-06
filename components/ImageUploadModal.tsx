
import React, { useState, useRef, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';
import { applyClickAnimation } from '../animations';
import UploadIcon from './icons/UploadIcon';
import { loadAssetFromDb } from '../db';

interface ImageUploadModalProps {
  onClose: () => void;
  onUpload: (file: File) => void;
}

const IMAGE_DB_KEY = 'home-image-upload-1';

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onClose, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      try {
        const imageBlob = await loadAssetFromDb(IMAGE_DB_KEY);
        if (imageBlob) {
          if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
          const newUrl = URL.createObjectURL(imageBlob);
          objectUrlRef.current = newUrl;
          setCurrentImage(newUrl);
        }
      } catch (error) {
        console.error("Failed to load image for modal:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadImage();
    
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleFile = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    } else {
      alert("Por favor, envie apenas arquivos de imagem.");
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0] || null);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] || null);
    if(e.target) e.target.value = '';
  };

  const onBoxClick = () => {
    fileInputRef.current?.click();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
         <div className="flex items-center justify-center h-full text-white/50" aria-busy="true">
            <svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
      );
    }
    if (currentImage) {
      return <img src={currentImage} alt="Preview" className="w-full h-full object-contain" />;
    }
    return (
      <div className="text-center text-white/60 flex flex-col items-center justify-center gap-4">
        <UploadIcon className="w-16 h-16" />
        <p className="font-semibold text-lg">Clique ou arraste uma imagem</p>
        <p className="text-sm">A imagem será salva no seu dispositivo</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md" aria-modal="true" role="dialog">
      <div className="cyber-chat-frame w-[90%] max-w-lg h-[80vh] max-h-[700px] md:max-w-2xl md:h-[85vh] md:max-h-[850px] rounded-sm shadow-2xl animate-swoop-in overflow-hidden">
        <div className="cyber-frame-corner top-left"></div>
        <div className="cyber-frame-corner top-right"></div>
        <div className="cyber-frame-corner bottom-left"></div>
        <div className="cyber-frame-corner bottom-right"></div>

        <div className="flex flex-col h-full bg-black/50">
          <header className="flex-shrink-0 cyber-header">
            <div className="cyber-header-content relative pt-4 pb-4">
              <h1 className="text-3xl font-bold text-white logo-iamaraste" style={{ animation: 'none', opacity: 1, textShadow: '0 0 8px #fff' }}>
                UPLOAD
              </h1>
              <button
                onClick={(e) => { applyClickAnimation(e); onClose(); }}
                className="absolute top-1/2 -translate-y-1/2 right-4 text-white/70 rounded-full p-2 transition-all hover:bg-white/10 hover:text-white z-10"
                aria-label="Close uploader"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="w-full h-px bg-white/50 flowing-neon-line" style={{'--bubble-red': '#fff'} as React.CSSProperties}></div>
          </header>

          <div className="flex-1 p-4">
            <div
              onClick={onBoxClick}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`w-full h-full p-4 rounded-sm border-2 border-dashed transition-all duration-300 cursor-pointer flex items-center justify-center
              ${isDragging ? 'border-red-500 bg-red-500/20 scale-105' : 'border-red-500/50 hover:border-red-500 hover:bg-red-500/10'}`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept="image/*"
                className="hidden"
              />
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
