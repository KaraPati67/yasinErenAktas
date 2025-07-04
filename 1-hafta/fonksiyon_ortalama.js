const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

function ortalamaHesapla(not1, not2) {
    return (not1 + not2) / 2;
}

readline.question("İlk notunuzu girin: ", (input1) => {
    const not1 = Number(input1);
    readline.question("İkinci notunuzu girin: ", (input2) => {
        const not2 = Number(input2);
        const ortalama = ortalamaHesapla(not1, not2);
        if (ortalama >= 50) {
            console.log(`Geçtiniz. Ortalama: ${ortalama}`);
        } else {
            console.log(`Kaldınız. Ortalama: ${ortalama}`);
        }
        readline.close();
    });
});