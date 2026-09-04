import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Calendar, User, MessageCircle, Send, ArrowLeft, Tag } from 'lucide-react';

export const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { API_BASE } = useApp();

  useEffect(() => {
    let alive = true;
    setLoading(true);

    Promise.all([
      fetch(`${API_BASE}/articles/${id}`).then(res => res.json()),
      fetch(`${API_BASE}/comments/article/${id}`).then(res => res.json())
    ]).then(([articleData, commentData]) => {
      if (!alive) return;
      setArticle(articleData);
      setComments(Array.isArray(commentData) ? commentData : []);
    }).finally(() => {
      if (alive) setLoading(false);
    });

    return () => { alive = false; };
  }, [id, API_BASE]);

  const postComment = async () => {
    const token = localStorage.getItem('baypedia_token');
    if (!token) return alert('Login dulu bro');
    const res = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ articleId: id, content: newComment })
    });
    if (res.ok) {
      setNewComment('');
      const updated = await fetch(`${API_BASE}/comments/article/${id}`).then(r => r.json());
      setComments(updated);
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-400">Loading...</div>;
  if (!article || article.message) return <div className="py-20 text-center text-gray-400">Artikel tidak ditemukan.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8">
        <ArrowLeft size={16} /> Kembali
      </button>

      <article className="bg-dark-card border border-dark-border rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="relative h-72 sm:h-96 bg-dark-surface">
          <img
            src={article.image || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=80'}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest bg-brand-500/15 text-brand-500 px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight max-w-3xl">{article.title}</h1>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(article.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><User size={14}/> {article.author}</span>
            {Array.isArray(article.tags) && article.tags[0] && <span className="flex items-center gap-1"><Tag size={14}/> {article.tags.join(' · ')}</span>}
          </div>

          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">{article.excerpt}</p>
          <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-white">
            <p>{article.body || article.excerpt}</p>
          </div>

          <section className="border-t border-dark-border pt-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><MessageCircle /> Komentar</h3>
            <div className="space-y-3">
              {comments.length === 0 && <div className="text-sm text-gray-500">Belum ada komentar.</div>}
              {comments.map(c => (
                <div key={c.id} className="bg-dark-surface border border-dark-border p-4 rounded-xl">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-sm text-brand-emerald font-semibold">{c.userName}</p>
                    <p className="text-[11px] text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <input
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="flex-1 bg-dark-surface p-3 rounded-xl border border-dark-border outline-none focus:border-brand-500"
                placeholder="Tulis komentar..."
              />
              <button onClick={postComment} className="bg-brand-600 px-6 rounded-xl hover:bg-brand-700 inline-flex items-center justify-center">
                <Send size={18}/>
              </button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};
