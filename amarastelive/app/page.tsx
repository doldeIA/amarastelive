import React from "react";
import AIChat from "@/components/ai-chat";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Welcome to <strong className="text-blue-600">amarastelive</strong></h1>
        <p className="mb-6 text-gray-700">AI-powered application</p>
        <div className="mt-8">
          <AIChat />
        </div>
      </div>
    </main>
  );
}
