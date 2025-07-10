// Node.js ve sqlite ile kullanıcı kaydı örneği
// Önce terminalde: npm install sqlite3

const sqlite3 = require('sqlite3').verbose();
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Veritabanı dosyasını oluştur veya aç
const db = new sqlite3.Database('kullanicilar.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS kullanici (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ad TEXT NOT NULL,
        soyad TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )`);
});

function kullaniciEkle() {
    readline.question('Ad: ', (ad) => {
        readline.question('Soyad: ', (soyad) => {
            readline.question('Email: ', (email) => {
                db.run('INSERT INTO kullanici (ad, soyad, email) VALUES (?, ?, ?)', [ad, soyad, email], function(err) {
                    if (err) {
                        console.log('Kayıt eklenemedi:', err.message);
                    } else {
                        console.log('Kullanıcı eklendi, id:', this.lastID);
                    }
                    kullanicilariListele();
                });
            });
        });
    });
}

function kullanicilariListele() {
    db.all('SELECT * FROM kullanici', (err, rows) => {
        if (err) {
            console.log('Listeleme hatası:', err.message);
        } else {
            console.log('\nKayıtlı Kullanıcılar:');
            rows.forEach(k => {
                console.log(`ID: ${k.id} | Ad: ${k.ad} | Soyad: ${k.soyad} | Email: ${k.email}`);
            });
        }
        readline.close();
        db.close();
    });
}

kullaniciEkle();
