'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, youtubeUrl, description }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('✅ Video added successfully!');
      setTitle('');
      setYoutubeUrl('');
      setDescription('');
    } else {
      setMessage('❌ Error: ' + data.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-emerald-800">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Add new Islamic videos to Jariat.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
            <input 
              type="text" 
              required
              className="w-full border border-gray-300 rounded-lg p-2" 
              placeholder="e.g. Learn Surah Al-Fatihah"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
            <input 
              type="url" 
              required
              className="w-full border border-gray-300 rounded-lg p-2" 
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg p-2" 
              rows={3}
              placeholder="Brief description of the video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? 'Adding Video...' : 'Add Video to Jariat'}
          </button>

          {message && (
            <p className={`text-center mt-4 ${message.includes('✅') ? 'text-emerald-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}