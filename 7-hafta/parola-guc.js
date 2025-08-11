const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sifreguc(s) {
  let puan = 0;
  if (!s) return "Parola girilmedi.";

  if (s.length >= 8) puan++;
  if (/[A-Z]/.test(s)) puan++;
  if (/[a-z]/.test(s)) puan++;
  if (/[0-9]/.test(s)) puan++;
  if (/[^A-Za-z0-9]/.test(s)) puan++;

  switch (puan) {
    case 5:
      return "Çok güçlü parola";
    case 4:
      return "Güçlü parola";
    case 3:
      return "Orta seviye parola";
    case 2:
      return "Zayıf parola";
    default:
      return "Çok zayıf parola";
  }
}

// Örnek kullanım:
rl.question("Parolanızı girin: ", (s) => {
  console.log(sifreguc(s));
  rl.close();
});