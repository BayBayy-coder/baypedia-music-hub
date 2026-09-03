export const ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "🚨 OPEN SUBMISSION BAND INDIE 2026",
    content: "Daftarkan karya rilis terbarumu di baypedia Radar! Rilisan terpilih akan masuk ke Playlist Pilihan & Featured Editorial minggu depan.",
    badge: "SUBMIT NOW",
    link: "#submit-release",
    priority: "high",
    date: "2026-09-03"
  },
  {
    id: "ann-2",
    title: "🎉 baypedia X SyncFest Showcase",
    titleLong: "Kolaborasi Spesial Panggung Band Pendatang Baru",
    content: "baypedia resmi jadi official media partner festival musik terbesar. Simak daftar 10 band kampus terpilih!",
    badge: "EVENT",
    link: "/pages/gigs",
    priority: "medium",
    date: "2026-09-01"
  }
];

export const FEATURED_ARTICLES = [
  {
    id: "art-1",
    title: "Bernadya dan Fenomena 'Satu Bulan' yang Menembus 250 Juta Stream",
    category: "Review & Analysis",
    author: "Raka Pratama",
    date: "3 Sep 2026",
    readTime: "7 min",
    excerpt: "Bagaimana penyanyi muda asal Surabaya ini berhasil menguraikan rasa kehilangan menjadi soundtrack kolektif anak muda Indonesia.",
    tags: ["Bernadya", "Pop Indie", "Viral"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    trending: true
  },
  {
    id: "art-2",
    title: "Hindia & Pesta Sedang Merayakan Mati: Eksplorasi Seni Katarsis di Era Modern",
    category: "Editorial",
    author: "Maya Kirana",
    date: "2 Sep 2026",
    readTime: "9 min",
    excerpt: "Baskara Putra mengemas quarter-life crisis dengan estetika visual dan audio yang memukau.",
    tags: ["Hindia", "Alternative", "Jakarta"],
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    trending: true
  },
  {
    id: "art-3",
    title: "For Revenge Lepas Single 'Penyangkalan': Puncak Emo-Pop Generasi Baru",
    category: "Gig & Single Review",
    author: "Doni Prasetyo",
    date: "1 Sep 2026",
    readTime: "5 min",
    excerpt: "Unit Emo asal Bandung ini membuktikan bahwa musik dengan lirisisme mendalam tidak pernah ditinggalkan penggemarnya.",
    tags: ["For Revenge", "Emo Pop", "Bandung"],
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    trending: true
  },
  {
    id: "art-4",
    title: "Mengabaikan Tren TikTok: Cara Arctic Monkeys Bertahan Lebih dari Dwi Darsa",
    category: "International Spotlight",
    author: "Almantas",
    date: "30 Aug 2026",
    readTime: "11 min",
    excerpt: "Dari garage rock hingga orchestral pop, evolusi band Sheffield yang tak pernah gagal menginspirasi band lokal.",
    tags: ["Arctic Monkeys", "Rock", "UK"],
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    trending: false
  }
];

export const SUBMITTED_RELEASES = [
  {
    id: "rel-1",
    bandName: "Batas Senja",
    origin: "Lampung",
    title: "Hati dan Perasaan",
    type: "Album Perdana",
    genre: "Folk Pop",
    releaseDate: "28 Aug 2026",
    spotifyUrl: "https://spotify.com",
    youtubeUrl: "https://youtube.com",
    status: "APPROVED / FEATURED",
    description: "Koleksi 10 lagu yang menceritakan dinamika hubungan anak muda masa kini dengan balutan akustik hangat.",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rel-2",
    bandName: "Kirribilly",
    origin: "Jakarta",
    title: "Liverpool Echoes",
    type: "Single",
    genre: "Indie Rock",
    releaseDate: "26 Aug 2026",
    spotifyUrl: "https://spotify.com",
    youtubeUrl: "https://youtube.com",
    status: "APPROVED / FEATURED",
    description: "Supergrup lokal yang baru saja guncang panggung International Beatleweek di Inggris.",
    cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rel-3",
    bandName: "Stepforward",
    origin: "Jakarta",
    title: "Tak Pernah Mati EP",
    type: "EP",
    genre: "Hardcore",
    releaseDate: "30 Aug 2026",
    spotifyUrl: "https://spotify.com",
    youtubeUrl: "https://youtube.com",
    status: "APPROVED",
    description: "Peringati 3 dekade berkarya dengan energi yang tetap membara.",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80"
  }
];

export const INDIE_RADAR_CHARTS = [
  { rank: 1, band: "Bernadya", track: "Satu Bulan", plays: "245M", trend: "UP" },
  { rank: 2, band: "Hindia", track: "Evaluasi", plays: "198M", trend: "SAME" },
  { rank: 3, band: "For Revenge", track: "Penyangkalan", plays: "112M", trend: "UP" },
  { rank: 4, band: "Nadin Amizah", track: "Bertaut", plays: "180M", trend: "SAME" },
  { rank: 5, band: "Sal Priadi", track: "Gala Bunga Matahari", plays: "95M", trend: "UP" },
  { rank: 6, band: "Batas Senja", track: "Hati dan Perasaan", plays: "42M", trend: "NEW" },
  { rank: 7, band: "Reality Club", track: "Anything You Want", plays: "88M", trend: "DOWN" },
  { rank: 8, band: "Pamungkas", track: "To The Bone", plays: "310M", trend: "SAME" }
];
