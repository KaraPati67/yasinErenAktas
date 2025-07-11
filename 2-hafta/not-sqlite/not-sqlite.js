
const sqlite3 = require('sqlite3').verbose();
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const db = new sqlite3.Database('notlar.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS notlar (
        ad TEXT NOT NULL,
        soyad TEXT NOT NULL,
        puan INTEGER NOT NULL
    )`)
})

function notEkle() {
    rl.question('Notunu girmek istediğiniz kişinin adı: ',(ad) =>{
        rl.question('Soyadı girin: ',(soyad) =>{
            rl.question('Kişinin notunu girin: ',(puan) =>{
                db.run('INSERT INTO notlar (ad,soyad,puan) VALUES (?,?,?)',[ad,soyad,puan], function(err){
                    if(err){
                        console.log('Not eklenemedi.')
                    }
                    else{
                        console.log('Not eklendi.')
                    }
                    notIslemleri();
                })
            })
        })
    })
}

function notSil(){
    rl.question('Notunu silmek istediğiniz kişinin adı: ',(ad) =>{
        rl.question('Soyadı: ',(soyad) =>{
            db.run('DELETE FROM notlar WHERE ad = ? AND soyad = ?', [ad, soyad], function(err){
                if(err){
                    console.log('Not silinemedi.');
                } else if(this.changes === 0) {
                    console.log('Böyle bir kayıt bulunamadı.');
                } else {
                    console.log('Not silindi.');
                }
                notIslemleri();
            });
        });
    });
}
function notGuncelle(){
    rl.question('Notunu güncellemek istediğiniz kişinin adı: ',(ad) =>{
        rl.question('Soyadı: ',(soyad) =>{
            rl.question('Yeni notu girin: ',(yeniPuan) =>{
                db.run('UPDATE notlar SET puan = ? WHERE ad = ? AND soyad = ?', [yeniPuan, ad, soyad], function(err){
                    if(err){
                        console.log('Not güncellenemedi.');
                    } else if(this.changes === 0) {
                        console.log('Böyle bir kayıt bulunamadı.');
                    } else {
                        console.log('Not güncellendi.');
                    }
                    notIslemleri();
                });
            });
        });
    });
}
function notlariListele(){
    db.all('SELECT * FROM notlar', (err, rows) => {
        if(err){
            console.log('Listeleme hatası:', err.message);
        } else {
            console.log('\nKayıtlı Notlar:');
            rows.forEach(n => {
                console.log(`Ad: ${n.ad} | Soyad: ${n.soyad} | Not: ${n.puan}`);
            });
        }
        rl.question('\n1: Geri dönmek için.', (secenek) =>{
            switch (secenek){
                case '1' : baslangic(); break;
                default : console.log('Lütfen geçerli bir işlem seçin.')
            }
        })
    });
}

function notIslemleri(){
    rl.question('\n\n1: Not eklemek için.\n2: Not güncellemek için.\n3: Not silmek için.\n4: Geri dönmek için.\n', (secenek) =>{
        switch(secenek){
            case '1' : notEkle(); break;
            case '2' : notGuncelle(); break;
            case '3' : notSil(); break;
            case '4' : baslangic(); break;
            default : console.log('Geçersiz işlem lütfen geçerli seçenekleri deneyiniz'); notIslemleri();
        }
    })
}

function baslangic(){
    rl.question('\n1: Not işlemleri için. \n2: Notları listlemek için. \n3: Programdan çıkış için.\n', (secenek) =>{
        switch(secenek){
            case '1' : notIslemleri(); break;
            case '2' : notlariListele(); break;
            case '3' : rl.close(); break;
            default : console.log('Lütfen geçerli bir işlem giriniz.'); baslangic();
        }
    })
}

baslangic();