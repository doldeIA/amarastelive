import React, { useState, useEffect } from 'react';
import { loadAssetFromDb, saveAssetToDb } from '../App';

interface PdfViewerScreenProps {
  pageKey: string;
  fallbackPath?: string;
  preloadedFileUrl?: string | null;
  onPage1Rendered?: () => void;
  noPadding?: boolean;
}

const PdfViewerScreen: React.FC<PdfViewerScreenProps> = ({ pageKey, fallbackPath, preloadedFileUrl, onPage1Rendered, noPadding = false }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | null = null;
    
    const loadAsset = async () => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }
      try {
        let assetBlob = await loadAssetFromDb(pageKey);

        if (!assetBlob && fallbackPath) {
          const response = await fetch(fallbackPath);
          if (!response.ok) throw new Error(`O arquivo de imagem principal não foi encontrado.`);
          assetBlob = await response.blob();
          const file = new File([assetBlob], `${pageKey}.webp`, { type: "image/webp" });
          await saveAssetToDb(file, pageKey);
        }

        if (assetBlob) {
          objectUrl = URL.createObjectURL(assetBlob);
          if (isMounted) {
            setImageUrl(objectUrl);
          }
        } else {
           if (isMounted) {
             setError(`Nenhum conteúdo foi configurado para esta página. Faça o upload de uma imagem .webp no Painel Admin.`);
           }
        }
      } catch (e: any) {
        console.error(`Error loading asset for pageKey "${pageKey}":`, e);
        if (isMounted) {
          setError(e.message || 'Não foi possível carregar o conteúdo.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (preloadedFileUrl) {
      if (isMounted) {
        setImageUrl(preloadedFileUrl);
        setIsLoading(false);
      }
    } else {
      loadAsset();
    }

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [pageKey, fallbackPath, preloadedFileUrl]);
  
  const handleImageLoad = () => {
      if (onPage1Rendered) {
          onPage1Rendered();
      }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <p className="text-white text-xl animate-pulse">Carregando conteúdo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4 text-center">
        <p className="text-accent font-bold">{error}</p>
      </div>
    );
  }
  
  if (!imageUrl) {
    return (
       <div className="flex min-h-[50vh] items-center justify-center p-4 text-center">
        <p className="text-accent font-bold">Conteúdo não encontrado.</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${noPadding ? '' : 'pt-24 pb-0'} flex flex-col items-center`}>
      <img 
        src={imageUrl} 
        alt={`Conteúdo da página ${pageKey}`} 
        className="w-full h-auto object-contain max-w-[1024px] shadow-2xl shadow-accent/10"
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default PdfViewerScreen;