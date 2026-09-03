# BAYPEDIA Hub Fullstack Deployment Guide

## 1. Frontend (Vercel)
Vercel sangat cocok untuk hosting file statis yang ada di folder `dist/`.

**Langkah-langkah:**
1. Masuk ke terminal WSL: `cd /mnt/c/Users/akunz/Desktop/music-website`
2. Jalankan `vercel` (ikuti instruksi login jika belum).
3. Saat ditanya `In which directory is your code located?`, tekan **Enter** (./).
4. Saat ditanya `Want to modify these settings? [y/N]`, tekan **N**.
5. Setelah selesai, jalankan `vercel --prod` untuk live ke domain produksi.

## 2. Backend (Railway)
Railway paling stabil untuk menjalankan Node.js server (`server/index.js`).

**Langkah-langkah:**
1. Login ke [Railway.app](https://railway.app/).
2. Buat "New Project" -> "Deploy from GitHub repo".
3. Pastikan `Root Directory` adalah `/`.
4. Set **Environment Variables** di dashboard Railway:
   - `PORT=4000`
   - `JWT_SECRET=rahasia_baypedia_123`
   - `NODE_ENV=production`

## 3. Automation Script
Gue udah buatin skrip `deploy.sh`. Lo tinggal jalanin:
```bash
chmod +x deploy.sh
npm run deploy
```
Ini bakal build frontend lo dan ngingetin lo buat push ke cloud.

---

**BAYPEDIA MUSIC HUB v3.0.0** — *Professional & Aesthetic*
