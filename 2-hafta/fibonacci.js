
const readline = require('readline');

let s1 = 0;
let s2 = 1;
let s;
const fibonacci =[s1, s2]; // İlk iki terimi diziye ekliyoruz

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Fibonacci dizisini yazdırmak ister misiniz? (Evet/Hayır): ", function(giris) {
    if (giris.toLowerCase() === 'e' || giris.toLowerCase() === 'evet' || giris.toLowerCase() === 'eve' || giris.toLowerCase() === 'evt') {
        rl.question("Lütfen Fibonacci dizisinin kaç terimini yazdırmak istediğinizi giriniz: ", function(ts) {
            ts = Number(ts) - 2; // İlk iki terim zaten yazılacak, bu yüzden 2 çıkarıyoruz
            for (let i = 0; i < ts; i++) { // 2 terim zaten yazıldı, toplam 10 için 8 kez dönecek
                s = s1 + s2;
                fibonacci.push(s); // Yeni terimi diziye ekliyoruz
                s1 = s2;
                s2 = s;
            }
            console.log("Fibonacci dizisi: " + fibonacci.join(', ')); // Diziyi virgülle ayırarak yazdırıyoruz
            rl.close();
        });
    } else {
        rl.close();
    }
});
