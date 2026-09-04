# Deploy BAYPEDIA Backend ke Railway

Railway dipakai untuk backend API Node.js/Express.

## Setting Railway

1. Buka https://railway.app/
2. New Project
3. Deploy from GitHub Repo
4. Pilih repo `baypedia-music-hub`
5. Railway otomatis baca `railway.json`

## Konfigurasi Service

Language / Runtime:
```text
Node
```

Root Directory:
```text
kosong / root project
```

Build Command:
```bash
npm install
```

Start Command:
```bash
node server/index.js
```

Healthcheck Path:
```text
/api/health
```

## Environment Variables

Tambahkan di Railway Variables:

```env
NODE_ENV=production
JWT_SECRET=ganti-dengan-random-secret-panjang
```

Tidak perlu set `PORT` manual. Railway akan menyediakan `PORT` otomatis.

## Setelah Deploy Backend

Railway akan kasih domain seperti:
```text
https://baypedia-api-production.up.railway.app
```

Cek health API:
```text
https://DOMAIN-RAILWAY-LO/api/health
```

Kalau hasilnya JSON `ok: true`, backend sudah hidup.

## Hubungkan Frontend Vercel ke Railway

Di Vercel Project Settings -> Environment Variables:

```env
VITE_API_BASE=https://DOMAIN-RAILWAY-LO/api
```

Setelah itu redeploy frontend di Vercel.

## Catatan

- Backend memakai JSON file storage di `server/data/db.json`.
- Untuk production serius, sebaiknya nanti migrasi ke PostgreSQL/MongoDB karena storage file bisa reset saat redeploy.
