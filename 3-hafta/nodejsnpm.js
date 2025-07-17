const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



app.use(express.json()); // JSON body parser

// In-memory kullanıcı listesi
let users = [
  { id: 1, name: 'Ali', email: 'ali@example.com' },
  { id: 2, name: 'Veli', email: 'veli@example.com' }
];

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Bir hata oluştu');
  }
});



// Express REST API
app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'İsim ve email gerekli' });
  }
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
  }
  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
  }
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
});

// Terminal menüsü
function menu() {
  rl.question('1. Kullanıcı Ekle\n2. Kullanıcı Sil\n3. Kullanıcı Düzenle\n4. Kullanıcıları Listele\n5. Çıkış\nSeçiminizi yapın: ', (sonuc) => {
    switch (sonuc) {
      case '1':
        kEkle();
        break;
      case '2':
        kSil();
        break;
      case '3':
        kDüzenle();
        break;
      case '4':
        kListele();
        break;
      case '5':
        console.log('Çıkılıyor...');
        rl.close();
        process.exit(0);
      default:
        console.log('Geçersiz seçim, lütfen tekrar deneyin.');
        menu();
    }
  });
}

function kEkle() {
  rl.question('İsim: ', (name) => {
    rl.question('Email: ', (email) => {
      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        email
      };
      users.push(newUser);
      console.log('Kullanıcı eklendi:', newUser);
      menu();
    });
  });
}

function kSil() {
  rl.question('Silinecek kullanıcının id\'si: ', (id) => {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
      console.log('Kullanıcı bulunamadı');
    } else {
      const deleted = users.splice(index, 1);
      console.log('Silinen kullanıcı:', deleted[0]);
    }
    menu();
  });
}

function kDüzenle() {
  rl.question('Düzenlenecek kullanıcının id\'si: ', (id) => {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
      console.log('Kullanıcı bulunamadı');
      return menu();
    }
    rl.question('Yeni isim (boş bırakılırsa değişmez): ', (name) => {
      rl.question('Yeni email (boş bırakılırsa değişmez): ', (email) => {
        if (name) user.name = name;
        if (email) user.email = email;
        console.log('Güncellenen kullanıcı:', user);
        menu();
      });
    });
  });
}

function kListele() {
  if (users.length === 0) {
    console.log('Hiç kullanıcı yok.');
  } else {
    console.log('ID | İsim           | Email');
    console.log('---|----------------|----------------------');
    users.forEach(u => {
      console.log(
        (u.id + '').padEnd(2) + ' | ' +
        (u.name + '').padEnd(14) + ' | ' +
        (u.email + '').padEnd(20)
      );
    });
  }
  menu();
}
function menu(){
  rl.question('1. Kullanıcı Ekle\n2. Kullanıcı Sil\n3. Kullanıcı Düzenle\n4. Çıkış\nSeçiminizi yapın: ', (sonuc) => {
    switch (sonuc) {
      case '1':
        kEkle();
        break;
      case '2':
        kSil();
        break;
      case '3':
        kDüzenle();
        break;
      case '4':
        kListele();
        break;
      case '5':
        console.log('Çıkılıyor...');
        process.exit(0);
      default:
        console.log('Geçersiz seçim, lütfen tekrar deneyin.');
    }
    menu(); // Menü tekrar göster
  });
}

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
  menu();
});