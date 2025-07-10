
// Temel sınıf (superclass)

class Hayvan {
    constructor(ad) {
        this.ad = ad;
    }
    sesCikar() {
        console.log(`${this.ad} bir ses çıkardı.`);
    }
}

// Alt sınıf (subclass) - Kedi
class Kedi extends Hayvan {
    constructor(ad, renk) {
        super(ad);
        this.renk = renk;
    }
    sesCikar() {
        console.log(`${this.ad} miyavladı!`);
    }
}

// Alt sınıf (subclass) - Köpek
class Kopek extends Hayvan {
    constructor(ad, cins) {
        super(ad);
        this.cins = cins;
    }
    sesCikar() {
        console.log(`${this.ad} havladı!`);
    }
}

// Kullanım örneği - Nesneleri diziye ekleyip liste şeklinde yazdırma
const hayvanlar = [
    new Kedi('Pamuk', 'beyaz'),
    new Kopek('Karabaş', 'Kangal'),
    new Hayvan('Hayvan')
];

hayvanlar.forEach(h => h.sesCikar());