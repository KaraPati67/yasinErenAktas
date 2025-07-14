// Basit form validasyonu ve localStorage ile kullanıcı kaydı
const form = document.getElementById('register-form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const errorDiv = document.getElementById('register-error');
const successDiv = document.getElementById('register-success');

form.onsubmit = function(e) {
    e.preventDefault();
    errorDiv.textContent = '';
    successDiv.textContent = '';
    const user = username.value.trim();
    const pass = password.value;
    const pass2 = password2.value;
    if (!user || !pass || !pass2) {
        errorDiv.textContent = 'Tüm alanları doldurun.';
        return;
    }
    if (user.length < 3) {
        errorDiv.textContent = 'Kullanıcı adı en az 3 karakter olmalı.';
        return;
    }
    if (pass.length < 6) {
        errorDiv.textContent = 'Şifre en az 6 karakter olmalı.';
        return;
    }
    if (pass !== pass2) {
        errorDiv.textContent = 'Şifreler eşleşmiyor.';
        return;
    }
    // Kullanıcıyı localStorage'a kaydet
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === user)) {
        errorDiv.textContent = 'Bu kullanıcı adı zaten alınmış.';
        return;
    }
    users.push({ username: user, password: pass });
    localStorage.setItem('users', JSON.stringify(users));
    successDiv.textContent = 'Kayıt başarılı!';
    form.reset();
};
