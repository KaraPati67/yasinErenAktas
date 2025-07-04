const readline= require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

process.stdin.setRawMode(true);
process.stdin.on('data', (key) => {
    if (key[0] === 27) {
        console.log("\nESC tuşuna basıldı, program sonlandırılıyor.");
        readline.close();
        process.exit();
    }
});

console.log('Hesap Makinesi Uygulamasına Hoş Geldiniz!\nESC tuşuna basarak programdan çıkabilirsiniz.\nLütfen iki sayı giriniz ve ardından işlem seçiniz. Başlamak için "Enter" basın.');

process.stdin.on('data', (key) => {
    if (key[0] === 13) {
        ss();
    }})

function ss(s1, s2) {
    readline.question("Birinci sayı giriniz: ", (i) => {
        const s1_ = Number(i);
        readline.question("İkinci sayıyı giriniz: ", (i2) => {
            const s2_ = Number(i2);
            iSor(s1_, s2_);
        });
    });
}

function iSor(s1, s2) {
    readline.question("Uygulamak istediğiniz işlem (+, -, *, /, ): ", function handleInput(iSor) {
        if (iSor === null || (typeof iSor === 'string' && iSor.charCodeAt(0) === 27)) {
            console.log("program sonlandırılıyor.");
            readline.close();
            process.exit();
        }
        let s;
        switch (iSor) {
            case "+":
                s = s1 + s2;
                console.log(`Toplama işlemi sonucu : ${s}`);
                ss();
                break;
            case "-":
                s = s1 - s2;
                console.log(`Çıkarma işlemi sonucu: ${s}`);
                ss();
                break;
            case "*":
                s = s1 * s2;
                console.log(`Çarpma işlemi sonucu: ${s}`);
                ss();
                break;
            case "/":
                if (s2 !== 0) {
                    s = s1 / s2;
                    console.log(`Bölme işlemi sonucu: ${s}`);
                } else {
                    console.log("Bir sayıyı sıfıra bölemezsiniz.");
                }
                ss();
                break;
            default:
                console.log("Geçersiz işlem. Lütfen tekrar deneyin.");
                return;
        }
    });
}