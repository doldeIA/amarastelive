
import React, { useState } from 'react';
import CloseIcon from './icons/CloseIcon';

interface AdminDashboardProps {
  onClose: () => void;
}

const MOCKED_USERS = [
  { id: '1', name: 'User One', email: 'user1@example.com', createdAt: '2024-08-27T10:00:00Z' },
  { id: '2', name: 'User Two', email: 'user2@example.com', createdAt: '2024-08-27T11:30:00Z' },
  { id: '3', name: 'User Three', email: 'user3@example.com', createdAt: '2024-08-27T12:15:00Z' },
];

const MOCKED_CHAT_LOGS = [
  { user: 'user123', message: 'Hello Amarasté!', timestamp: '2024-08-27T14:00:10Z' },
  { assistant: 'Amarasté', message: 'Boa tarde! Sobre o que você gostaria de falar hoje?', timestamp: '2024-08-27T14:00:15Z' },
  { user: 'user456', message: 'Qual o significado de Amarasté?', timestamp: '2024-08-27T14:02:30Z' },
  { assistant: 'Amarasté', message: '🌹 Só tem você', timestamp: '2024-08-27T14:02:35Z' },
];

const UploadSection: React.FC<{ title: string, acceptedFiles: string }> = ({ title, acceptedFiles }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleUpload = () => {
    if (!file) return;
    setStatus('Uploading...');
    setTimeout(() => {
      setStatus(`Success! ${file.name} uploaded.`);
      setFile(null);
    }, 1500);
  };

  return (
    <div className="admin-section">
      <h3>{title}</h3>
      <input 
        type="file" 
        accept={acceptedFiles} 
        onChange={e => {
            setFile(e.target.files ? e.target.files[0] : null);
            setStatus('');
        }} 
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 mb-2"
      />
      {file && <p className="text-sm text-gray-300">Selected: {file.name}</p>}
      <button onClick={handleUpload} disabled={!file} className="mt-2 px-4 py-2 bg-red-600 rounded disabled:opacity-50 hover:bg-red-500 transition-colors">
        Upload
      </button>
      {status && <p className="text-sm mt-2 text-green-400">{status}</p>}
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" aria-modal="true" role="dialog">
      <div className="admin-dashboard relative flex flex-col w-[90%] max-w-4xl h-[90vh] rounded-lg shadow-2xl animate-swoop-in">
        <header className="admin-dashboard-header flex items-center justify-between p-4 flex-shrink-0">
          <h2 className="text-xl font-bold" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            Admin Dashboard
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <UploadSection title="Upload Image" acceptedFiles="image/*" />
          <UploadSection title="Upload PDF" acceptedFiles="application/pdf" />

          <div className="admin-section">
            <h3>User Registrations</h3>
            <div className="db-display custom-scrollbar">
              {JSON.stringify(MOCKED_USERS, null, 2)}
            </div>
            <p className="text-xs text-gray-400 mt-2">This is a view of the user registration database.</p>
          </div>

          <div className="admin-section">
            <h3>AI Chat Conversations (Live)</h3>
            <div className="db-display custom-scrollbar">
               {JSON.stringify(MOCKED_CHAT_LOGS, null, 2)}
            </div>
             <p className="text-xs text-gray-400 mt-2">This is a real-time feed of AI conversations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;