import React, { useEffect, useState } from 'react';
import { LockKeyhole, Mail, UserRound, ShieldCheck, RefreshCw } from 'lucide-react';
import { authApi } from '../services/api';

export const AuthPage = ({ mode = 'login', onSuccess }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [form, setForm] = useState({ name: '', email: '', password: '', captchaAnswer: '' });
  const [captcha, setCaptcha] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadCaptcha = async () => {
    try { setCaptcha(await authApi.captcha()); } catch { setCaptcha(null); }
  };
  useEffect(() => { if (!isLogin) loadCaptcha(); }, [isLogin]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage('');
    try {
      const data = isLogin
        ? await authApi.login({ email: form.email, password: form.password })
        : await authApi.register({ ...form, captchaId: captcha?.captchaId });
      localStorage.setItem('baypedia_token', data.token);
      localStorage.setItem('baypedia_user', JSON.stringify(data.user));
      onSuccess?.(data.user);
    } catch (err) {
      setMessage(err.message);
      if (!isLogin) loadCaptcha();
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-dark-surface border border-dark-border rounded-3xl p-7 sm:p-9 shadow-2xl">
        <div className="text-center mb-7">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-500/20 text-brand-500 flex items-center justify-center mb-4"><LockKeyhole size={22}/></div>
          <h1 className="text-2xl font-extrabold text-white">{isLogin ? 'Masuk ke baypedia' : 'Daftar Akun Baru'}</h1>
          <p className="text-xs text-gray-400 mt-2">{isLogin ? 'Komentari artikel dan pantau submit rilisanmu.' : 'Bergabung dengan komunitas pecinta musik.'}</p>
        </div>
        {message && <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-3 text-xs">{message}</div>}
        <form onSubmit={submit} className="space-y-4">
          {!isLogin && <label className="block"><span className="field-label">Nama</span><div className="input-wrap"><UserRound size={16}/><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Nama kamu" /></div></label>}
          <label className="block"><span className="field-label">Email</span><div className="input-wrap"><Mail size={16}/><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="email@kamu.com" /></div></label>
          <label className="block"><span className="field-label">Password</span><div className="input-wrap"><LockKeyhole size={16}/><input required minLength={8} type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Minimal 8 karakter" /></div></label>
          {!isLogin && captcha && <div className="bg-dark-card rounded-xl border border-dark-border p-3"><div className="flex items-center justify-between mb-2"><span className="field-label !mb-0 flex gap-1"><ShieldCheck size={14}/> Verifikasi human (opsional)</span><button type="button" onClick={loadCaptcha} className="text-gray-400 hover:text-white"><RefreshCw size={14}/></button></div><div className="flex items-center gap-2"><span className="font-mono text-sm text-white bg-dark-bg px-3 py-2 rounded-lg">{captcha.challenge} =</span><input required value={form.captchaAnswer} onChange={e=>setForm({...form,captchaAnswer:e.target.value})} className="!px-3" placeholder="Jawaban" /></div></div>}
          <button disabled={loading} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm">{loading ? 'Memproses...' : isLogin ? 'Masuk' : 'Buat Akun'}</button>
        </form>
        <button onClick={()=>{setIsLogin(!isLogin);setMessage('')}} className="w-full mt-5 text-xs text-gray-400 hover:text-brand-500">{isLogin ? 'Belum punya akun? Daftar sekarang' : 'Sudah punya akun? Masuk'}</button>
      </div>
    </div>
  );
};
