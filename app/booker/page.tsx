import React from "react";

export default function BookerPage() {
  return (
    <div className="min-h-screen relative">
      {/* PDF Background */}
      <div className="fixed inset-0 z-0">
        <embed 
          src="/home2.pdf" 
          type="application/pdf"
          className="w-full h-full"
          title="Booker PDF Background"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen p-8 bg-black bg-opacity-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-white">Booker Page</h1>
          <p className="mb-6 text-gray-200">This is the Booker page</p>
        </div>
      </div>
    </div>
  );
}
