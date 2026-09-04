import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomeFeed } from './pages/HomeFeed';
import { SubmitReleaseForm } from './components/SubmitReleaseForm';
import { GigTracker } from './pages/GigTracker';
import { AuthPage } from './pages/AuthPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ArticleDetail } from './pages/ArticleDetail';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Navbar } from './components/Navbar';
import { useApp } from './context/AppContext';
import { LogIn, LayoutDashboard, ShieldCheck } from 'lucide-react';

export const AppContent = () => {
  const { activeTab, setActiveTab, theme, user, setUser } = useApp();
  const [authMode, setAuthMode] = React.useState('login');
  const isAdmin = user?.role === 'admin';
  const isEditor = user?.role === 'editor';
  const canManageContent = isAdmin || isEditor;

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'radar':
        return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"><SubmitReleaseForm /></div>;
      case 'gigs':
        return <GigTracker />;
      case 'auth':
        return <AuthPage mode={authMode} onSuccess={(u) => { setUser(u); setActiveTab('home'); }} />;
      case 'admin':
        return canManageContent ? <AdminDashboard /> : (
          <div className="max-w-3xl mx-auto px-4 py-20 text-center">
            <ShieldCheck size={56} className="mx-auto text-brand-gold" />
            <h1 className="text-3xl font-extrabold text-white mt-5">Akses Admin Diperlukan</h1>
            <p className="text-gray-400 mt-3">Login memakai akun admin untuk membuka dashboard pengelolaan.</p>
            <button onClick={() => { setAuthMode('login'); setActiveTab('auth'); }} className="mt-6 bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3 rounded-xl">Login Admin</button>
          </div>
        );
      default:
        return <HomeFeed />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-gray-100">
      <AnnouncementBanner />
      <Navbar />
      <div className="bg-dark-bg/95 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
            Platform live · {user ? `Halo, ${user.name}` : 'Baca gratis tanpa login'}
          </div>
          <div className="flex items-center gap-2">
            {!user && <button onClick={() => { setAuthMode('login'); setActiveTab('auth'); }} className="inline-flex items-center gap-1 text-xs text-gray-300 hover:text-white"><LogIn size={14}/> Login / Register</button>}
            {isAdmin && <button onClick={() => setActiveTab('admin')} className="inline-flex items-center gap-1 text-xs text-brand-gold hover:text-white"><LayoutDashboard size={14}/> Admin</button>}
          </div>
        </div>
      </div>
      <main className="flex-1">
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/" element={renderTabContent()} />
          <Route path="*" element={renderTabContent()} />
        </Routes>
      </main>
      <footer className="bg-dark-surface border-t border-dark-border mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-gray-400">
          <span>© 2026 baypedia Hub · Etalase & Radar Musik Indonesia</span>
          <span>Empowering new artists, one release at a time.</span>
        </div>
      </footer>
    </div>
  );
};
