import React from 'react';
import { Megaphone, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const AnnouncementBanner = () => {
  const { activeAnnouncement, setActiveAnnouncement } = useApp();

  if (!activeAnnouncement) return null;

  const current = ANNOUNCEMENTS[0];

  return (
    <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-accent text-white py-2.5 px-4 shadow-lg relative z-50 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center space-x-3 overflow-hidden">
          <span className="bg-white/20 text-white font-bold px-2.5 py-0.5 rounded-full text-xs flex items-center gap-1 shrink-0 uppercase tracking-wider animate-pulse">
            <Megaphone size={12} /> {current.badge}
          </span>
          <p className="truncate font-medium">
            <span className="font-bold">{current.title}</span> — {current.content}
          </p>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          <a
            href={current.link}
            className="hidden sm:inline-flex items-center space-x-1 font-semibold underline underline-offset-4 hover:text-gray-200 transition-colors"
          >
            <span>Kirim Rilisan Musikmu</span>
            <ExternalLink size={13} />
          </a>
          <button
            onClick={() => setActiveAnnouncement(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            title="Tutup pengumuman"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
