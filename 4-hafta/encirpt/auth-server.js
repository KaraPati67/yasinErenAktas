const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const USERS_FILE = path.join(__dirname, "users.json");

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
