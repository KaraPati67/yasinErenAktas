let isLogin = true;
function toggleMode(e) {
  e.preventDefault();
  isLogin = !isLogin;
  document.getElementById('form-title').textContent = isLogin ? 'Giriş Yap' : 'Kayıt Ol';
  document.getElementById('submit-btn').textContent = isLogin ? 'Giriş Yap' : 'Kayıt Ol';
  document.getElementById('toggle-text').textContent = isLogin ? 'Hesabın yok mu?' : 'Zaten hesabın var mı?';
  document.getElementById('toggle-link').textContent = isLogin ? 'Kayıt Ol' : 'Giriş Yap';
  document.getElementById('greeting').textContent = '';
}

// Dark mode switch
const darkSwitch = document.getElementById('darkSwitch');
darkSwitch.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkSwitch.classList.toggle('active');
  // Optionally, save preference
  if(document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
// On load, set theme
if(localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  darkSwitch.classList.add('active');
}

async function handleSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const greeting = document.getElementById('greeting');
  greeting.textContent = '';
  if (!username || !password) {
    greeting.textContent = 'Lütfen tüm alanları doldurun.';
    return false;
  }
  const endpoint = isLogin ? 'login' : 'register';
  try {
    const response = await fetch('http://localhost:3001/' + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      greeting.style.color = '#388e3c';
      greeting.textContent = data.message;
      showProfile(username);
    } else {
      greeting.style.color = '#E1306C';
      greeting.textContent = data.message || 'Bir hata oluştu.';
    }
  } catch (err) {
    greeting.style.color = '#E1306C';
    greeting.textContent = 'Sunucuya bağlanılamadı.';
  }
  return false;
}

// Profil avatarı ve modal açma/kapama
const profileAvatar = document.getElementById('profileAvatar');
const profileModal = document.getElementById('profileModal');
const closeProfileModal = document.getElementById('closeProfileModal');
const modalUsername = document.getElementById('modal-username');
// Giriş başarılıysa avatarı göster
function showProfile(username) {
  // Basit SVG avatarı ekle
  profileAvatar.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="13" stroke="#7ec4cf" stroke-width="2" fill="#e0f7fa" />
      <circle cx="14" cy="12" r="5" fill="#b2ebf2" />
      <ellipse cx="14" cy="21" rx="7" ry="4" fill="#b2ebf2" />
    </svg>
  `;
  profileAvatar.style.display = 'flex';
  modalUsername.textContent = username;
}
// Avatar tıklanınca modal aç
profileAvatar.addEventListener('click', () => {
  profileModal.classList.add('active');
});
// Modal kapat
closeProfileModal.addEventListener('click', () => {
  profileModal.classList.remove('active');
});
// Modal dışına tıklayınca kapat
window.addEventListener('click', (e) => {
  if (e.target === profileModal) profileModal.classList.remove('active');
});
// Çıkış yap butonu
if(document.getElementById('logoutBtn')) {
  document.getElementById('logoutBtn').onclick = function() {
    profileModal.classList.remove('active');
    profileAvatar.style.display = 'none';
    document.getElementById('greeting').textContent = '';
    document.getElementById('auth-form').reset();
    document.getElementById('form-title').textContent = 'Giriş Yap';
    document.getElementById('submit-btn').textContent = 'Giriş Yap';
    document.getElementById('toggle-text').textContent = 'Hesabın yok mu?';
    document.getElementById('toggle-link').textContent = 'Kayıt Ol';
    isLogin = true;
  };
}

// Hesabı sil butonu (backend ile entegre)
if(document.getElementById('deleteBtn')) {
  document.getElementById('deleteBtn').onclick = async function() {
    // Kullanıcıdan emin misin ve şifre iste
    const username = modalUsername.textContent;
    const password = prompt('Hesabınızı silmek için şifrenizi girin:');
    if (!password) return;
    if (!confirm('Hesabınız kalıcı olarak silinecek. Emin misiniz?')) return;
    try {
      const response = await fetch('http://localhost:3001/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Hesabınız silindi.');
        profileModal.classList.remove('active');
        profileAvatar.style.display = 'none';
        document.getElementById('greeting').textContent = '';
        document.getElementById('auth-form').reset();
        document.getElementById('form-title').textContent = 'Giriş Yap';
        document.getElementById('submit-btn').textContent = 'Giriş Yap';
        document.getElementById('toggle-text').textContent = 'Hesabın yok mu?';
        document.getElementById('toggle-link').textContent = 'Kayıt Ol';
        isLogin = true;
      } else {
        alert(data.message || 'Hesap silinemedi.');
      }
    } catch (err) {
      alert('Sunucuya bağlanılamadı.');
    }
  };
}

// ...existing code...