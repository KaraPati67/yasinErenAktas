// Node.js ortamında çalıştırmak için readline modülü ile kullanıcıdan giriş alınır
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question("Bir sayı giriniz: ", (input) => {
  const sayi = Number(input);
  readline.question("Bir sayı daha giriniz: ", (input2) => {
    const sayi2 = Number(input2);
    if (sayi < sayi2) {
      console.log("$ ikinci sayıdan küçüktür.");
    } else if (sayi > sayi2) {
      console.log("İlk sayı ikinci sayıdan büyüktür.");
    } else {
      console.log("İki sayı eşittir.");
    }
    readline.close();
  });
});