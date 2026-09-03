import React from 'react';
import { Flame, Play, Clock, Sparkles, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { FEATURED_ARTICLES, SUBMITTED_RELEASES, INDIE_RADAR_CHARTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { SubmitReleaseForm } from '../components/SubmitReleaseForm';

export const HomeFeed = () => {
  const { submittedBands, setActiveTab } = useApp();
  const heroArticle = FEATURED_ARTICLES[0];
  const sideArticles = FEATURED_ARTICLES.slice(1);
  const allReleases = [...submittedBands, ...SUBMITTED_RELEASES];

  return (
    <div className="space-y-12 py-8">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none transition-all group-hover:bg-brand-500/10" />
            <div className="relative z-10 space-y-3">
              <span className="bg-brand-500/10 text-brand-600 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                <Flame size={12} /> Highlight Editorial
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-serif">{heroArticle.title}</h1>
              <p className="text-gray-300 text-base leading-relaxed max-w-2xl">{heroArticle.excerpt}</p>
            </div>
            <div className="relative z-10 pt-6 mt-6 border-t border-dark-border/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm">RP</div>
                <div>
                  <div className="text-sm font-semibold text-white">{heroArticle.author}</div>
                  <div className="text-xs text-gray-400 font-mono">Senior Music Editor</div>
                </div>
              </div>
              <button onClick={() => setActiveTab('articles')} className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2">
                <span>Baca Artikel</span><ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-dark-border">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2"><TrendingUp size={16} className="text-brand-500" /> Trending</h3>
            </div>
            {sideArticles.map((art) => (
              <div key={art.id} onClick={() => setActiveTab('articles')} className="bg-dark-surface hover:bg-dark-card border border-dark-border rounded-xl p-4 cursor-pointer transition-all">
                <span className="text-[10px] font-bold text-brand-500 uppercase">{art.category}</span>
                <h4 className="text-sm font-semibold text-white mt-2">{art.title}</h4>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 font-mono">
                  <span>{art.date}</span><span>•</span><span>{art.readTime} baca</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band Radar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-dark-border">
          <div>
            <span className="text-xs font-bold text-brand-500 uppercase tracking-widest font-mono">Radar Rilis Indie Indonesia</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Band & Single Baru Yang Wajib Lo Dengerin</h2>
          </div>
          <button onClick={() => setActiveTab('radar')} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:text-brand-400">
            <ArrowRight size={14} /> Kirim Single Band-Mu
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {allReleases.map((rel) => (
            <div key={rel.id} className="bg-dark-card border border-dark-border hover:border-brand-500/40 rounded-2xl p-5 transition-all hover:-translate-y-1 flex flex-col">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-dark-surface">
                <img src={rel.cover} alt={rel.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-dark-bg/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">{rel.type}</span>
                <span className="absolute bottom-3 right-3 bg-brand-emerald text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow">{rel.status}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-2">
                <span className="text-brand-500 font-bold">{rel.origin}</span><span className="text-gray-500">•</span><span>{rel.genre}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-500">{rel.title}</h3>
              <p className="text-sm font-medium text-gray-300 mt-0.5">by {rel.bandName}</p>
              <p className="text-gray-400 text-xs mt-3 line-clamp-3">{rel.description}</p>
              <div className="pt-4 mt-4 border-t border-dark-border flex items-center justify-between text-xs mt-auto">
                <span className="text-gray-400 font-mono">{rel.releaseDate}</span>
                <div className="flex items-center gap-2">
                  {rel.spotifyUrl && <a href={rel.spotifyUrl} target="_blank" rel="noreferrer" className="text-brand-emerald hover:text-emerald-400 font-semibold">Spotify</a>}
                  {rel.youtubeUrl && <a href={rel.youtubeUrl} target="_blank" rel="noreferrer" className="text-red-500 hover:text-red-400 font-semibold">YouTube</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Indie Chart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dark-surface border border-dark-border rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-border">
            <div><span className="text-xs font-bold text-brand-500 uppercase tracking-widest font-mono">Chart Realtime</span><h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">Indie Weekly Top 8</h2></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {INDIE_RADAR_CHARTS.map((item) => (
              <div key={item.rank} className="bg-dark-card hover:bg-dark-hover border border-dark-border rounded-xl p-3 flex items-center justify-between transition-all">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs ${item.rank <= 3 ? 'bg-brand-500 text-white' : 'bg-dark-bg text-gray-400'}`}>#{item.rank}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.track}</h4>
                    <p className="text-xs text-gray-400">{item.band}</p>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="font-bold text-gray-200">{item.plays} streams</div>
                  <span className={item.trend === 'UP' ? 'text-brand-emerald' : item.trend === 'NEW' ? 'text-brand-500' : 'text-gray-400'}>{item.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <SubmitReleaseForm />
      </section>
    </div>
  );
};
