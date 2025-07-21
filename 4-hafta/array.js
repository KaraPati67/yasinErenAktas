let list = [];

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function ekle() {
    rl.question('\n1: push ile ekle\n2: başa ekle\n3: sona ekle', (input) => {
        switch(input){
            case '1':
                rl.question('Listeye eklenecek sayıyı girin: ', (input) => {
                    const sayi = Number(input);
                    if (!isNaN(sayi)) {
                        list.push(sayi); // push
                        console.log('push ile ekleme:', list);
                    } else {
                        console.log('Geçersiz giriş!');
                    }
                    main();
                });
            case '2':
                basaEkle();
            case '3':
                sonaEkle();
        }
    })
    
}

function sonaEkle() {
    rl.question('Sona eklenecek sayıyı girin: ', (input) => {
        const sayi = Number(input);
        if (!isNaN(sayi)) {
            list = list.concat([sayi]); // concat
            console.log('concat ile sona ekleme:', list);
        } else {
            console.log('Geçersiz giriş!');
        }
        main();
    });
}

function basaEkle() {
    rl.question('Başa eklenecek sayıyı girin: ', (input) => {
        const sayi = Number(input);
        if (!isNaN(sayi)) {
            list.unshift(sayi); // unshift
            console.log('unshift ile başa ekleme:', list);
        } else {
            console.log('Geçersiz giriş!');
        }
        main();
    });
}

function sil() {
    rl.question('\n1: splice ile sil\n2: pop ile sondan sil\n3: shift ile baştan sil\nSeçiminiz: ', (secim) => {
        switch(secim) {
            case '1':
                console.log('Güncel liste: ', list);
                rl.question('Silinecek sayıyı girin: ', (input) => {
                    const sayi = Number(input);
                    const index = list.indexOf(sayi); // indexOf
                    if (index !== -1) {
                        list.splice(index, 1); // splice
                        console.log('splice ile silindi:', list);
                    } else {
                        console.log('Liste içinde bulunamadı!');
                    }
                    main();
                });
                break;
            case '2':
                popla();
                break;
            case '3':
                shiftle();
            default:
                console.log('Geçersiz seçim!');
                main();
        }
    });
}

function popla() {
    const silinen = list.pop(); // pop
    console.log('pop ile sondan silindi:', silinen, 'Güncel liste:', list);
    main();
}

function shiftle() {
    const silinen = list.shift(); // shift
    console.log('shift ile baştan silindi:', silinen, 'Güncel liste:', list);
    main();
}

function tersCevir() {
    list.reverse(); // reverse
    console.log('reverse ile ters çevrildi:', list);
    main();
}

function sirala() {
    rl.question('\n1: sırala\n2: ters çevir\n3: filtrele\n4: bul\n5: haritalandır\n6: her eleman\n7: tümü büyük mü\n8: büyük mü',(input) => {
        switch(input){
            case '1':
                list.sort((a, b) => a - b); // sort
                console.log('sort ile sıralandı:', list);
                main();
                break;
            case '2':
                tersCevir();
                break;
            case '3' :
                filtrele();
                break;
            case '4' :
                bul();
                break;
            case '5' :
                haritalandir();
                break;
            case '6' :
                herEleman();
                break;
            case '7' :
                tumuBuyukMu();
                break;
            case '8' :
                herhangiBuyukMu();
                break;
        }
    })
    
}

function filtrele() {
    rl.question('Kaçtan büyükleri görmek istersin? ', (input) => {
        const sayi = Number(input);
        if (!isNaN(sayi)) {
            const filtreli = list.filter(x => x > sayi); // filter
            console.log('filter ile filtrelenenler:', filtreli);
        } else {
            console.log('Geçersiz giriş!');
        }
        main();
    });
}

function haritalandir() {
    const yeni = list.map(x => x * 2); // map
    console.log('map ile 2 katı:', yeni);
    main();
}

function bul() {
    rl.question('Bulmak istediğin sayı: ', (input) => {
        const sayi = Number(input);
        if (!isNaN(sayi)) {
            const bulunan = list.find(x => x === sayi); // find
            console.log('find ile bulunan:', bulunan);
        } else {
            console.log('Geçersiz giriş!');
        }
        main();
    });
}

function herEleman() {
    list.forEach((x, i) => console.log(`forEach ile [${i}]:`, x)); // forEach
    main();
}

function tumuBuyukMu() {
    rl.question('Tüm elemanlar bundan büyük mü? ', (input) => {
        const sayi = Number(input);
        if (!isNaN(sayi)) {
            const sonuc = list.every(x => x > sayi); // every
            console.log('every sonucu:', sonuc);
        } else {
            console.log('Geçersiz giriş!');
        }
        main();
    });
}

function herhangiBuyukMu() {
    rl.question('Herhangi bir eleman bundan büyük mü? ', (input) => {
        const sayi = Number(input);
        if (!isNaN(sayi)) {
            const sonuc = list.some(x => x > sayi); // some
            console.log('some sonucu:', sonuc);
        } else {
            console.log('Geçersiz giriş!');
        }
        main();
    });
}


function listele() {
    console.log('Güncel liste:', list);
    main();
}


function temizle() {
    list.length = 0;
    console.log('Liste temizlendi.');
    main();
}


function main() {
    rl.question(`\n1: Ekle\n2: Sil\n3: Sırala\n4: Listele\n5: Temizle\n0: Çıkış\nSeçiminiz: `, (secim) => {
        switch (secim) {
            case '1': ekle(); break;
            case '2': sil(); break;
            case '3': sirala(); break;
            case '4': listele(); break;
            case '5': temizle(); break;
            case '0': rl.close(); return;
            default:
                console.log('Geçersiz seçim!');
                rl.close();
        }
    });
}

main();