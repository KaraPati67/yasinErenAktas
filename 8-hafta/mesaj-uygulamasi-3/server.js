const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = {}; // socket.id -> {name, color}

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    // Kullanıcı kaydı
    socket.on('register', ({ name, color }) => {
        users[socket.id] = { name, color, socketId: socket.id };
        io.emit('userlist', Object.values(users));
    });

    // Genel mesaj
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // DM mesajı
    socket.on('private message', ({ to, msg }) => {
        const fromUser = users[socket.id];
        if (fromUser && users[to]) {
            // Hem alıcıya hem gönderene iletilir
            io.to(to).emit('private message', { from: socket.id, msg, user: fromUser });
            socket.emit('private message', { from: socket.id, msg, user: fromUser });
        }
    });

    // Bağlantı kopunca kullanıcıyı sil
    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('userlist', Object.values(users));
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});