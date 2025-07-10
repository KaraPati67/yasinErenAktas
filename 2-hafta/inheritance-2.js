class Vasita {
    constructor(marka, model, yil, mHacim, beygir) {
        this.marka = marka;
        this.model = model;
        this.yil = yil;
        this.mHacim = mHacim;
        this.beygir = beygir;
    }
}

class Otomobil extends Vasita {
    constructor(marka, model, motor, paket, yil, mHacim, beygir, km, renk) {
        super(marka, model, yil, mHacim, beygir);
        this.paket = paket;
        this.motor = motor;
        this.renk = renk;
        this.km = km;
    }

    bilgiYazdir() {
        console.log(`Marka: ${this.marka}, Model: ${this.model}, Yıl: ${this.yil}, Motor: ${this.motor}L, Paket: ${this.paket}, Beygir: ${this.beygir}, KM: ${this.km}, Renk: ${this.renk}`);
    }
}

class Kamyon extends Vasita {
    constructor(marka, model, yil, yukKapasi) {
        super(marka, model, yil);
        this.yukKapasi = yukKapasi;
    }

    bilgiYazdir() {
        console.log(`Marka: ${this.marka}, Model: ${this.model}, Yıl: ${this.yil}, Yük Kapasitesi: ${this.yukKapasi}`);
    }
}

const otomobil1 = new Otomobil('Toyota', 'Corolla', '1.8 Hybrit', 'Full', 2023, '1.8L', 140, 15000, 'Beyaz');
otomobil1.bilgiYazdir();
const otomobil2 = new Otomobil('Honda', 'Civic', '2.0 Turbo', 'Type R', 2024, '2.0L', 320, 5000, 'Kırmızı');
otomobil2.bilgiYazdir();
const otomobil3 = new Otomobil('Ford', 'Focus', '1.5 EcoBoost', 'Titanium Plus', 2022, '1.5L', 180, 30000, 'Mavi');
otomobil3.bilgiYazdir();
const otomobil4 = new Otomobil('Honda', 'Civic', '1.6', 'VTI', 1999, '1.6L', 160, 320000, 'Gümüş');
otomobil4.bilgiYazdir();
const otomobil5 = new Otomobil('Honda', 'Civic', '1.6I VTEC', 'Executive', 2014, '1.6L', 125, 180000, 'Füme');
otomobil5.bilgiYazdir();
const otomobil6 = new Otomobil('Honda', 'Civic', '1.6', 'VTI', 2000, '2.4', 600, 200000, 'Gümüş');
const kamyon1 = new Kamyon('Scania', '770S', 2024, '35 ton');
kamyon1.bilgiYazdir();