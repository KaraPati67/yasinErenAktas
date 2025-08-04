const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Masaüstü klasör yolu
const masaustuYolu = path.join(require('os').homedir(), 'Desktop', 'Notlar');

// Klasör yoksa oluştur
if (!fs.existsSync(masaustuYolu)) {
  fs.mkdirSync(masaustuYolu);
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Notu kaydetme
app.post('/uploadNote', (istek, cevap) => {
  const { not } = istek.body;
  if (!not) {
    return cevap.status(400).send('Not içeriği boş olamaz.');
  }

  const dosyaAdi = `not_${Date.now()}.txt`;
  const dosyaYolu = path.join(masaustuYolu, dosyaAdi);

  fs.writeFile(dosyaYolu, not, (hata) => {
    if (hata) {
      console.error('Not kaydedilirken hata oluştu:', hata);
      return cevap.status(500).send('Not kaydedilemedi.');
    }
    cevap.send('Not başarıyla kaydedildi.');
  });
});

// Notları listeleme
app.get('/getNotes', (istek, cevap) => {
  fs.readdir(masaustuYolu, (hata, dosyalar) => {
    if (hata) {
      console.error('Notlar listelenirken hata oluştu:', hata);
      return cevap.status(500).send('Notlar alınamadı.');
    }

    const notlar = dosyalar.map((dosya) => {
      const dosyaYolu = path.join(masaustuYolu, dosya);
      return fs.readFileSync(dosyaYolu, 'utf-8');
    });

    cevap.json(notlar);
  });
});

// Not silme
app.delete('/deleteNote/:index', (istek, cevap) => {
    const indeks = parseInt(istek.params.index, 10);

    fs.readdir(masaustuYolu, (hata, dosyalar) => {
        if (hata) {
            console.error('Notlar listelenirken hata oluştu:', hata);
            return cevap.status(500).send('Notlar alınamadı.');
        }

        if (indeks < 0 || indeks >= dosyalar.length) {
            return cevap.status(400).send('Geçersiz not indeksi.');
        }

        const dosyaYolu = path.join(masaustuYolu, dosyalar[indeks]);
        fs.unlink(dosyaYolu, (hata) => {
            if (hata) {
                console.error('Not silinirken hata oluştu:', hata);
                return cevap.status(500).send('Not silinemedi.');
            }
            cevap.send('Not başarıyla silindi.');
        });
    });
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
