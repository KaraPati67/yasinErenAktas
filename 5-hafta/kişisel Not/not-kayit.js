// Kullanıcı adı bilgisini saklamak için localStorage kullanıyoruz
const username = localStorage.getItem('username');

// Not Yükleme İşlevi
async function uploadNote() {
  const noteInput = document.getElementById('noteInput');
  const note = noteInput ? noteInput.value : '';

  if (!note) {
    alert('Lütfen bir not girin!');
    return;
  }

  if (!username) {
    alert('Kullanıcı adı bulunamadı. Lütfen giriş yapın.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/uploadNote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ not: note, username })
    });

    if (response.ok) {
      alert('Not başarıyla yüklendi!');
      if (noteInput) noteInput.value = '';
    } else {
      alert('Not yüklenirken bir hata oluştu.');
    }
  } catch (error) {
    console.error('Not yükleme hatası:', error);
    alert('Bir hata oluştu. Lütfen tekrar deneyin.');
  }
}

// Not Yükleme Butonuna Tıklama Olayı
const uploadNoteButton = document.getElementById('uploadNote');
if (uploadNoteButton) {
  uploadNoteButton.addEventListener('click', uploadNote);
}