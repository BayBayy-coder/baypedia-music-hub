import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'baypedia-dev-secret-change-me';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';

const pool = new Pool({ connectionString: DATABASE_URL });

const seedArticles = [
  {
    id: 'art-1',
    title: "Bernadya dan Fenomena 'Satu Bulan' yang Menembus 250 Juta Stream",
    category: 'Review & Analysis',
    author: 'Raka Pratama',
    excerpt: 'Bagaimana penyanyi muda asal Surabaya ini berhasil menguraikan rasa kehilangan menjadi soundtrack kolektif anak muda Indonesia.',
    body: 'Bernadya berhasil mengubah rasa personal menjadi bahasa yang terasa universal. Lagu ini bergerak pelan, jujur, dan tidak berusaha besar-besaran; justru di situlah daya pukulnya. Dengan produksi yang bersih dan lirik yang rapat, Satu Bulan jadi salah satu momen penting pop Indonesia tahun ini.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80',
    featured: true,
    tags: ['Bernadya', 'Pop Indie', 'Viral']
  },
  {
    id: 'art-2',
    title: 'Hindia & Pesta Sedang Merayakan Mati: Eksplorasi Seni Katarsis di Era Modern',
    category: 'Editorial',
    author: 'Maya Kirana',
    excerpt: 'Baskara Putra mengemas quarter-life crisis dengan estetika visual dan audio yang memukau.',
    body: 'Di era ketika banyak musisi mengejar algoritma, Hindia tetap mengutamakan narasi. Karya-karyanya mengajak pendengar untuk berdamai dengan kegagalan, amarah, dan kekosongan dengan bahasa yang dekat dan tajam.',
    featured: false,
    tags: ['Hindia', 'Alternative', 'Jakarta']
  },
  {
    id: 'art-3',
    title: "For Revenge Lepas Single 'Penyangkalan': Puncak Emo-Pop Generasi Baru",
    category: 'Gig & Single Review',
    author: 'Doni Prasetyo',
    excerpt: 'Unit Emo asal Bandung ini membuktikan bahwa musik dengan lirisisme mendalam tidak pernah ditinggalkan penggemarnya.',
    body: 'Penyangkalan memperlihatkan pertumbuhan musikal yang konsisten. Aransemen padat, hook yang mudah diingat, dan emosi yang tidak ditahan-tahan membuat lagu ini kuat di panggung maupun streaming.',
    featured: false,
    tags: ['For Revenge', 'Emo Pop', 'Bandung']
  },
  {
    id: 'art-4',
    title: 'Mengabaikan Tren TikTok: Cara Arctic Monkeys Bertahan Lebih dari Dwi Darsa',
    category: 'International Spotlight',
    author: 'Almantas',
    excerpt: 'Dari garage rock hingga orchestral pop, evolusi band Sheffield yang tak pernah gagal menginspirasi band lokal.',
    body: 'Arctic Monkeys menunjukkan bahwa umur panjang di industri bukan soal mengikuti semua tren. Yang penting adalah identitas yang kuat, transisi yang berani, dan rasa penasaran yang tidak pernah habis.',
    featured: false,
    tags: ['Arctic Monkeys', 'Rock', 'UK']
  }
];

const seedReleases = [
  {
    id: 'rel-1',
    bandName: 'Batas Senja',
    origin: 'Lampung',
    title: 'Hati dan Perasaan',
    type: 'Album Perdana',
    genre: 'Folk Pop',
    releaseDate: '28 Aug 2026',
    spotifyUrl: 'https://spotify.com',
    youtubeUrl: 'https://youtube.com',
    status: 'APPROVED / FEATURED',
    description: 'Koleksi 10 lagu yang menceritakan dinamika hubungan anak muda masa kini dengan balutan akustik hangat.',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rel-2',
    bandName: 'Kirribilly',
    origin: 'Jakarta',
    title: 'Liverpool Echoes',
    type: 'Single',
    genre: 'Indie Rock',
    releaseDate: '26 Aug 2026',
    spotifyUrl: 'https://spotify.com',
    youtubeUrl: 'https://youtube.com',
    status: 'APPROVED / FEATURED',
    description: 'Supergrup lokal yang baru saja guncang panggung International Beatleweek di Inggris.',
    cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rel-3',
    bandName: 'Stepforward',
    origin: 'Jakarta',
    title: 'Tak Pernah Mati EP',
    type: 'EP',
    genre: 'Hardcore',
    releaseDate: '30 Aug 2026',
    spotifyUrl: 'https://spotify.com',
    youtubeUrl: 'https://youtube.com',
    status: 'APPROVED',
    description: 'Peringati 3 dekade berkarya dengan energi yang tetap membara.',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80'
  }
];

const initDB = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        createdAt TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        author TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        body TEXT NOT NULL DEFAULT '',
        image TEXT,
        tags JSONB DEFAULT '[]'::jsonb,
        status TEXT DEFAULT 'published',
        featured BOOLEAN DEFAULT false,
        createdAt TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`ALTER TABLE articles ADD COLUMN IF NOT EXISTS body TEXT NOT NULL DEFAULT ''`);
    await client.query(`ALTER TABLE articles ADD COLUMN IF NOT EXISTS image TEXT`);
    await client.query(`ALTER TABLE articles ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb`);
    await client.query(`ALTER TABLE articles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published'`);
    await client.query(`ALTER TABLE articles ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false`);
    await client.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id TEXT PRIMARY KEY,
        articleId TEXT REFERENCES articles(id) ON DELETE CASCADE,
        userId TEXT REFERENCES users(id),
        userName TEXT,
        content TEXT NOT NULL,
        createdAt TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS releases (
        id TEXT PRIMARY KEY,
        bandName TEXT NOT NULL,
        origin TEXT,
        title TEXT NOT NULL,
        type TEXT DEFAULT 'Single',
        genre TEXT,
        spotifyUrl TEXT,
        youtubeUrl TEXT,
        description TEXT,
        cover TEXT,
        status TEXT DEFAULT 'pending',
        createdAt TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        link TEXT,
        active BOOLEAN DEFAULT true,
        createdAt TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS captchas (
        id TEXT PRIMARY KEY,
        answer TEXT NOT NULL,
        expiresAt BIGINT NOT NULL
      )
    `);

    const accounts = [
      ['admin-1', 'Admin baypedia', 'admin@baypedia.id', 'Admin123!', 'admin'],
      ['editor-1', 'Editor baypedia', 'editor@baypedia.id', 'Editor123!', 'editor']
    ];
    for (const [id, name, email, password, role] of accounts) {
      const { rows: existing } = await client.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.length === 0) {
        await client.query(
          'INSERT INTO users (id, name, email, passwordHash, role) VALUES ($1, $2, $3, $4, $5)',
          [id, name, email, bcrypt.hashSync(password, 10), role]
        );
      }
    }

    for (const article of seedArticles) {
      await client.query(
        `INSERT INTO articles (id, title, category, author, excerpt, body, image, tags, status, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           category = EXCLUDED.category,
           author = EXCLUDED.author,
           excerpt = EXCLUDED.excerpt,
           body = EXCLUDED.body,
           image = EXCLUDED.image,
           tags = EXCLUDED.tags,
           status = EXCLUDED.status,
           featured = EXCLUDED.featured`,
        [article.id, article.title, article.category, article.author, article.excerpt, article.body, article.image, JSON.stringify(article.tags), 'published', article.featured]
      );
    }

    for (const release of seedReleases) {
      await client.query(
        `INSERT INTO releases (id, bandName, origin, title, type, genre, spotifyUrl, youtubeUrl, description, cover, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (id) DO UPDATE SET
           bandName = EXCLUDED.bandName,
           origin = EXCLUDED.origin,
           title = EXCLUDED.title,
           type = EXCLUDED.type,
           genre = EXCLUDED.genre,
           spotifyUrl = EXCLUDED.spotifyUrl,
           youtubeUrl = EXCLUDED.youtubeUrl,
           description = EXCLUDED.description,
           cover = EXCLUDED.cover,
           status = EXCLUDED.status`,
        [release.id, release.bandName, release.origin, release.title, release.type, release.genre, release.spotifyUrl, release.youtubeUrl, release.description, release.cover, release.status]
      );
    }

    const { rows: annRows } = await client.query('SELECT id FROM announcements');
    if (annRows.length === 0) {
      await client.query(
        'INSERT INTO announcements (id, title, content, link, active) VALUES ($1, $2, $3, $4, $5)',
        ['ann-1', 'Open Submission Band Baru', 'Kirim rilisan baru untuk masuk ke radar editorial.', '#submit-release', true]
      );
    }
  } finally {
    client.release();
  }
};

const signToken = (user) => jwt.sign(
  { id: user.id, role: user.role, email: user.email, name: user.name },
  JWT_SECRET,
  { expiresIn: '7d' }
);

const auth = (roles = []) => (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', async (_req, res) => {
  res.json({ ok: true, service: 'baypedia-api', ts: new Date().toISOString() });
});

app.post('/api/auth/captcha', async (_req, res) => {
  const a = Math.floor(10 + Math.random() * 89);
  const b = Math.floor(10 + Math.random() * 89);
  const challenge = `${a} + ${b}`;
  const answer = String(a + b);
  const id = crypto.randomUUID();
  await pool.query('INSERT INTO captchas (id, answer, expiresAt) VALUES ($1, $2, $3)', [id, answer, Date.now() + 10 * 60 * 1000]);
  res.json({ captchaId: id, challenge, optional: true });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, captchaId, captchaAnswer } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
  let captchaValid = true;
  if (captchaId && captchaAnswer) {
    const { rows } = await pool.query('SELECT answer, expiresAt FROM captchas WHERE id = $1', [captchaId]);
    if (rows.length === 0) captchaValid = false;
    else {
      const row = rows[0];
      if (Date.now() > Number(row.expiresat || row.expiresAt) || String(captchaAnswer).trim() !== row.answer) captchaValid = false;
      await pool.query('DELETE FROM captchas WHERE id = $1', [captchaId]);
    }
  }
  if (!captchaValid && (captchaId && captchaAnswer)) return res.status(400).json({ message: 'Captcha gagal diverifikasi' });

  try {
    const { rows } = await pool.query(
      'INSERT INTO users (id, name, email, passwordHash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
      [crypto.randomUUID(), name, email.toLowerCase(), bcrypt.hashSync(password, 10), 'user']
    );
    const user = rows[0];
    res.json({ token: signToken(user), user });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ message: 'Email sudah terdaftar' });
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [String(email).toLowerCase()]);
    if (rows.length === 0 || !bcrypt.compareSync(String(password), rows[0].passwordhash || rows[0].passwordHash)) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }
    const user = rows[0];
    res.json({ token: signToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/announcements', async (_req, res) => {
  const { rows } = await pool.query('SELECT id, title, content, link, active, createdat AS "createdAt" FROM announcements WHERE active = true ORDER BY createdat DESC');
  res.json(rows);
});

app.get('/api/articles', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM articles ORDER BY createdAt DESC');
  res.json(rows);
});

app.get('/api/articles/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: 'Artikel tidak ditemukan' });
  res.json(rows[0]);
});

app.post('/api/articles', auth(['admin', 'editor']), async (req, res) => {
  const { title, category, author, excerpt, body, tags, featured, image } = req.body;
  const id = crypto.randomUUID();
  const resolvedBody = body || excerpt || '';
  const resolvedTags = Array.isArray(tags) ? tags : String(tags || '').split(',').map(s => s.trim()).filter(Boolean);
  const resolvedImage = image || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=80';
  const { rows } = await pool.query(
    'INSERT INTO articles (id, title, category, author, excerpt, body, tags, featured, status, image) VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10) RETURNING *',
    [id, title, category, author, excerpt, resolvedBody, JSON.stringify(resolvedTags), Boolean(featured), 'published', resolvedImage]
  );
  res.json(rows[0]);
});

app.get('/api/admin/database', auth(['admin']), async (_req, res) => {
  const tables = ['users', 'articles', 'comments', 'releases', 'announcements'];
  const summary = {};
  for (const table of tables) {
    const { rows } = await pool.query(`SELECT COUNT(*)::int AS count FROM ${table}`);
    summary[table] = rows[0].count;
  }
  const { rows: userRows } = await pool.query('SELECT id, name, email, role, createdat AS "createdAt" FROM users ORDER BY createdat DESC LIMIT 10');
  const { rows: articleRows } = await pool.query('SELECT id, title, category, author, featured, status, createdat AS "createdAt" FROM articles ORDER BY createdat DESC LIMIT 10');
  const { rows: releaseRows } = await pool.query('SELECT id, bandname AS "bandName", title, status, createdat AS "createdAt" FROM releases ORDER BY createdat DESC LIMIT 10');
  res.json({ summary, users: userRows, articles: articleRows, releases: releaseRows });
});

app.get('/api/comments/article/:articleId', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM comments WHERE articleId = $1 ORDER BY createdAt ASC', [req.params.articleId]);
  res.json(rows);
});

app.post('/api/comments', auth(), async (req, res) => {
  const { articleId, content } = req.body;
  if (!articleId || !content) return res.status(400).json({ message: 'Komentar wajib diisi' });
  const { rows } = await pool.query(
    'INSERT INTO comments (id, articleId, userId, userName, content) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [crypto.randomUUID(), articleId, req.user.id, req.user.name, content]
  );
  res.json(rows[0]);
});

app.get('/api/releases', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM releases ORDER BY createdAt DESC');
  res.json(rows);
});

app.post('/api/releases', async (req, res) => {
  const { bandName, origin, title, type = 'Single', genre, spotifyUrl, youtubeUrl, description, cover } = req.body;
  if (!bandName || !title) return res.status(400).json({ message: 'Nama band dan judul rilisan wajib diisi' });
  const { rows } = await pool.query(
    `INSERT INTO releases (id, bandName, origin, title, type, genre, spotifyUrl, youtubeUrl, description, cover, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING id, bandName, origin, title, type, genre, spotifyUrl, youtubeUrl, description, cover, status, createdAt`,
    [crypto.randomUUID(), bandName, origin, title, type, genre, spotifyUrl, youtubeUrl, description, cover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', 'PENDING REVIEW']
  );
  res.json(rows[0]);
});

app.get('/api/admin/overview', auth(['admin']), async (_req, res) => {
  const users = await pool.query('SELECT COUNT(*)::int as count FROM users');
  const articles = await pool.query('SELECT COUNT(*)::int as count FROM articles');
  const comments = await pool.query('SELECT COUNT(*)::int as count FROM comments');
  const releases = await pool.query('SELECT COUNT(*)::int as count FROM releases');
  const active = await pool.query('SELECT COUNT(*)::int as count FROM announcements WHERE active = true');
  res.json({
    users: users.rows[0].count,
    articles: articles.rows[0].count,
    comments: comments.rows[0].count,
    releases: releases.rows[0].count,
    activeAnnouncements: active.rows[0].count
  });
});

app.listen(PORT, async () => {
  await initDB();
  console.log(`baypedia API running on http://localhost:${PORT}`);
});
