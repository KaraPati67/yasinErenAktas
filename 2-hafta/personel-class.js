const { stdin } = require('process');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class Personel {
    constructor(ad, soyad, no) {
        this.ad = ad;
        this.soyad = soyad;
        this.no = no;
        this.girisZamani = null;
        this.cikisZamani = null;
    }

    girisYap() {
        this.girisZamani = new Date();
        console.log(`(${this.ad} ${this.soyad}) giriş yaptı: ${this.girisZamani.toLocaleString()}`);
    }

    cikisYap() {
        this.cikisZamani = new Date();
        console.log(`(${this.ad} ${this.soyad}) çıkış yaptı: ${this.cikisZamani.toLocaleString()}`);
    }
}

// Personel listesi
const personeller = [];

function personelEkle() {
    readline.question('Personel adını giriniz: ', (ad) => {
        readline.question('Personel soyadını giriniz: ', (soyad) => {
            const no = Math.floor(Math.random() * 100000);
            const yeniPersonel = new Personel(ad, soyad, no);
            personeller.push(yeniPersonel);
            console.log(`Yeni personel eklendi: ${yeniPersonel.ad} ${yeniPersonel.soyad} (${yeniPersonel.no})`);
            devamSor();
        });
    });
}

function girisYap() {
    readline.question('Personel no giriniz: ', (no2) => {
        const p = personeller.find(p => p.no == no2);
        if (p) {
            p.girisYap();
        } else {
            console.log('Böyle bir personel bulunamadı.');
        }
        devamSor();
    });
}

function cikisYap() {
    readline.question('Personel no giriniz: ', (no2) => {
        const p = personeller.find(p => p.no == no2);
        if (p) {
            p.cikisYap();
        } else {
            console.log('Böyle bir personel bulunamadı.');
        }
        devamSor();
    });
}

function personelCikar() {
    readline.question('Çıkarmak istediğiniz personelin no giriniz: ', (no2) => {
        const index = personeller.findIndex(p => p.no == no2);
        if (index !== -1) {
            const silinen = personeller.splice(index, 1)[0];
            console.log(`Personel çıkarıldı: ${silinen.ad} ${silinen.soyad} (${silinen.no})`);
        } else {
            console.log('Böyle bir personel bulunamadı.');
        }
        devamSor();
    });
}

function girisCikisListele() {
    if (personeller.length === 0) {
        console.log('Kayıtlı personel yok.');
    } else {
        personeller.forEach(p => {
            console.log(`${p.ad} ${p.soyad} (${p.no}) | Giriş: ${p.girisZamani ? p.girisZamani.toLocaleString() : '-'} | Çıkış: ${p.cikisZamani ? p.cikisZamani.toLocaleString() : '-'}`);
        });
    }
    devamSor();
}

function devamSor() {
    console.log('\nESC: Programı kapat');
    readline.question('\n1: Giriş Yap\n2: Çıkış Yap\n3: Personel Ekle\n4: Personel Çıkar\n5: Giriş/Çıkış Listele\nSeçilen: ', (secim) => {
        switch(secim) {
            case '1': girisYap(); break;
            case '2': cikisYap(); break;
            case '3': personelEkle(); break;
            case '4': personelCikar(); break;
            case '5': girisCikisListele(); break;
            default: console.log('Geçersiz seçim.'); devamSor();
        }
    });
}

// ESC, +, - tuşlarını sadece bir kez dinle
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
    process.stdin.on('data', (key) => {
        if (key[0] === 27) { // ESC tuşu
            console.log('\nProgram sonlandırılıyor.');
            readline.close();
            process.exit();
        }
    });
}
// Programı başlat
devamSor();