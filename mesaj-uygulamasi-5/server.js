const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Veritabanı bağlantısı
const dbPath = path.join(__dirname, 'chat.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err.message);
    } else {
        console.log('SQLite veritabanına bağlanıldı.');
    }
});

// Kullanıcılar ve mesajlar tabloları oluşturuluyor
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        socketId TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT NOT NULL,
        color TEXT NOT NULL,
        text TEXT NOT NULL,
        toSocketId TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

let users = {}; // socket.id -> {name, color, socketId, isGuest}

app.use(express.static(__dirname));

io.on('connection', (socket) => {

    // Kullanıcı kaydı
    socket.on('register', ({ name, color, isGuest }) => {
        // Misafir mi kontrolü (isGuest parametresi gelmezse false say)
        isGuest = !!isGuest;
        users[socket.id] = { name, color, socketId: socket.id, isGuest };
        if (!isGuest) {
            // Kayıtlı kullanıcıyı veritabanına ekle (varsa güncelle)
            db.get('SELECT * FROM users WHERE name = ?', [name], (err, row) => {
                if (row) {
                    db.run('UPDATE users SET color = ?, socketId = ? WHERE name = ?', [color, socket.id, name]);
                } else {
                    db.run('INSERT INTO users (name, color, socketId) VALUES (?, ?, ?)', [name, color, socket.id]);
                }
            });
            // Kayıtlı kullanıcıya eski mesajlarını gönder
            db.all('SELECT sender, color, text, toSocketId, created_at FROM messages WHERE (sender = ? OR toSocketId = ?) ORDER BY created_at ASC', [name, socket.id], (err, rows) => {
                if (!err && rows) {
                    socket.emit('message history', rows);
                }
            });
        }
        io.emit('userlist', Object.values(users));
    });

    // Genel mesaj
    socket.on('chat message', (msg) => {
        const user = users[socket.id];
        // Sadece kayıtlı kullanıcıların mesajı kaydedilsin
        if (user && !user.isGuest) {
            db.run('INSERT INTO messages (sender, color, text, toSocketId) VALUES (?, ?, ?, NULL)', [msg.name, msg.color, msg.text]);
        }
        io.emit('chat message', msg);
    });

    // DM mesajı
    socket.on('private message', ({ to, msg }) => {
        const fromUser = users[socket.id];
        if (fromUser && users[to]) {
            // Sadece kayıtlı kullanıcıların mesajı kaydedilsin
            if (!fromUser.isGuest) {
                db.run('INSERT INTO messages (sender, color, text, toSocketId) VALUES (?, ?, ?, ?)', [fromUser.name, fromUser.color, msg, to]);
            }
            // Gönderen misafir olsa bile mesajı hem alıcıya hem gönderenine ilet
            io.to(to).emit('private message', { from: socket.id, msg, user: fromUser });
            if (to !== socket.id) {
                socket.emit('private message', { from: socket.id, msg, user: fromUser });
            }
        }
    });

    // Bağlantı kopunca kullanıcıyı sil
    socket.on('disconnect', () => {
        if (users[socket.id]) {
            // Kullanıcının socketId'sini null yap
            db.run('UPDATE users SET socketId = NULL WHERE socketId = ?', [socket.id]);
        }
        delete users[socket.id];
        io.emit('userlist', Object.values(users));
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});