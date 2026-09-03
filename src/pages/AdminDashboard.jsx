import React, { useEffect, useState } from 'react';
import { LayoutDashboard, FilePenLine, Users, MessageSquare, Radio, Plus, RefreshCw } from 'lucide-react';
import { contentApi } from '../services/api';

export const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: '', category: 'Music News', author: 'Admin baypedia', excerpt: '', featured: false });
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const [stats, list] = await Promise.all([contentApi.overview(), contentApi.articles()]);
      setOverview(stats); setArticles(list);
    } catch (e) { setMessage(`Backend belum bisa diakses: ${e.message}`); }
  };
  useEffect(() => { load(); }, []);
  const submit = async (e) => {
    e.preventDefault();
    try { await contentApi.createArticle(form); setForm({ title: '', category: 'Music News', author: 'Admin baypedia', excerpt: '', featured: false }); setMessage('Artikel berhasil dipublikasikan.'); load(); }
    catch (e) { setMessage(e.message); }
  };
  const stats = [
    ['Artikel', overview?.articles ?? '—', FilePenLine, 'text-brand-500'],
    ['Pengguna', overview?.users ?? '—', Users, 'text-emerald-400'],
    ['Komentar', overview?.comments ?? '—', MessageSquare, 'text-amber-400'],
    ['Rilisan Masuk', overview?.releases ?? '—', Radio, 'text-pink-400']
  ];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    <header><span className="text-xs font-mono text-brand-500 uppercase tracking-widest">ADMIN ONLY / CONTROL CENTER</span><h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">baypedia Admin Dashboard</h1><p className="text-sm text-gray-400 mt-2">Pantau konten, pengguna, komentar, serta kiriman rilisan band baru dalam satu panel.</p></header>
    {message && <div className="text-xs border border-dark-border bg-dark-surface rounded-xl p-3 text-gray-300">{message}</div>}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{stats.map(([label, value, Icon, color])=><div key={label} className="bg-dark-surface border border-dark-border rounded-2xl p-5"><Icon className={color} size={20}/><div className="text-3xl font-extrabold text-white mt-4">{value}</div><div className="text-xs text-gray-400 mt-1">{label}</div></div>)}</div>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <section className="lg:col-span-3 bg-dark-surface border border-dark-border rounded-2xl p-6"><div className="flex items-center justify-between mb-5"><h2 className="font-bold text-white flex gap-2"><Plus size={18} className="text-brand-500"/> Publikasi Artikel Baru</h2></div><form onSubmit={submit} className="space-y-4"><input required placeholder="Judul artikel" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><div className="grid sm:grid-cols-2 gap-4"><input placeholder="Kategori" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/><input placeholder="Penulis" value={form.author} onChange={e=>setForm({...form,author:e.target.value})}/></div><textarea required rows="5" placeholder="Ringkasan artikel..." value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})}/><label className="text-xs text-gray-400 flex gap-2"><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/> Jadikan featured article</label><button className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-3 rounded-xl font-bold text-sm">Publikasikan Artikel</button></form></section>
      <section className="lg:col-span-2 bg-dark-surface border border-dark-border rounded-2xl p-6"><div className="flex justify-between items-center mb-5"><h2 className="font-bold text-white">Artikel Terbaru</h2><button onClick={load} className="text-gray-400 hover:text-white"><RefreshCw size={16}/></button></div><div className="space-y-3">{articles.slice(0,6).map(a=><div key={a.id} className="bg-dark-card border border-dark-border rounded-xl p-3"><span className="text-[10px] text-brand-500 uppercase font-bold">{a.category}</span><h3 className="text-sm text-white font-semibold mt-1">{a.title}</h3><p className="text-[11px] text-gray-400 mt-1">{a.author} · {a.status}</p></div>)}</div></section>
    </div>
  </div>;
};
