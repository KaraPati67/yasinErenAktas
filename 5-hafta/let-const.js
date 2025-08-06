let yas = 15; // Değiştirilebilir bir değişken
const ad = "Yasin"; // Sabit bir değişken
console.log("yaş: " + ad);
console.log("yaş: " + yas);

yas = 16;
console.log("yaş: " + yas);

// Spread örneği
const sayilar = [1, 2, 3];
const dahaFazlaSayilar = [...sayilar, 4, 5];
console.log(sayilar);
console.log(dahaFazlaSayilar);

const kisi = { isim: "Yasin Eren", soyisim: "Aktaş" };
console.log(kisi);
const updatedKisi = { ...kisi, yas: 16 };
console.log(updatedKisi);

// Rest operatörü örneği
function sum(...args) {
  return args.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Destructuring örneği
const [birinci, ikinci, ...geriKalan] = [10, 20, 30, 40];
console.log(birinci); // 10
console.log(ikinci); // 20
console.log(geriKalan); // [30, 40]

const { isim, soyisim } = kisi;
console.log(isim);
console.log(soyisim);