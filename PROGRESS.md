# PROGRESS.md — BAYPEDIA Hub Fullstack Music Portal

**Last Updated:** 2026-09-04 00:10 WIB  
**Project Status:** ✅ **COMPLETED - READY FOR DEPLOYMENT**
**Deployment Target:** Frontend Vercel + Backend Railway (Render ditinggalkan karena butuh card)  
**Version:** 3.0.2

**Branding:** BAYPEDIA (updated from SoundStory)
**Latest Build:** `npm run build:frontend` sukses pada 2026-09-03 (dist terbaru dihasilkan)
**Git Status:** repo sudah di-init, commit pertama berhasil, siap push ke GitHub

---

## 📊 Status Progres Terkini

### ✅ SELESAI:
1. **Frontend React + Vite + Tailwind CSS** — Build produksi berhasil (2m 6s)
2. **Backend Express.js API** — Server berjalan di `localhost:4000`
3. **Authentication System** — Login/Register dengan JWT + Bcrypt
4. **Admin Dashboard** — Monitoring statistik, CRUD artikel, user management
5. **Band Submission Portal** — Form submit rilis band baru
6. **Comment System** — Wajib login untuk komentar artikel
7. **API Key Management** — Config Spotify/YouTube API credentials
8. **Announcement System** — Ticker banner + modal popup
9. **Captcha/Verify Human** — Opsional saat register (frontend validation)
10. **Design Overhaul** — Palet warna simple, elegan, aesthetic (soft beige + dark theme)

### 🚀 READY TO DEPLOY:
- Frontend build tersedia di folder `dist/`
- Backend API siap dijalankan dengan `npm run server`
- Database menggunakan JSON file storage (SQLite-like structure)

---

## 📁 Daftar File/Komponen yang Sudah Dibuat

### **Root Files:**
```
/mnt/c/Users/akunz/Desktop/music-website/
├── package.json                  # Dependencies & scripts (frontend + backend)
├── vite.config.js               # Vite config dengan proxy /api
├── tailwind.config.js           # Tailwind config - palet simple & elegan
├── postcss.config.js            # PostCSS untuk Tailwind
├── index.html                   # HTML entry point
├── .gitignore                   # Ignore node_modules, dist, env, logs, db files
├── .env.example                 # Template environment variables
├── README.md                    # Project documentation
├── PROGRESS.md                  # File tracking progress ini
├── deploy.sh                    # Script bantu deploy Vercel/Railway
├── render.yaml                  # Blueprint frontend static + backend API di Render
├── vercel.json                  # Config build/deploy Vite di Vercel
```

### **Frontend Structure (`src/`):**

#### **Core:**
- `src/main.jsx` — React entry point
- `src/index.css` — Tailwind base styles + custom design tokens
- `src/AppContent.jsx` — Main layout & routing logic

#### **Context (State Management):**
- `src/context/AppContext.jsx` — Global state: user auth, darkMode, announcements, submittedBands

#### **Services (API Integration):**
- `src/services/api.js` — API helper functions:
  - `authApi.register()` — Register user baru
  - `authApi.login()` — Login dengan email/password
  - `authApi.me()` — Get current user profile
  - `contentApi.getArticles()` — Fetch artikel
  - `contentApi.getComments(articleId)` — Fetch komentar artikel
  - `contentApi.postComment(articleId, text)` — Post komentar (wajib login)
  - `contentApi.getReleases()` — Fetch band releases
  - `contentApi.submitRelease(data)` — Submit band baru
  - `adminApi.getStats()` — Admin dashboard statistics

#### **Pages:**
- `src/pages/HomeFeed.jsx` — Homepage: Hero, band radar, indie chart
- `src/pages/GigTracker.jsx` — Event & festival tracker (Gigsplay style)
- `src/pages/AuthPage.jsx` — Login/Register page dengan captcha opsional
- `src/pages/AdminDashboard.jsx` — Admin dashboard: stats, quick actions, activity feed

#### **Components:**
- `src/components/Navbar.jsx` — Navigation bar dengan menu, search, API key config, auth buttons
- `src/components/AnnouncementBanner.jsx` — Ticker banner + modal untuk breaking news
- `src/components/SubmitReleaseForm.jsx` — Form untuk band submit single/EP/album baru

#### **Data (Mock/Seed):**
- `src/data/mockData.js` — Sample data:
  - `ANNOUNCEMENTS` — Breaking news & updates
  - `FEATURED_ARTICLES` — Artikel featured (Bernadya, Hindia, For Revenge, dll)
  - `SUBMITTED_RELEASES` — Sample band releases
  - `INDIE_RADAR_CHARTS` — Weekly top 8 indie chart
  - `FEATURED_ARTISTS` — Spotlight artists
  - `EVENTS` — Gig & festival calendar

### **Backend Structure (`server/`):**
- `server/index.js` — Express API server dengan endpoints:
  
  **Auth Endpoints:**
  - `POST /api/auth/register` — Register user baru (dengan captcha opsional)
  - `POST /api/auth/login` — Login user
  - `GET /api/auth/me` — Get current user (JWT protected)
  
  **Content Endpoints:**
  - `GET /api/articles` — List artikel
  - `GET /api/articles/:id` — Detail artikel
  - `GET /api/articles/:id/comments` — Komentar artikel
  - `POST /api/articles/:id/comments` — Post komentar (JWT protected)
  - `GET /api/releases` — List band releases
  - `POST /api/releases` — Submit band baru (JWT protected)
  
  **Admin Endpoints:**
  - `GET /api/admin/stats` — Dashboard statistics (JWT protected, admin only)
  - `GET /api/admin/users` — List users (admin only)
  - `GET /api/admin/content` — Manage content (admin only)
  
  **Health Check:**
  - `GET /api/health` — Server health status

### **Database (JSON File Storage):**
- `server/db/users.json` — User accounts
- `server/db/articles.json` — Artikel database
- `server/db/comments.json` — Komentar database
- `server/db/releases.json` — Band releases database

### **Build Output (`dist/`):**
```
dist/
├── index.html                    # 0.80 kB (gzipped: 0.49 kB)
└── assets/
    ├── index-CQMwShKN.css       # 28.38 kB (gzipped: 5.45 kB)
    └── index-D3pvoaQO.js        # 199.05 kB (gzipped: 59.70 kB)
```

---

## 🐛 Error & Kendala yang Sudah Diselesaikan

### 1. **Build Gagal dengan Exit Code -1 (Pertama kali)**
- **Masalah:** `npm run build` timeout/exit -1 tanpa error log jelas
- **Penyebab:** Syntax error di komponen JSX baru + Tailwind class invalid
- **Solusi:** Re-check semua komponen, fix import paths, validasi Tailwind classes

### 2. **Warna Website Terlalu Rame & Lebay**
- **Masalah:** User komplain warna terlalu banyak gradasi dan tidak elegan
- **Penyebab:** Palet awal menggunakan hijau neon + ungu terang + banyak animasi gradient
- **Solusi:** Redesign palet menjadi:
  - **Primary:** `#d4b5a0` (Soft Beige/Krem)
  - **Dark BG:** `#0a0a0b` (Almost Black)
  - **Card BG:** `#141416` (Dark Card)
  - **Border:** `#1f1f23` (Subtle Border)
  - **Accent:** `#10b981` (Emerald untuk call-to-action)
  - Typography: Plus Jakarta Sans (body) + Playfair Display (headings) + JetBrains Mono (code/stats)

### 3. **Tailwind Class Invalid (e.g., `text-gradient`, `w-full-screen`)**
- **Masalah:** Beberapa class custom tidak dikenali Tailwind
- **Solusi:** Replace dengan utility classes valid atau buat di `@layer utilities`

### 4. **Browser Tool Tidak Bisa Jalan di WSL**
- **Masalah:** `browser-harness: chrome-not-running` error saat preview otomatis
- **Solusi:** Instruksikan user untuk preview manual di browser dengan `http://localhost:5173`

### 5. **Backend Tidak Terintegrasi (Frontend Only)**
- **Masalah:** User minta backend sekalian untuk admin dashboard & komentar wajib login
- **Solusi:** 
  - Buat Express API server (`server/index.js`)
  - Implementasi JWT authentication (bcrypt + jsonwebtoken)
  - Buat JSON file-based database (users, articles, comments, releases)
  - Proxy Vite config `/api` → `http://localhost:4000`

### 6. **Comment System Tidak Memerlukan Login**
- **Masalah:** User minta komentar wajib login/register
- **Solusi:** 
  - Tambah JWT middleware `authenticateToken` di backend
  - Frontend check `user` state dari AppContext
  - Show login prompt jika belum authenticated

### 7. **Captcha/Verify Human Belum Ada**
- **Masalah:** User minta captcha di register (opsional)
- **Solusi:** Implementasi simple math captcha di `AuthPage.jsx` (frontend validation)

### 8. **Admin Dashboard Tidak Ada**
- **Masalah:** User minta dashboard khusus admin untuk monitoring & CRUD
- **Solusi:** Buat `AdminDashboard.jsx` dengan:
  - Stats cards (total users, articles, releases, comments)
  - Quick actions (Add Article, Review Band, Manage Users)
  - Recent activity feed

---

## 🎯 To-Do List Selanjutnya

### **Priority 1: Deployment**
- [ ] Setup environment variables untuk production:
  - `VITE_API_BASE` → URL backend production
  - `JWT_SECRET` → Generate secure random string
  - `PORT` → Backend port (default 4000)
- [ ] Deploy frontend ke Vercel/Netlify:
  - Upload folder `dist/`
  - Set environment variables
- [ ] Deploy backend ke:
  - Railway / Render / Heroku (Node.js)
  - Atau VPS dengan PM2
- [ ] Setup HTTPS & custom domain

### **Priority 2: Database Migration**
- [ ] Ganti JSON file storage → PostgreSQL atau MongoDB:
  - Install `pg` atau `mongoose`
  - Buat schema/model untuk users, articles, comments, releases
  - Migration script dari JSON ke SQL

### **Priority 3: Enhanced Features**
- [ ] **Real Captcha Integration:**
  - Ganti math captcha → Google reCAPTCHA v3
  - Atau hCaptcha / Cloudflare Turnstile
- [ ] **Email Verification:**
  - Kirim email verifikasi saat register
  - User harus verify email sebelum bisa komentar
- [ ] **Image Upload untuk Band Submission:**
  - Implementasi file upload (Multer + Cloudinary/S3)
  - Artwork cover band bisa diupload langsung
- [ ] **Rich Text Editor untuk Artikel:**
  - Tambah TinyMCE atau Quill di Admin Dashboard
  - Admin bisa format artikel dengan bold, italic, embed YouTube
- [ ] **Social Share Buttons:**
  - Share artikel ke Twitter, Facebook, WhatsApp
- [ ] **Search Functionality:**
  - Search bar di navbar aktif (sekarang masih UI only)
  - Full-text search artikel, band, event
- [ ] **Notification System:**
  - Admin dapat notifikasi saat ada band submit baru
  - User dapat notifikasi saat komentar mereka dibalas
- [ ] **Analytics Dashboard:**
  - Tambah chart untuk views, engagement, top articles
  - Integrate Google Analytics atau Plausible

### **Priority 4: Testing & Optimization**
- [ ] **Unit Testing:**
  - Backend: Jest + Supertest untuk API endpoints
  - Frontend: Vitest + React Testing Library
- [ ] **Performance Optimization:**
  - Lazy load components dengan `React.lazy()`
  - Image optimization (WebP, lazy loading)
  - Code splitting untuk reduce bundle size
- [ ] **SEO Optimization:**
  - Meta tags dinamis per artikel
  - Open Graph tags untuk social share
  - Sitemap.xml + robots.txt
- [ ] **Accessibility (A11y):**
  - ARIA labels untuk screen readers
  - Keyboard navigation support
  - Color contrast check (WCAG AA)

### **Priority 5: Security Hardening**
- [ ] **Rate Limiting:**
  - Prevent brute-force login attacks
  - Limit API requests per IP
- [ ] **Input Validation:**
  - Sanitize user input di backend (xss-clean, validator.js)
  - Prevent SQL injection (jika pakai SQL database)
- [ ] **CORS Configuration:**
  - Whitelist only allowed origins
- [ ] **Helmet.js:**
  - Security headers (CSP, X-Frame-Options, etc)

---

## 🔧 Cara Menjalankan Proyek

### **Development Mode:**

1. **Install dependencies:**
   ```bash
   cd /mnt/c/Users/akunz/Desktop/music-website
   npm install
   ```

2. **Jalankan Backend API:**
   ```bash
   npm run server
   # Server running at http://localhost:4000
   ```

3. **Jalankan Frontend (terminal baru):**
   ```bash
   npm run dev
   # Frontend running at http://localhost:5173
   ```

4. **Akses di browser:**
   - Homepage: http://localhost:5173
   - Login: http://localhost:5173/#/auth
   - Admin Dashboard: Login sebagai admin → klik tombol "Admin"

### **Production Build:**

1. **Build frontend:**
   ```bash
   npm run build:frontend
   # Output di folder dist/
   ```

2. **Preview build:**
   ```bash
   npm run preview
   ```

3. **Deploy:**
   - Upload folder `dist/` ke hosting static (Vercel, Netlify)
   - Deploy `server/` ke Node.js hosting (Railway, Render)

---

## 👤 Login Credentials

### **Admin Account:**
- **Email:** `admin@baypedia.id`
- **Password:** `Admin123!`
- **Role:** `admin`

### **Editor Account:**
- **Email:** `editor@baypedia.id`
- **Password:** `Editor123!`
- **Role:** `editor`

---

## 📦 Dependencies

### **Frontend:**
- `react` ^18.3.1
- `react-dom` ^18.3.1
- `lucide-react` ^0.344.0 (icons)
- `vite` ^5.4.21
- `tailwindcss` ^3.4.17
- `autoprefixer` ^10.4.20
- `postcss` ^8.4.49

### **Backend:**
- `express` ^4.21.2
- `cors` ^2.8.5
- `bcryptjs` ^2.4.3
- `jsonwebtoken` ^9.0.2

---

## 🎨 Design System

### **Color Palette:**
```
Primary:     #d4b5a0  (Soft Beige)
Emerald:     #10b981  (Call-to-Action)
Dark BG:     #0a0a0b  (Background)
Dark Card:   #141416  (Cards)
Dark Border: #1f1f23  (Subtle Border)
Dark Hover:  #1a1a1d  (Hover State)
```

### **Typography:**
- **Body:** Plus Jakarta Sans (400, 500, 600, 700, 800)
- **Headings:** Playfair Display (700, 800, italic)
- **Mono:** JetBrains Mono (400, 500) for stats & code

### **Spacing Scale:**
- Base: 4px (1 unit)
- Small: 8px, 12px, 16px
- Medium: 20px, 24px, 32px
- Large: 40px, 48px, 64px

---

## 🌐 API Endpoints Reference

### **Auth:**
```
POST   /api/auth/register      # Register user baru
POST   /api/auth/login         # Login user
GET    /api/auth/me            # Get current user (JWT)
```

### **Content:**
```
GET    /api/articles           # List artikel
GET    /api/articles/:id       # Detail artikel
GET    /api/articles/:id/comments  # Komentar artikel
POST   /api/articles/:id/comments  # Post komentar (JWT)
GET    /api/releases           # List band releases
POST   /api/releases           # Submit band baru (JWT)
```

### **Admin:**
```
GET    /api/admin/stats        # Dashboard stats (JWT, admin)
GET    /api/admin/users        # List users (JWT, admin)
GET    /api/admin/content      # Manage content (JWT, admin)
```

### **Health:**
```
GET    /api/health             # Server status check
```

---

## 📝 Notes untuk Agen Berikutnya

1. **Database masih JSON files** — Pertimbangkan migrasi ke PostgreSQL/MongoDB untuk production
2. **Captcha masih frontend validation** — Perlu integrasi real captcha (reCAPTCHA/hCaptcha)
3. **Image upload belum ada** — Band submit masih pakai URL saja, belum bisa upload file
4. **Search bar belum fungsional** — UI sudah ada tapi backend search belum diimplementasi
5. **Email service belum ada** — Registration belum kirim email verifikasi
6. **Analytics belum ada** — Admin dashboard bisa ditambah chart dan metrics detail
7. **Testing belum ada** — Perlu setup Jest/Vitest untuk unit tests
8. **SEO belum optimal** — Meta tags masih static, perlu dinamis per halaman

**File penting untuk dibaca:**
- `src/AppContent.jsx` — Main routing logic
- `src/context/AppContext.jsx` — Global state management
- `server/index.js` — Backend API endpoints
- `src/services/api.js` — API helper functions
- `tailwind.config.js` — Design system tokens

**Referensi website yang digunakan:**
- Seputar Musik Indo (breaking news style)
- Gigsplay (gig tracker & event)
- Pophariini (new release showcase)
- Festival Suara (community submission & indie chart)

---

**Project selesai dan siap deploy! 🚀**
