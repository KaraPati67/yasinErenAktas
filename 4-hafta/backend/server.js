const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// Statik dosyalar (CSS, HTML vb.)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Session ayarları
app.use(session({
  secret: 'gizli-anahtar',
  resave: false,
  saveUninitialized: true
}));

// Veritabanı bağlantısı ve tablo oluşturma
const db = new sqlite3.Database("veritabani.db", (err) => {
  if (err) return console.error(err.message);
  db.run(`
    CREATE TABLE IF NOT EXISTS kullanicilar (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kullanici TEXT UNIQUE,
      sifre TEXT
    )
  `);
});

// Anasayfa
app.get("/anasayfa", (req, res) => {
  const kullanici = req.session.kullanici || null;

  const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Anasayfa</title>
  <link rel="stylesheet" href="/style.css">
  <style>
    .menu-kutu {
      background-color: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .menu-kutu h1 {
      margin-bottom: 20px;
      color: #333;
    }
    .butonlar {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .butonlar a {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .butonlar a:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="menu-kutu">
    <h1>Merhaba ${kullanici ? kullanici : 'Ziyaretçi'} 👋</h1>
    <div class="butonlar">
      ${
        kullanici
          ? `<a href="/cikis">Çıkış Yap</a>`
          : `<a href="/giris">Giriş Yap</a><a href="/kayit">Kayıt Ol</a>`
      }
    </div>
  </div>
</body>
</html>
  `;

  res.send(html);
});

// Giriş sayfası (form)
app.get("/giris", (req, res) => {
  res.sendFile(path.join(__dirname, "public/giris.html"));
});

// Kayıt sayfası (form)
app.get("/kayit", (req, res) => {
  res.sendFile(path.join(__dirname, "public/kayit.html"));
});

// Giriş POST işlemi
app.post("/giris", (req, res) => {
  const { kullanici, sifre } = req.body;

  db.get(`SELECT * FROM kullanicilar WHERE kullanici = ? AND sifre = ?`, [kullanici, sifre], (err, row) => {
    if (err) return res.send("Hata oluştu.");
    if (row) {
      req.session.kullanici = row.kullanici;
      res.redirect("/anasayfa");
    } else {
      res.sendFile(path.join(__dirname, "public/giris-basarisiz.html"));
    }
  });
});

// Kayıt POST işlemi
app.post("/kayit", (req, res) => {
  const { kullanici, sifre } = req.body;

  db.run(`INSERT INTO kullanicilar (kullanici, sifre) VALUES (?, ?)`, [kullanici, sifre], function(err) {
    if (err) {
      return res.sendFile(path.join(__dirname, "public/kayit-basarisiz.html"));
    }
    res.sendFile(path.join(__dirname, "public/kayit-basarili.html"));
  });
});

// Çıkış
app.get("/cikis", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/anasayfa");
  });
});

// Ana yönlendirme
app.get("/", (req, res) => {
  res.redirect("/anasayfa");
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
