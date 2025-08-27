import React from "react";
import AIChat from "../components/ai-chat";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* PDF Background using object tag */}
      <div className="fixed inset-0 z-0">
        <object 
          data="/home.pdf" 
          type="application/pdf"
          className="w-full h-full"
          title="Home PDF Background"
        >
          <div className="w-full h-full bg-black"></div>
        </object>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen p-8 bg-black bg-opacity-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-white">Welcome to <strong className="text-blue-300">amarastelive</strong></h1>
          <p className="mb-6 text-gray-200">AI-powered application</p>
          <div className="mt-8">
            <AIChat />
          </div>
        </div>
      </div>
    </div>
  );
}
