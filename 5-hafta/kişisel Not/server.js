const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const USERS_FILE = path.join(__dirname, "users.json");

// Masaüstü klasör yolu
const masaustuYolu = path.join(require('os').homedir(), 'Desktop', 'Notlar');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return data ? JSON.parse(data) : [];
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Kullanıcı adı ve şifre gerekli." });
  }
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ success: false, message: "Bu kullanıcı adı zaten var." });
  }
  users.push({ username, password });
  writeUsers(users);
  res.json({ success: true, message: "Kayıt başarılı." });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, message: "Giriş başarılı." });
    res.redirect('/not-gir.html');
  } else {
    res.status(401).json({ success: false, message: "Kullanıcı adı veya şifre hatalı." });
  }
});

app.post('/delete', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Kullanıcı adı ve şifre gerekli.' });
  }
  let users = readUsers();
  const userIndex = users.findIndex(u => u.username === username && u.password === password);
  if (userIndex === -1) {
    return res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı.' });
  }
  users.splice(userIndex, 1);
  writeUsers(users);
  return res.json({ message: 'Hesap silindi.' });
});

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.use(express.static(__dirname));

const server = app.listen(PORT, () => {
  console.log(`Backend http://localhost:${PORT} adresinde çalışıyor.`);
});

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', function (key) {
    if (key.toString() === '\x1B') {
      console.log('ESC tuşuna basıldı, sunucu durduruluyor...');
      server.close(() => {
        console.log('Sunucu durdu.');
        process.exit(0);
      });
    }
  });
}

// Kullanıcıya özel not kaydetme
app.post('/uploadNote', (istek, cevap) => {
  const { not, username } = istek.body;
  if (!not || !username) {
    return cevap.status(400).send('Not içeriği ve kullanıcı adı gerekli.');
  }

  const kullaniciKlasoru = path.join(masaustuYolu, username);

  // Kullanıcı klasörü yoksa oluştur
  if (!fs.existsSync(kullaniciKlasoru)) {
    fs.mkdirSync(kullaniciKlasoru);
  }

  const dosyaAdi = `not_${Date.now()}.txt`;
  const dosyaYolu = path.join(kullaniciKlasoru, dosyaAdi);

  fs.writeFile(dosyaYolu, not, (hata) => {
    if (hata) {
      console.error('Not kaydedilirken hata oluştu:', hata);
      return cevap.status(500).send('Not kaydedilemedi.');
    }
    cevap.send('Not başarıyla kaydedildi.');
  });
});

// Kullanıcıya özel notları listeleme
app.get('/getNotes/:username', (istek, cevap) => {
  const { username } = istek.params;
  const kullaniciKlasoru = path.join(masaustuYolu, username);

  if (!fs.existsSync(kullaniciKlasoru)) {
    return cevap.status(404).send('Kullanıcıya ait not bulunamadı.');
  }

  fs.readdir(kullaniciKlasoru, (hata, dosyalar) => {
    if (hata) {
      console.error('Notlar listelenirken hata oluştu:', hata);
      return cevap.status(500).send('Notlar alınamadı.');
    }

    const notlar = dosyalar.map((dosya) => {
      const dosyaYolu = path.join(kullaniciKlasoru, dosya);
      return fs.readFileSync(dosyaYolu, 'utf-8');
    });

    cevap.json(notlar);
  });
});

// Kullanıcıya özel not silme
app.delete('/deleteNote/:username/:index', (istek, cevap) => {
  const { username, index } = istek.params;
  const indeks = parseInt(index, 10);
  const kullaniciKlasoru = path.join(masaustuYolu, username);

  if (!fs.existsSync(kullaniciKlasoru)) {
    return cevap.status(404).send('Kullanıcıya ait not bulunamadı.');
  }

  fs.readdir(kullaniciKlasoru, (hata, dosyalar) => {
    if (hata) {
      console.error('Notlar listelenirken hata oluştu:', hata);
      return cevap.status(500).send('Notlar alınamadı.');
    }

    if (indeks < 0 || indeks >= dosyalar.length) {
      return cevap.status(400).send('Geçersiz not indeksi.');
    }

    const dosyaYolu = path.join(kullaniciKlasoru, dosyalar[indeks]);
    fs.unlink(dosyaYolu, (hata) => {
      if (hata) {
        console.error('Not silinirken hata oluştu:', hata);
        return cevap.status(500).send('Not silinemedi.');
      }
      cevap.send('Not başarıyla silindi.');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
