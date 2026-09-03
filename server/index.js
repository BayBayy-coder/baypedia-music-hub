import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readFile, writeFile, mkdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'baypedia-dev-secret-change-me';
const DATA_DIR = path.resolve('./server/data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

const ensureDB = async () => {
  if (!fs.existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    const seed = {
      users: [
        {
          id: 'admin-1',
          name: 'Admin baypedia',
          email: 'admin@baypedia.id',
          passwordHash: bcrypt.hashSync('Admin123!', 10),
          role: 'admin',
          createdAt: new Date().toISOString()
        }
      ],
      articles: [
        {
          id: 'art-1',
          title: 'Bernadya dan Fenomena "Satu Bulan"',
          category: 'Review & Analysis',
          author: 'Raka Pratama',
          excerpt: 'Bagaimana penyanyi muda asal Surabaya ini mengubah rasa kehilangan menjadi soundtrack kolektif.',
          status: 'published',
          createdAt: new Date().toISOString(),
          featured: true
        }
      ],
      comments: [],
      releases: [],
      announcements: [
        {
          id: 'ann-1',
          title: 'Open Submission Band Baru',
          content: 'Kirim rilisan baru untuk masuk ke radar editorial.',
          active: true,
          createdAt: new Date().toISOString()
        }
      ],
      captchas: {}
    };
    await writeFile(DB_FILE, JSON.stringify(seed, null, 2));
  }
};

const readDB = async () => JSON.parse(await readFile(DB_FILE, 'utf8'));
const writeDB = async (db) => writeFile(DB_FILE, JSON.stringify(db, null, 2));
const signToken = (user) => jwt.sign({ id: user.id, role: user.role, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

const auth = (roles = []) => (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.get('/api/health', async (_req, res) => {
  await ensureDB();
  res.json({ ok: true, service: 'baypedia-api', ts: new Date().toISOString() });
});

app.post('/api/auth/captcha', async (_req, res) => {
  await ensureDB();
  const a = Math.floor(10 + Math.random() * 89);
  const b = Math.floor(10 + Math.random() * 89);
  const challenge = `${a} + ${b}`;
  const answer = String(a + b);
  const id = crypto.randomUUID();
  const db = await readDB();
  db.captchas[id] = { answer, expiresAt: Date.now() + 10 * 60 * 1000 };
  await writeDB(db);
  res.json({ captchaId: id, challenge, optional: true });
});

app.post('/api/auth/register', async (req, res) => {
  await ensureDB();
  const { name, email, password, captchaId, captchaAnswer } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
  const db = await readDB();
  if (db.users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) {
    return res.status(409).json({ message: 'Email sudah terdaftar' });
  }

  if (captchaId && captchaAnswer) {
    const record = db.captchas[captchaId];
    if (!record || record.expiresAt < Date.now() || String(captchaAnswer).trim() !== record.answer) {
      return res.status(400).json({ message: 'Captcha gagal diverifikasi' });
    }
    delete db.captchas[captchaId];
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    role: 'user',
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  await writeDB(db);
  const token = signToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.post('/api/auth/login', async (req, res) => {
  await ensureDB();
  const { email, password } = req.body;
  const db = await readDB();
  const user = db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user || !bcrypt.compareSync(String(password), user.passwordHash)) {
    return res.status(401).json({ message: 'Email atau password salah' });
  }
  const token = signToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.get('/api/announcements', async (_req, res) => {
  await ensureDB();
  const db = await readDB();
  res.json(db.announcements.filter((a) => a.active));
});

app.get('/api/articles', async (_req, res) => {
  await ensureDB();
  const db = await readDB();
  res.json(db.articles);
});

app.post('/api/articles', auth(['admin']), async (req, res) => {
  await ensureDB();
  const { title, category, author, excerpt, featured } = req.body;
  const db = await readDB();
  const article = {
    id: crypto.randomUUID(),
    title,
    category,
    author,
    excerpt,
    featured: Boolean(featured),
    status: 'published',
    createdAt: new Date().toISOString()
  };
  db.articles.unshift(article);
  await writeDB(db);
  res.json(article);
});

app.post('/api/comments', auth(), async (req, res) => {
  await ensureDB();
  const { articleId, content } = req.body;
  if (!articleId || !content) return res.status(400).json({ message: 'Komentar wajib diisi' });
  const db = await readDB();
  const comment = {
    id: crypto.randomUUID(),
    articleId,
    userId: req.user.id,
    userName: req.user.name,
    content,
    createdAt: new Date().toISOString()
  };
  db.comments.unshift(comment);
  await writeDB(db);
  res.json(comment);
});

app.get('/api/admin/overview', auth(['admin']), async (_req, res) => {
  await ensureDB();
  const db = await readDB();
  res.json({
    users: db.users.length,
    articles: db.articles.length,
    comments: db.comments.length,
    releases: db.releases.length,
    activeAnnouncements: db.announcements.filter((a) => a.active).length
  });
});

app.post('/api/releases', auth(['admin', 'user']), async (req, res) => {
  await ensureDB();
  const db = await readDB();
  const release = { id: crypto.randomUUID(), ...req.body, createdAt: new Date().toISOString(), status: 'pending' };
  db.releases.unshift(release);
  await writeDB(db);
  res.json(release);
});

app.listen(PORT, async () => {
  await ensureDB();
  console.log(`baypedia API running on http://localhost:${PORT}`);
});
