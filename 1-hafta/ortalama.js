const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question("İlk notunuzu girin: ", (input) => {
    const not1 = Number(input);
    readline.question("İkinci notunuzu girin: ", (input2) => {
        const not2 = Number(input2);
            const ortalama = (not1 + not2) / 2;
            if (ortalama >= 50) {
                console.log(`Geçtiniz.${ortalama}`);
            } else {
                console.log(`Kaldınız.${ortalama}`);
            }
            readline.close();
        });
    }
)
