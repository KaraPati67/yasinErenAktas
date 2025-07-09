const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Araba {
    constructor(marka, model, yil) {
        this.marka = marka;
        this.model = model;
        this.yil = yil;
        this.id = Math.floor(Math.random() * 10000); // Rastgele bir ID oluştur
    }

    bilgileriGoster() {
        console.log(`Araba Markası: ${this.marka}, Model: ${this.model}, Üretim Yılı: ${this.yil}, ID: ${this.id}`);
    }
}

// Birden fazla araç bilgisini tutmak için bir dizi kullanıyoruz
const arabalar = [];

function arabaEkle() {
    rl.question('Araba markasını giriniz: ', (marka) => {
        rl.question('Araba modelini giriniz: ', (model) => {
            rl.question('Araba üretim yılını giriniz: ', (yil) => {
                const yeniAraba = new Araba(marka, model, yil);
                arabalar.push(yeniAraba);
                console.log('Araba bilgileri kaydedildi.');
                yeniAraba.bilgileriGoster();
                console.log(`Araç bilgilerini silmek veya güncellemek için araç Id'nizi not edin.`);
                devamSor();
            });
        });
    });
}

function arabaGuncelle() {
    rl.question('Bilgisini değiştirmek istediğiniz aracın ID giriniz: ', (id2) => {
        const araba = arabalar.find(a => a.id == id2);
        if (araba) {
            function bilgiSor() {
                rl.question("değiştirmek istediğiniz bilgi (marka, model, yil, bitir): ", (bilgi) => {
                    bilgi = bilgi.toLowerCase();
                    switch (bilgi) {
                        case 'marka':
                            rl.question('Yeni marka: ', (guncelMarka) => {
                                araba.marka = guncelMarka;
                                bilgiSor();
                            });
                            break;
                        case 'model':
                            rl.question('Yeni model: ', (guncelModel) => {
                                araba.model = guncelModel;
                                bilgiSor();
                            });
                            break;
                        case 'yil':
                            rl.question('Yeni üretim yılı: ', (guncelYil) => {
                                araba.yil = guncelYil;
                                bilgiSor();
                            });
                            break;
                        case 'bitir':
                            console.log('Araba bilgileri güncellendi.');
                            araba.bilgileriGoster();
                            devamSor();
                            break;
                        default:
                            console.log('Geçersiz bilgi. Lütfen "marka", "model", "yil" veya "bitir" giriniz.');
                            bilgiSor();
                    }
                });
            }
            bilgiSor();
        } else {
            console.log('Araba ID bulunamadı.');
            devamSor();
        }
    });
}

function arabaSil() {
    rl.question('Bilgisini silmek istediğiniz aracın ID giriniz: ', (id2) => {
        const index = arabalar.findIndex(a => a.id == id2);
        if (index !== -1) {
            arabalar.splice(index, 1);
            console.log('Araba bilgileri silindi.');
        } else {
            console.log('Araba ID bulunamadı.');
        }
        devamSor();
    });
}

function arabalarListesi() {
    if (arabalar.length === 0) {
        console.log('Kayıtlı araba yok.');
    } else {
        arabalar.forEach(a => a.bilgileriGoster());
    }
    devamSor();
}

function devamSor() {
    rl.question('\n1: Araba Ekle\n2: Araba Güncelle\n3: Araba Sil\n4: Arabaları Listele\n5: Çıkış\nSeçiminiz: ', (secim) => {
        switch(secim) {
            case '1': arabaEkle(); break;
            case '2': arabaGuncelle(); break;
            case '3': arabaSil(); break;
            case '4': arabalarListesi(); break;
            case '5': rl.close(); break;
            default: console.log('Geçersiz seçim.'); devamSor();
        }
    });
}
devamSor();