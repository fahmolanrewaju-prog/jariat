'use client';

import { useState } from 'react';

export default function VideosPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

  // Sample Islamic videos (You can replace these URLs later)
  const videos = [
    { id: 1, title: "Learn Surah Al-Fatihah with Zaky", thumbnail: "https://img.youtube.com/vi/84I8OIi_w2k/hqdefault.jpg", url: "https://www.youtube.com/embed/84I8OIi_w2k" },
    { id: 2, title: "The Story of Prophet Musa (AS)", thumbnail: "https://img.youtube.com/vi/UAE5MpDm3uU/hqdefault.jpg", url: "https://www.youtube.com/embed/UAE5MpDm3uU" },
    { id: 3, title: "Nasheed for Kids - I Love Muhammad", thumbnail: "https://img.youtube.com/vi/teyS37X9W-c/hqdefault.jpg", url: "https://www.youtube.com/embed/teyS37X9W-c" },
    { id: 4, title: "How to Perform Wudu (Ablution)", thumbnail: "https://img.youtube.com/vi/KTg1qFpJcBs/hqdefault.jpg", url: "https://www.youtube.com/embed/KTg1qFpJcBs" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-sky-50 p-6 relative">
      
      {/* --- HEADER WITH SIGN UP BUTTON --- */}
      <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-emerald-100">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🕌</span>
          <h1 className="text-2xl font-bold text-emerald-800">Jariat</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAuth(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Sign Up / Log In
          </button>
          <button 
            onClick={() => setShowDonate(true)}
            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-lg text-sm font-medium transition border border-emerald-200"
          >
            ☕ Donate to Support
          </button>
        </div>
      </div>

      {/* --- AUTHENTICATION MODAL --- */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
            <button 
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-emerald-800">Welcome to Jariat</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full border border-gray-300 rounded-lg p-2" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button 
                type="button" 
                onClick={async () => {
                  if(!email || !password) {
                    alert("Please fill in both fields");
                    return;
                  }
                  const res = await fetch('/api/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                  });
                  if(res.ok) {
                    alert("Account created! You are now logged in.");
                    setShowAuth(false);
                  } else {
                    alert("Sign up failed. Try again.");
                  }
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition"
              >
                Sign Up / Log In
              </button>
            </form>
            <p className="text-center text-xs text-gray-500 mt-4">
              By signing up, you agree to our Terms of Service.
            </p>
          </div>
        </div>
      )}

      {/* --- DONATION MODAL --- */}
      {showDonate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
            <button 
              onClick={() => setShowDonate(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-emerald-800">Support Jariat 🤲</h2>
              <p className="text-gray-600 text-sm mb-6">
                Help us keep the platform running and bring more Islamic content to families. 
                Your support means the world to us!
              </p>
              
              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200 mb-4 text-left">
                <p className="text-sm font-semibold text-gray-700 mb-2">Bank Transfer Details</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Bank:</span> Jaiz Bank</p>
                  <p><span className="font-medium">Account Name:</span> Fahm Mubarak Olanrewaju</p>
                  <p><span className="font-medium">Account Number:</span> <span className="font-mono text-emerald-700 font-bold text-base">0002480725</span></p>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                After making the transfer, please send a screenshot to us via email for verification.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- VIDEO PLAYER --- */}
      {selectedVideo ? (
        <div className="mb-8 bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video relative">
          <iframe 
            width="100%" 
            height="100%" 
            src={selectedVideo} 
            title="Video Player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
          <button 
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg z-10"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="mb-8 bg-emerald-100/50 rounded-2xl p-8 text-center border border-emerald-200">
          <p className="text-emerald-700 text-lg font-medium">📖 Click on a video below to start learning!</p>
        </div>
      )}

      {/* --- VIDEO GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div 
            key={video.id} 
            onClick={() => setSelectedVideo(video.url)}
            className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-300"
          >
            <div className="relative aspect-video bg-gray-200">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg text-emerald-600">
                  ▶
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}