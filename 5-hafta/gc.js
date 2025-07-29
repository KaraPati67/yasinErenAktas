const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const notes = [];

function menu() {
    rl.question("\nİşlem seçin.\n1: Not Ekle\n2: Notları Listele\n3: Not Sil\n0: Çıkış\nSeçiminiz: ", (secim) => {
        switch (secim) {
            case '1':
                notEkle(() => menu());
                break;
            case '2':
                notListele(() => menu());
                break;
            case '3':
                notSil(() => menu());
                break;
            case '0':
                console.log("Çıkılıyor...");
                rl.close();
                process.exit(0); // Programı tamamen sonlandır
                break;
            default:
                console.log("\nGeçersiz seçim.");
                menu();
        }
    });
}

function notEkle(callback) {
    rl.question("\nNotunuzu girin: ", (not) => {
        notes.push({ content: not, timestamp: Date.now() });
        console.log(`\nNot eklendi: ${not}`);
        callback();
    });
}

function notListele(callback) {
    console.log("\nNotlar:");
    notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.content}\n`);
    });
    callback();
}

function notSil(callback) {
    console.log("\nNotlar:");
    notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.content}\n`);
    });

    rl.question("\nSilmek istediğiniz notun numarasını girin: ", (numara) => {
        const index = parseInt(numara) - 1;
        if (index >= 0 && index < notes.length) {
            notes.splice(index, 1);
            console.log(`\nNot ${numara} silindi.`);
        } else {
            console.log("\nGeçersiz numara.");
        }
        callback();
    });
}

setInterval(() => {
    const now = Date.now();
    notes.forEach((note, index) => {
        if (now - note.timestamp > 30000) {
            console.log(`\nNot otomatik olarak silindi: ${note.content}`);
            notes.splice(index, 1);
        }
    });
}, 1000);

menu();
