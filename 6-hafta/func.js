const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function topla(){
    rl.question('Lütfen ilk sayıyı giriniz: ', (sayi1) => {
        rl.question('Lütfen ikinci sayıyı giriniz: ', (sayi2) => {
            const toplam = parseFloat(sayi1) + parseFloat(sayi2);
            console.log(`Toplam: ${toplam}`);
            menu();
        });
    });
}

function cikar(){
    rl.question('Lütfen ilk sayıyı giriniz: ', (sayi1) => {
        rl.question('Lütfen ikinci sayıyı giriniz: ', (sayi2) => {
            const fark = parseFloat(sayi1) - parseFloat(sayi2);
            console.log(`Fark: ${fark}`);
            menu();
        });
    });
}

function carp(){
    rl.question('Lütfen ilk sayıyı giriniz: ', (sayi1) => {
        rl.question('Lütfen ikinci sayıyı giriniz: ', (sayi2) => {
            const carpim = parseFloat(sayi1) * parseFloat(sayi2);
            console.log(`Çarpım: ${carpim}`);
            menu();
        });
    });
}

function bol(){
    rl.question('Lütfen ilk sayıyı giriniz: ', (sayi1) => {
        rl.question('Lütfen ikinci sayıyı giriniz: ', (sayi2) => {
            if (parseFloat(sayi2) === 0) {
                console.log('Bir sayıyı sıfıra bölemezsiniz.');
            } else {
                const bolum = parseFloat(sayi1) / parseFloat(sayi2);
                console.log(`Bölüm: ${bolum}`);
            }
            menu();
        });
    });
}

function menu(){
    rl.question('Lütfen yapmak istediğiniz işlemi seçiniz:\n1. Toplama\n2. Çıkarma\n3. Çarpma\n4. Bölme\n0. Çıkış\n', (secim) => {
        switch (secim) {
            case '1':
                topla();
                break;
            case '2':
                cikar();
                break;
            case '3':
                carp();
                break;
            case '4':
                bol();
                break;
            case '0':
                rl.close();
                break;
            default:
                console.log('Geçersiz seçim. Lütfen tekrar deneyin.');
                menu();
                break;
        }
    });
}

menu();