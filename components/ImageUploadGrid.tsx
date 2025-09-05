import React, { useState, useRef } from 'react';

const ImageUploadGrid: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSlotClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset file input to allow uploading the same file again
    if (event.target) {
        event.target.value = '';
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto my-8 px-4 sm:px-0">
      <div className="flex flex-col gap-4">
        <button
          onClick={handleSlotClick}
          className="relative w-full aspect-[16/7] rounded-lg flex items-center justify-center text-white font-bold text-5xl overflow-hidden transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500 bg-[#ff0000]"
          aria-label="Upload image"
        >
          {image ? (
            <img src={image} alt="Uploaded content" className="w-full h-full object-cover" />
          ) : (
            <span style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
              IMG 1
            </span>
          )}
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadGrid;
