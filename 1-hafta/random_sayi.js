
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
function sayiTahhmin() {
        readline.question(`Lütfen tahmin için ${min} ile ${max} arasında bir sayı giriniz: `, function(input3) {
        const sayi = Number(input3);
    });
}

readline.question("Lütfen minimum sayıyı giriniz: ", function(input) {
    const min = Number(input);
    readline.question("Lütfen maksimum sayıyı giriniz: ", function(input2) {
        const max = Number(input2);
        sayiTahhmin();
        const randomSayi = Math.floor(Math.random() * (max - min + 1)) + min;
            let hak = 3; // Kullanıcının 3 hakkı var
            switch (hak>=0){
                case true:
                    hak--;
                    if (sayi < min || sayi > max) {
                        sayiTahhmin();
                    } else if (sayi === randomSayi) {
                        console.log("Tebrikler! Doğru tahmin ettiniz.");
                        readline.close();
                    } else {
                        console.log(`Yanlış tahmin. Doğru sayı: ${randomSayi}`);
                    }
                    break;
                case false:
                    hak--;
                    console.log("Hakkınız kalmadı. Oyun bitti.");
                    readline.close();
                    break;
                default:
                    console.log("Geçersiz işlem. Lütfen tekrar deneyin.");
                    break;
            }
    });
});