import React, { useEffect, useState } from 'react';
import { LayoutDashboard, FilePenLine, Users, MessageSquare, Radio, Plus, RefreshCw, Database, BadgeCheck } from 'lucide-react';
import { contentApi, api } from '../services/api';
import { useApp } from '../context/AppContext';

export const AdminDashboard = () => {
  const { user } = useApp();
  const [overview, setOverview] = useState(null);
  const [articles, setArticles] = useState([]);
  const [db, setDb] = useState(null);
  const [loadingDb, setLoadingDb] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'Music News',
    author: user?.name || 'Admin baypedia',
    excerpt: '',
    body: '',
    image: '',
    tags: '',
    featured: false
  });
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const [stats, list] = await Promise.all([contentApi.overview(), contentApi.articles()]);
      setOverview(stats);
      setArticles(list);
    } catch (e) {
      setMessage(`Backend belum bisa diakses: ${e.message}`);
    }
  };

  const loadDb = async () => {
    setLoadingDb(true);
    try {
      const data = await api('/admin/database');
      setDb(data);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setLoadingDb(false);
    }
  };

  useEffect(() => {
    load();
    if (user?.role === 'admin') loadDb();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await contentApi.createArticle({
        ...form,
        tags: form.tags.split(',').map(s => s.trim()).filter(Boolean)
      });
      setForm({
        title: '',
        category: 'Music News',
        author: user?.name || 'Admin baypedia',
        excerpt: '',
        body: '',
        image: '',
        tags: '',
        featured: false
      });
      setMessage('Artikel berhasil dipublikasikan.');
      load();
      if (user?.role === 'admin') loadDb();
    } catch (e) {
      setMessage(e.message);
    }
  };

  const stats = [
    ['Artikel', overview?.articles ?? '—', FilePenLine, 'text-brand-500'],
    ['Pengguna', overview?.users ?? '—', Users, 'text-emerald-400'],
    ['Komentar', overview?.comments ?? '—', MessageSquare, 'text-amber-400'],
    ['Rilisan Masuk', overview?.releases ?? '—', Radio, 'text-pink-400']
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header>
        <span className="text-xs font-mono text-brand-500 uppercase tracking-widest">ADMIN / EDITOR CONTROL CENTER</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">baypedia Admin Dashboard</h1>
        <p className="text-sm text-gray-400 mt-2">Pantau konten, pengguna, komentar, serta kiriman rilisan band baru dalam satu panel.</p>
      </header>

      {message && <div className="text-xs border border-dark-border bg-dark-surface rounded-xl p-3 text-gray-300">{message}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(([label, value, Icon, color]) => (
          <div key={label} className="bg-dark-surface border border-dark-border rounded-2xl p-5">
            <Icon className={color} size={20} />
            <div className="text-3xl font-extrabold text-white mt-4">{value}</div>
            <div className="text-xs text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <section className="lg:col-span-3 bg-dark-surface border border-dark-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-white flex gap-2"><Plus size={18} className="text-brand-500"/> Publikasi Artikel Baru</h2>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <BadgeCheck size={14} className="text-brand-emerald" />
              {user?.role}
            </div>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <input required placeholder="Judul artikel" value={form.title} onChange={e => setForm({...form,title:e.target.value})} className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-500" />
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Kategori" value={form.category} onChange={e => setForm({...form,category:e.target.value})} className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-500" />
              <input placeholder="Penulis" value={form.author} onChange={e => setForm({...form,author:e.target.value})} className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-500" />
            </div>
            <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form,image:e.target.value})} className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-500" />
            <textarea required rows="5" placeholder="Ringkasan artikel..." value={form.excerpt} onChange={e => setForm({...form,excerpt:e.target.value})} className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-500 resize-none" />
            <textarea rows="7" placeholder="Isi lengkap artikel..." value={form.body} onChange={e => setForm({...form,body:e.target.value})} className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-500 resize-none" />
            <input placeholder="Tags, pisahkan koma" value={form.tags} onChange={e => setForm({...form,tags:e.target.value})} className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-500" />
            <label className="text-xs text-gray-400 flex gap-2">
              <input type="checkbox" checked={form.featured} onChange={e => setForm({...form,featured:e.target.checked})} />
              Jadikan featured article
            </label>
            <button className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-3 rounded-xl font-bold text-sm">Publikasikan Artikel</button>
          </form>
        </section>

        <section className="lg:col-span-2 bg-dark-surface border border-dark-border rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-white">Database Snapshot</h2>
            <button onClick={loadDb} className="text-gray-400 hover:text-white inline-flex items-center gap-1 text-xs">
              <RefreshCw size={16} /> {loadingDb ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          {db ? (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(db.summary || {}).map(([k, v]) => (
                  <div key={k} className="bg-dark-card border border-dark-border rounded-xl p-3">
                    <div className="text-gray-400 uppercase text-[10px]">{k}</div>
                    <div className="text-white text-lg font-bold mt-1">{v}</div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Users</h3>
                <div className="space-y-2 max-h-40 overflow-auto pr-1">
                  {(db.users || []).map((u) => (
                    <div key={u.id} className="bg-dark-card border border-dark-border rounded-lg p-3">
                      <div className="text-white text-sm font-semibold">{u.name}</div>
                      <div className="text-gray-400">{u.email} · {u.role}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Recent Articles</h3>
                <div className="space-y-2 max-h-40 overflow-auto pr-1">
                  {(db.articles || []).map((a) => (
                    <div key={a.id} className="bg-dark-card border border-dark-border rounded-lg p-3">
                      <div className="text-white text-sm font-semibold">{a.title}</div>
                      <div className="text-gray-400">{a.author} · {a.status}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Recent Releases</h3>
                <div className="space-y-2 max-h-40 overflow-auto pr-1">
                  {(db.releases || []).map((r) => (
                    <div key={r.id} className="bg-dark-card border border-dark-border rounded-lg p-3">
                      <div className="text-white text-sm font-semibold">{r.bandName} — {r.title}</div>
                      <div className="text-gray-400">{r.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-400">Klik Refresh untuk buka snapshot database.</div>
          )}
        </section>
      </div>

      <section className="bg-dark-surface border border-dark-border rounded-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-bold text-white">Artikel Terbaru</h2>
          <button onClick={load} className="text-gray-400 hover:text-white"><RefreshCw size={16}/></button>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {articles.slice(0, 6).map(a => (
            <div key={a.id} className="bg-dark-card border border-dark-border rounded-xl p-4">
              <span className="text-[10px] text-brand-500 uppercase font-bold">{a.category}</span>
              <h3 className="text-sm text-white font-semibold mt-1">{a.title}</h3>
              <p className="text-[11px] text-gray-400 mt-1">{a.author} · {a.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};