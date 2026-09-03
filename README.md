# BAYPEDIA Hub

BAYPEDIA Hub adalah portal musik profesional untuk artikel rilisan lagu, berita musik, band radar, event/gig tracker, dan dashboard admin.

## Fitur Utama
- Home editorial musik
- Breaking announcement banner
- Band submission portal
- Gig & festival tracker
- Comment system wajib login
- Login/register dengan captcha opsional
- Admin dashboard untuk monitoring dan CRUD konten
- API backend Express + JWT

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Auth: JWT + bcryptjs
- Icons: lucide-react

## Struktur Proyek
- `src/` — frontend React modular
- `server/` — backend API
- `dist/` — hasil build produksi
- `PROGRESS.md` — catatan progress proyek
- `deploy.sh` — script bantu deploy

## Menjalankan Project
### Frontend Dev
```bash
npm run dev:frontend
```

### Backend API
```bash
npm run server
```

### Build Produksi
```bash
npm run build:frontend
```

### Deploy Helper
```bash
npm run deploy
```

## Deploy
- Frontend: Vercel
- Backend: Railway / Render

Lihat `DEPLOY_GUIDE.md` untuk langkah deploy lengkap.
