import React, { useState } from 'react';
import { Send, CheckCircle, Disc, MapPin, Link2, Sparkles, Music2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SubmitReleaseForm = () => {
  const { addBandRelease, apiKey } = useApp();
  const [formData, setFormData] = useState({
    bandName: '',
    origin: '',
    title: '',
    type: 'Single',
    genre: 'Indie Pop',
    spotifyUrl: '',
    youtubeUrl: '',
    description: '',
    cover: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.bandName || !formData.title) return;

    const newRel = addBandRelease({
      ...formData,
      cover: formData.cover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
    });

    setLastSubmission(newRel);
    setSubmitted(true);
    setFormData({
      bandName: '',
      origin: '',
      title: '',
      type: 'Single',
      genre: 'Indie Pop',
      spotifyUrl: '',
      youtubeUrl: '',
      description: '',
      cover: ''
    });
  };

  return (
    <div id="submit-release" className="bg-dark-surface border border-dark-border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-500/15 text-brand-500 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} /> Etalase Band Baru Indonesia
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kirim Karya Rilisan Band/Musisimu
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
            Bantu band barumu dilihat & didengar oleh ribuan pecinta musik, kurator playlist, dan penikmat gig indie di seluruh Indonesia.
          </p>
        </div>

        {submitted ? (
          <div className="bg-dark-card border border-brand-emerald/40 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-brand-emerald/20 text-brand-emerald rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-bold text-white">Rilisan Berhasil Didaftarkan!</h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto">
              Karya dari <strong className="text-brand-500">{lastSubmission?.bandName}</strong> — "{lastSubmission?.title}" sudah masuk ke sistem radar baypedia.
            </p>
            <div className="inline-block bg-dark-bg p-4 rounded-xl border border-dark-border text-xs font-mono text-left space-y-1">
              <div><span className="text-gray-400">ID Tracking:</span> {lastSubmission?.id}</div>
              <div><span className="text-gray-400">Status:</span> <span className="text-brand-gold font-bold">{lastSubmission?.status}</span></div>
              <div><span className="text-gray-400">System Key:</span> {apiKey}</div>
            </div>
            <div>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Submit Karya Lainnya
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Nama Band / Artist *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Marsmolys, Morbid Monke..."
                  value={formData.bandName}
                  onChange={(e) => setFormData({ ...formData, bandName: e.target.value })}
                  className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Asal Kota
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Misal: Bandung, Jakarta, Malang..."
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full bg-dark-card border border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-brand-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Judul Lagu / EP / Album *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Judul karya..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Tipe Rilisan
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white focus:border-brand-500 outline-none"
                >
                  <option value="Single">Single Terbaru</option>
                  <option value="EP / Mini Album">EP / Mini Album</option>
                  <option value="Full Album">Full Album</option>
                  <option value="Music Video">Music Video Premiere</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Genre Utama
                </label>
                <input
                  type="text"
                  placeholder="Misal: Emo Pop, Post-Rock..."
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white focus:border-brand-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Link Stream Spotify / Apple Music
                </label>
                <div className="relative">
                  <Link2 size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="url"
                    placeholder="https://open.spotify.com/track/..."
                    value={formData.spotifyUrl}
                    onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
                    className="w-full bg-dark-card border border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-brand-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Link YouTube / Lyric Video
                </label>
                <div className="relative">
                  <Link2 size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full bg-dark-card border border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-brand-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Press Release / Cerita di Balik Lagu
              </label>
              <textarea
                rows={4}
                placeholder="Ceritakan kisah pembuatan lagu, makna lirik, atau pesan yang ingin disampaikan..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-dark-card border border-dark-border rounded-xl p-4 text-sm text-white focus:border-brand-500 outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dark-border">
              <div className="flex items-center space-x-2 text-xs text-gray-400 font-mono">
                <ShieldCheck size={16} className="text-brand-emerald" />
                <span>Verified Gateway Active ({apiKey})</span>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-brand-600 to-brand-accent hover:opacity-95 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-xl shadow-brand-500/20 transition-all flex items-center space-x-2"
              >
                <Send size={16} />
                <span>Kirim Ke Editorial Radar</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
