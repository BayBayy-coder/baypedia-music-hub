import React from 'react';
import { Radio, Calendar, MapPin, Ticket, Flame, ExternalLink, Camera } from 'lucide-react';

export const GigTracker = () => {
  const events = [
    {
      id: 'g-1',
      title: 'Arkipela Fest 2026',
      subtitle: 'BandSAT! Hidupkan Atmosfer New Wave di Panggung Utama',
      location: 'Bandung, Indonesia',
      venue: 'Gedung Olahraga Pajadjaran',
      date: '15 Sep 2026',
      time: '16:00 WIB',
      category: 'GIG REVIEW & FESTIVAL',
      lineup: ['BandSAT!', 'Morbid Monke', 'Ikatan Keluarga Midwest', 'Marsmolys'],
      status: 'SELLING FAST',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g-2',
      title: 'Main-Main Di Cipete Vol. 22',
      subtitle: 'Showcase Musik, Intimasi & Eksperimen Band Muda Jakarta',
      location: 'Jakarta Selatan',
      venue: 'Taman Cipete Raya',
      date: '20 Sep 2026',
      time: '19:00 WIB',
      category: 'SHOWCASE & RADAR',
      lineup: ['Meha', 'Daniel Abraham', 'Kidunghara', 'Batas Senja'],
      status: 'FREE ADMISSION',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'g-3',
      title: '16TH ROCK IN CELEBES IKLIM FEST 2026',
      subtitle: 'Satukan Musik, Budaya, dan Gerakan Iklim Indonesia',
      location: 'Makassar, Sulawesi Selatan',
      venue: 'Amfiteater Danau Tanjung Bunga',
      date: '04-05 Oct 2026',
      time: '14:00 WITA',
      category: 'MAIN FESTIVAL',
      lineup: ['For Revenge', 'Hindia', 'Stepforward', 'The Post-Naissance'],
      status: 'PRESALE 2',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-dark-border pb-6">
        <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono">
          AGENDA & LIPUTAN LIVE GIGSPLAY
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
          Gig & Festival Tracker 2026
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-2xl">
          Jadwal gig lokal, liputan konser intim, photo report, dan agenda festival tanah air untuk mendukung pergerakan musik independen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {events.map((ev) => (
          <div key={ev.id} className="bg-dark-surface border border-dark-border rounded-3xl overflow-hidden flex flex-col justify-between hover:border-brand-500 transition-all duration-300 shadow-xl group">
            <div>
              <div className="relative aspect-video bg-dark-card overflow-hidden">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-dark-bg/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {ev.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-brand-gold text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  {ev.status}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1 text-brand-500 font-bold"><Calendar size={14} /> {ev.date}</span>
                  <span>•</span>
                  <span>{ev.time}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white group-hover:text-brand-500 transition-colors">
                  {ev.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed font-medium">
                  {ev.subtitle}
                </p>

                <div className="pt-3 border-t border-dark-border space-y-2 text-xs">
                  <div className="flex items-center text-gray-300 font-semibold gap-1.5">
                    <MapPin size={14} className="text-brand-accent shrink-0" />
                    <span>{ev.venue}, {ev.location}</span>
                  </div>

                  <div className="text-gray-400">
                    <span className="font-bold text-gray-200">Lineup:</span> {ev.lineup.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2">
                <Ticket size={15} />
                <span>Info Tiket & RSVP Gig</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
