import React, { useState, useRef, useEffect } from 'react';
import UploadIcon from './icons/UploadIcon';
import { applyClickAnimation } from '../animations';

const BookerScreen: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      // Revoke the old URL if it exists
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      const newUrl = URL.createObjectURL(file);
      setPdfUrl(newUrl);
      setFileName(file.name);
    } else {
      setPdfUrl(null);
      setFileName(null);
      if (file) { // Only alert if a file was selected but was not a PDF
        alert('Por favor, selecione um arquivo PDF.');
      }
    }
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
     applyClickAnimation(e);
     fileInputRef.current?.click();
  };

  // Cleanup object URL on component unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div className="bg-white min-h-screen pt-28 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1 className="text-3xl font-bold py-4 text-warm-brown" style={{ fontFamily: "'Playfair Display', serif" }}>
          Área do Booker
        </h1>

        <p className="text-warm-brown/80 mb-8 max-w-xl">
            Faça o upload de um arquivo PDF para visualizá-lo diretamente aqui.
        </p>

        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />

        <button
          onClick={handleUploadClick}
          className="w-full max-w-md text-center bg-gold text-deep-brown font-bold text-xl py-4 px-8 rounded-lg shadow-lg animate-gold-glow transition-transform hover:scale-105 active:scale-100 flex items-center justify-center gap-3"
          aria-label="Fazer upload de PDF"
        >
          <UploadIcon className="w-6 h-6" />
          Upload PDF
        </button>

        {fileName && (
            <p className="mt-4 text-gray-600">Arquivo selecionado: {fileName}</p>
        )}

        {pdfUrl && (
          <div className="mt-8 w-full max-w-4xl animate-swoop-in">
            <div className="bg-black p-2 rounded-lg neon-border-red">
               <iframe
                src={pdfUrl}
                title="PDF Preview"
                className="w-full h-[70vh] rounded"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookerScreen;
