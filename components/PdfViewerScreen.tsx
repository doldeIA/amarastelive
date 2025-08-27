import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { loadPdfFromDb, savePdfToDb } from '../App';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerScreenProps {
  pageKey: string;
  fallbackPath?: string;
  preloadedFileUrl?: string | null;
  onPage1Rendered?: () => void;
  noPadding?: boolean;
}

const PdfViewerScreen: React.FC<PdfViewerScreenProps> = ({ pageKey, fallbackPath, preloadedFileUrl, onPage1Rendered, noPadding = false }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State and ref for lazy loading
  const [visiblePages, setVisiblePages] = useState<Set<number>>(new Set([1]));
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);


  useEffect(() => {
    const handleResize = () => setPageWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let objectUrl: string | null = null;
    
    if (preloadedFileUrl) {
      setFileUrl(preloadedFileUrl);
      setIsLoading(false);
      return;
    }

    const loadPdf = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let pdfBlob = await loadPdfFromDb(pageKey);

        if (!pdfBlob && fallbackPath) {
          const response = await fetch(fallbackPath);
          if (!response.ok) throw new Error(`O arquivo PDF principal não foi encontrado.`);
          pdfBlob = await response.blob();
          const file = new File([pdfBlob], `${pageKey}.pdf`, { type: "application/pdf" });
          await savePdfToDb(file, pageKey);
        }

        if (pdfBlob) {
          objectUrl = URL.createObjectURL(pdfBlob);
          setFileUrl(objectUrl);
        } else {
           setError(`Nenhum conteúdo foi configurado para esta página. Faça o upload de um PDF no Painel Admin.`);
        }
      } catch (e: any) {
        console.error(`Error loading PDF for pageKey "${pageKey}":`, e);
        setError(e.message || 'Não foi possível carregar o conteúdo.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPdf();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [pageKey, fallbackPath, preloadedFileUrl]);

  // IntersectionObserver for lazy loading pages
  useEffect(() => {
    if (numPages === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNum = parseInt(entry.target.getAttribute('data-page-number') || '0', 10);
            if (pageNum) {
              setVisiblePages((prevVisiblePages) => {
                if (prevVisiblePages.has(pageNum)) return prevVisiblePages;
                const newVisiblePages = new Set(prevVisiblePages);
                newVisiblePages.add(pageNum);
                return newVisiblePages;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '250px 0px', // Pre-load pages that are 250px away from the viewport
      }
    );

    pageRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [numPages]);


  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setVisiblePages(new Set([1])); // Always show page 1 first
    pageRefs.current = Array.from({ length: numPages }, () => null); // Re-initialize refs array
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 pt-24">
        <p className="text-white text-xl animate-pulse">Carregando conteúdo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 pt-24 text-center">
        <p className="text-accent font-bold">{error}</p>
      </div>
    );
  }
  
  if (!fileUrl) {
    // This case should ideally be covered by the error state, but it's a good fallback.
    return (
       <div className="flex min-h-screen items-center justify-center p-4 pt-24 text-center">
        <p className="text-accent font-bold">Conteúdo não encontrado.</p>
      </div>
    );
  }

  // A responsive width calculation that provides fluid margins and a max-width for readability.
  // It ensures a total horizontal margin of at least 24px, or 10% of the viewport width, whichever is larger.
  // The content width is capped at 1024px on very wide screens.
  const totalMargin = Math.max(pageWidth * 0.1, 24);
  const calculatedPageWidth = Math.min(pageWidth - totalMargin, 1024);
    
  // Using a standard A4 aspect ratio for placeholder height
  const placeholderHeight = calculatedPageWidth * 1.414;

  return (
    <div className={`w-full min-h-full ${noPadding ? '' : 'pt-24 pb-0'} flex flex-col items-center`}>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="flex flex-col items-center"
        loading={null} // We handle loading state above
        error={null} // We handle error state above
      >
        {Array.from(new Array(numPages), (_el, index) => {
          const pageNumber = index + 1;
          const isVisible = visiblePages.has(pageNumber);

          return (
            <div
              key={`page_container_${pageNumber}`}
              // FIX: Changed ref callback to use a block body to ensure a void return type.
              ref={(el) => { pageRefs.current[index] = el; }}
              data-page-number={pageNumber}
              style={{ minHeight: isVisible ? 'auto' : `${placeholderHeight}px` }}
            >
              {isVisible ? (
                <Page
                  key={`page_${pageNumber}`}
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-2xl shadow-accent/10"
                  width={calculatedPageWidth}
                  onRenderSuccess={index === 0 ? onPage1Rendered : undefined}
                />
              ) : (
                <div 
                  className="bg-black/20 rounded-md animate-pulse"
                  style={{ 
                    height: `${placeholderHeight}px`,
                    width: `${calculatedPageWidth}px`,
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </Document>
    </div>
  );
};

export default PdfViewerScreen;