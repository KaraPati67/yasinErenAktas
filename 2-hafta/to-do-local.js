const fs = require('fs');
const readline = require('readline');

const FILE = 'todo.json';

function gorevleriYukle() {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
}

function gorevleriKaydet(gorevler) {
    fs.writeFileSync(FILE, JSON.stringify(gorevler, null, 2));
}

function gorevEkle() {
    rl.question('\nYeni görev: ', (gorev) => {
        if (!gorev.trim()) return anaMenu();
        const gorevler = gorevleriYukle();
        gorevler.push(gorev.trim());
        gorevleriKaydet(gorevler);
        console.log('\nGörev eklendi.');
        anaMenu();
    });
}

function gorevSil() {
    const gorevler = gorevleriYukle();
    gorevleriListele();
    rl.question('\nSilinecek görev numarası: ', (i) => {
        const idx = parseInt(i) - 1;
        if (isNaN(idx) || idx < 0 || idx >= gorevler.length) {
            console.log('\nGeçersiz seçim.');
            return anaMenu();
        }
        gorevler.splice(idx, 1);
        gorevleriKaydet(gorevler);
        console.log('\nGörev silindi.');
        anaMenu();
    });
}

function gorevleriListele() {
    const gorevler = gorevleriYukle();
    if (gorevler.length === 0) {
        console.log('\nHiç görev yok.');
    } else {
        gorevler.forEach((g, i) => console.log(`\n${i + 1}. ${g}`));
    }
}

function anaMenu() {
    rl.question('\n1: Görevleri listele\n2: Görev ekle\n3: Görev sil\n4: Çıkış\n', (secim) => {
        switch (secim) {
            case '1': gorevleriListele(); anaMenu(); break;
            case '2': gorevEkle(); break;
            case '3': gorevSil(); break;
            case '4': rl.close(); break;
            default: console.log('Geçersiz seçim.'); anaMenu();
        }
    });
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
anaMenu();