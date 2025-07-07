const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Asal olduğunu kontrol etmek istediğiniz sayıyı girin: ", function(input) {
    sayi = Number(input);
    for (let i = 2; i <= Math.sqrt(sayi); i++) {
        if (sayi % i === 0) {
            console.log(`${sayi} asal değildir.`);
            rl.close();
            return;
        }
        else{
            console.log(`${sayi} asal sayıdır.`);
            rl.close();
        }
    }});