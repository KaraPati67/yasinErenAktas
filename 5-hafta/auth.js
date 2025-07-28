const readline = require('readline');
const jwt = require('jsonwebtoken');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const SECRET_KEY = 'gizliAnahtar';

let users = [
  { kAdi: 'admin', sifre: '1234', rol: 'admin' },
  { kAdi: 'eren', sifre: 'abcd', rol: 'user' }
];

// Token Doğrulama
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    console.log("❌ Token geçersiz veya süresi dolmuş.");
    rl.close();
    process.exit();
  }
}

// Kullanıcı Ekleme
function kEkle(callback) {
  rl.question("Yeni kullanıcı adı: ", (kAdi) => {
    rl.question("Şifre: ", (sifre) => {
      users.push({ kAdi, sifre, rol: 'user' });
      console.log(`✅ Kullanıcı ${kAdi} eklendi.`);
      callback && callback();
    });
  });
}

// Kendi hesabını silme
function kendiHesabimiSil(decoded) {
  if (decoded.rol === 'admin') {
    const adminCount = users.filter(u => u.rol === 'admin').length;
    if (adminCount === 1) {
      console.log("⚠️ Son adminsiniz. Bu hesabı silemezsiniz.");
      return menu(decoded);
    }
  }

  rl.question("Hesabınızı silmek istediğinizden emin misiniz? (evet/hayır): ", (cevap) => {
    if (cevap.toLowerCase() === 'evet') {
      users = users.filter(u => u.kAdi !== decoded.kAdi);
      console.log("✅ Hesabınız silindi.");
      g();
    } else {
      console.log("❌ İşlem iptal edildi.");
      menu(decoded);
    }
  });
}

// Kullanıcı Silme
function kSil(callback) {
  rl.question("Silinecek kullanıcı adı: ", (kAdi) => {
    const index = users.findIndex(u => u.kAdi === kAdi);
    if (index !== -1) {
      users.splice(index, 1);
      console.log(`🗑️ ${kAdi} silindi.`);
    } else {
      console.log("❌ Kullanıcı bulunamadı.");
    }
    callback && callback();
  });
}

// Yetki Güncelleme
function kYEkle(callback) {
  rl.question("Kullanıcı adı: ", (kAdi) => {
    const user = users.find(u => u.kAdi === kAdi);
    if (user) {
      rl.question("Yeni rol (admin/user): ", (rol) => {
        user.rol = rol;
        console.log(`✅ ${kAdi} artık ${rol}.`);
        callback && callback();
      });
    } else {
      console.log("❌ Kullanıcı bulunamadı.");
      callback && callback();
    }
  });
}

// Admin Paneli
function adminPanel(decoded) {
  if (decoded.rol !== 'admin') {
    console.log("⛔ Yetkiniz yok.");
    return menu(decoded);
  }

  console.log("🔧 Admin Paneli");
  console.log("1. Kullanıcıları Listele\n2. Kullanıcı Sil\n3. Yetki Ver");
  rl.question("Seçiminiz: ", (secim) => {
    switch (secim) {
      case '1':
        users.forEach(u => console.log(`- ${u.kAdi} (${u.rol})`));
        return menu(decoded);
      case '2':
        kSil(() => menu(decoded));
        break;
      case '3':
        kYEkle(() => menu(decoded));
        break;
      default:
        console.log("❓ Geçersiz seçim.");
        menu(decoded);
    }
  });
}

// Ana Menü
function menu(decoded) {
  console.log(`\n👋 Merhaba ${decoded.kAdi} (${decoded.rol})`);
  console.log("1. Profil Bilgileri");
  if (decoded.rol === 'admin') console.log("2. Admin Paneli");
  console.log("3. Hesabımı Sil");
  console.log("0. Çıkış");

  rl.question("Seçiminiz: ", (secim) => {
    switch (secim) {
      case '1':
        console.log(`👤 Adınız: ${decoded.kAdi}, Rolünüz: ${decoded.rol}`);
        menu(decoded);
        break;
      case '2':
        if (decoded.rol === 'admin') {
          adminPanel(decoded);
        } else {
          console.log("⛔ Yetkiniz yok.");
          menu(decoded);
        }
        break;
      case '3':
        kendiHesabimiSil(decoded);
        break;
      case '0':
        console.log("👋 Güle güle!");
        rl.close();
        break;
      default:
        console.log("❓ Geçersiz seçim.");
        menu(decoded);
    }
  });
}

// Giriş veya kullanıcı oluşturma
function g() {
  console.log("\n🔐 Giriş Menüsü\n1. Giriş Yap\n2. Yeni Kullanıcı Ekle\n0. Çıkış");
  rl.question("Seçiminiz: ", (secim) => {
    switch (secim) {
      case '1':
        rl.question("Kullanıcı adı: ", (kAdi) => {
          rl.question("Şifre: ", (sifre) => {
            const user = users.find(u => u.kAdi === kAdi && u.sifre === sifre);
            if (!user) {
              console.log("❌ Hatalı giriş.");
              return g();
            }
            const token = jwt.sign({ kAdi: user.kAdi, rol: user.rol }, SECRET_KEY, { expiresIn: '1h' });
            const decoded = verifyToken(token);
            console.log(`✅ Hoş geldin ${decoded.kAdi}`);
            menu(decoded);
          });
        });
        break;
      case '2':
        kEkle(() => g());
        break;
      case '0':
        console.log("👋 Çıkılıyor...");
        rl.close();
        break;
      default:
        console.log("❓ Geçersiz seçim.");
        g();
    }
  });
}

g(); // Başlat
