const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

class Kisi {
  #sır = "Bu gizli bilgi!";
  constructor(ad, yas, okulAdi = null) {
    this.ad = ad;
    this.yas = yas;
    this.okulAdi = okulAdi;
  }

  kendiniTanıt() {
    console.log(`Merhaba, ben ${this.ad}, ${this.yas} yaşındayım.`);
  }

  sirriGoster() {
    return this.#sır;
  }
}

class Ogrenci extends Kisi {
  constructor(ad, yas, okulAdi) {
    super(ad, yas, okulAdi);
  }

  kendiniTanıt() {
    console.log(`Merhaba, ben ${this.ad}, ${this.yas} yaşındayım ve ${this.okulAdi} öğrencisiyim.`);
  }
}

class Ogretmen extends Kisi {
  constructor(ad, yas, okulAdi, brans) {
    super(ad, yas, okulAdi);
    this.brans = brans;
  }

  kendiniTanıt() {
    console.log(`Merhaba, ben ${this.ad}, ${this.yas} yaşındayım, branşım ${this.brans}, okulum: ${this.okulAdi}.`);
  }
}
Object.assign(Ogretmen.prototype,);

const kisiler = [];
const okullar = {};

function anaMenu() {
  console.log("");

  rl.question("\n=== Ana Menü ===\n1.Kişi Ekle\n2.Kişileri Listele\n3.Kişi Sil\n4.Okulları Listele\n5.Okula Göre Kişileri Listele\n6.Programı Sonlandır\n\nSeçiminiz : ", secim => {
    switch (secim) {
      case "1": kisiEkle(); break;
      case "2": kisileriListele(); break;
      case "3": kisiSil(); break;
      case "4": okullariListele(); break;
      case "5": okulaGoreKisileriListele(); break;
      case "0": rl.close(); break;
      default: console.log("Geçersiz seçim."); anaMenu();
    }
  });
}

function kisiEkle() {
  rl.question("\nKişi Tipi:\n1. Kisi\n2. Ogrenci\n3. Ogretmen\n0. Ana menüye dön\nSeçim : ", tip => {
    if (tip === "0") {
      anaMenu();
      return;
    }

    rl.question("Ad: ", ad => {

      function yasSor() {
        rl.question("Yaş (sadece sayı): ", yas => {
          const yasNum = parseInt(yas);
          if (isNaN(yasNum) || yas.trim() === "" || yasNum <= 0) {
            console.log("Lütfen geçerli bir yaş (1 ve üzeri sayı) girin.");
            yasSor();
            return;
          }

          if (tip === "1") {
            kisiler.push(new Kisi(ad, yasNum));
            anaMenu();
          } 
          else if (tip === "2" || tip === "3") {
            rl.question("Okul adı: ", okulAdi => {
              if (!okullar[okulAdi]) {
                console.log("Yeni okul, bilgi girin:");
                rl.question("Adres: ", adres => {

                  function kapasiteSor() {
                    rl.question("Kapasite (sadece sayı): ", kapasite => {
                      const kapasiteNum = parseInt(kapasite);
                      if (isNaN(kapasiteNum) || kapasite.trim() === "" || kapasiteNum <= 0) {
                        console.log("Lütfen geçerli bir kapasite (1 ve üzeri sayı) girin.");
                        kapasiteSor();
                        return;
                      }
                      okullar[okulAdi] = { adres, kapasite: kapasiteNum };
                      kisiEkleDevam(tip, ad, yasNum, okulAdi);
                    });
                  }

                  kapasiteSor();

                });
              } else {
                kisiEkleDevam(tip, ad, yasNum, okulAdi);
              }
            });
          } else {
            console.log("Geçersiz seçim.");
            anaMenu();
          }
        });
      }

      yasSor();
    });
  });
}



function kisiEkleDevam(tip, ad, yas, okulAdi) {
  if (tip === "2") {
    kisiler.push(new Ogrenci(ad, yas, okulAdi));
    anaMenu();
  } else if (tip === "3") {
    rl.question("Branş: ", brans => {
      kisiler.push(new Ogretmen(ad, yas, okulAdi, brans));
      anaMenu();
    });
  }
}

function kisileriListele() {
  console.log("\n=== Tüm Kişiler ===");
  if (kisiler.length === 0) {
    console.log("Kayıtlı kişi bulunamadı.");
  } else {
    kisiler.forEach((kisi, i) => {
      process.stdout.write(`${i + 1}. `);
      kisi.kendiniTanıt();
    });
  }
  anaMenu();
}

function kisiSil() {
  if (kisiler.length === 0) {
    console.log("\nSilinecek kişi yok.");
    anaMenu();
    return;
  }

  console.log("\n=== Kişiler ===");
  kisiler.forEach((kisi, i) => {
    process.stdout.write(`${i + 1}. `);
    kisi.kendiniTanıt();
  });

  rl.question("\nSilmek istediğiniz kişinin numarasını girin (iptal için 0): ", cevap => {
    const index = parseInt(cevap) - 1;

    if (cevap === "0") {
      console.log("Silme işlemi iptal edildi.");
      anaMenu();
      return;
    }

    if (!isNaN(index) && index >= 0 && index < kisiler.length) {
      const silinecek = kisiler[index];

      console.log(`\nSeçilen kişi:`);
      process.stdout.write(`${index + 1}. `);
      silinecek.kendiniTanıt();

      rl.question("Bu kişiyi silmek istediğinize emin misiniz? (E/H): ", onay => {
        if (onay.toLowerCase() === "e") {
          kisiler.splice(index, 1);
          console.log(`\n${silinecek.ad} adlı kişi silindi.`);
        } else {
          console.log("\nSilme işlemi iptal edildi.");
        }
        anaMenu();
      });
    } else {
      console.log("\nGeçersiz numara girdiniz.");
      anaMenu();
    }
  });
}

function okullariListele() {
  console.log("\n=== Okullar ===");
  const okulAdlari = Object.keys(okullar);
  if (okulAdlari.length === 0) {
    console.log("Henüz okul eklenmedi.");
  } else {
    okulAdlari.forEach((okulAdi, i) => {
      const okul = okullar[okulAdi];
      console.log(`${i + 1}. ${okulAdi} - Adres: ${okul.adres}, Kapasite: ${okul.kapasite}`);
    });
  }
  anaMenu();
}

function okulaGoreKisileriListele() {
  const okulAdlari = Object.keys(okullar);
  if (okulAdlari.length === 0) {
    console.log("Hiç okul eklenmemiş.");
    anaMenu();
    return;
  }

  console.log("\n=== Okullar ===");
  okulAdlari.forEach((okul, i) => {
    console.log(`${i + 1}. ${okul}`);
  });

  rl.question("Seçmek istediğiniz okulun numarası: ", secim => {
    const index = parseInt(secim) - 1;
    const secilenOkul = okulAdlari[index];

    if (!secilenOkul) {
      console.log("Geçersiz okul seçimi.");
      anaMenu();
      return;
    }

    const filtrelenmis = kisiler.filter(kisi => kisi.okulAdi === secilenOkul);
    console.log(`\n=== ${secilenOkul} Okulundaki Kişiler ===`);
    if (filtrelenmis.length === 0) {
      console.log("Bu okulda kişi bulunamadı.");
    } else {
      filtrelenmis.forEach((kisi, i) => {
        process.stdout.write(`${i + 1}. `);
        kisi.kendiniTanıt();
      });
    }
    anaMenu();
  });
}

anaMenu();
