const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Adınız nedir? ', (isim) => {
  console.log(`Merhaba, ${isim}!`);
  rl.close();
});