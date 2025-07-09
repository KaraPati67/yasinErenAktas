class Kullanici {
    constructor(ad, soyad, email, yas) {
        this.ad = ad;
        this.soyad = soyad;
        this.email = email;
        this.yas = yas;
    }

    bilgileriGoster() {
        console.log(`\nAd: ${this.ad}\nSoyad: ${this.soyad}\nE-posta: ${this.email}\nYaş: ${this.yas}\n`);
    }
}
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Kullanıcıdan bilgi alma
rl.question('Adınızı girin: ', (ad) => {
    rl.question('Soyadınızı girin: ', (soyad) => {
        rl.question('E-posta adresinizi girin: ', (email) => {
            rl.question('Yaşınızı girin: ', (yas) => {
                const kullanici = new Kullanici(ad, soyad, email, Number(yas));
                kullanici.bilgileriGoster();
                rl.close();
            });
        });
    });
});
