import React, { useState } from 'react';
import { 
  Music, 
  Menu, 
  X, 
  Search, 
  LayoutDashboard, 
  Disc, 
  Calendar, 
  FileText, 
  KeyRound, 
  Moon, 
  Sun,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    darkMode, 
    setDarkMode, 
    user, 
    logout 
  } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: <Music size={18} /> },
    { id: 'articles', label: 'Editorial', icon: <FileText size={18} /> },
    { id: 'radar', label: 'Band Radar', icon: <Disc size={18} /> },
    { id: 'events', label: 'Gig Tracker', icon: <Calendar size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-brand-500/30 group-hover:border-brand-500 transition-all">
              <img 
                src="/logo.png" 
                alt="BAYPEDIA Logo" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=BAYPEDIA&background=d4b5a0&color=000'; }}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold tracking-tighter text-white font-serif">BAYPEDIA</span>
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Music Hub</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'bg-brand-500/10 text-brand-500' 
                    : 'text-gray-400 hover:text-white hover:bg-dark-hover'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-dark-hover transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="h-6 w-[1px] bg-dark-border mx-1 hidden sm:block"></div>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-dark-surface border border-dark-border hover:border-brand-500/50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-white hidden sm:block">{user.name}</span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-dark-card border border-dark-border rounded-2xl shadow-2xl overflow-hidden py-1 z-50">
                    <div className="px-4 py-3 border-b border-dark-border mb-1">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Account</p>
                      <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                    </div>
                    {(user.role === 'admin' || user.role === 'editor') && (
                      <button 
                        onClick={() => { setActiveTab('admin'); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-brand-500/10 hover:text-brand-500 transition-all"
                      >
                        <LayoutDashboard size={18} /> Dashboard Konten
                      </button>
                    )}
                    <button 
                      onClick={() => { logout(); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setActiveTab('auth')}
                className="bg-brand-500 hover:bg-brand-600 text-black font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-all shadow-lg shadow-brand-500/20 active:scale-95"
              >
                Join Baypedia
              </button>
            )}

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-card border-t border-dark-border px-4 py-6 space-y-3 animate-in slide-in-from-top duration-300">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-semibold ${
                activeTab === item.id 
                  ? 'bg-brand-500/10 text-brand-500' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-hover'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
