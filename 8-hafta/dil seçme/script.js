const texts = {
  tr: {
    title: "Hakkımda",
    body: "Merhaba benim adım Yasin. Ben bir yazılım geliştiricisiyim ve web teknolojilerine ilgi duyuyorum."
  },
  en: {
    title: "About Me",
    body: "Hello, my name is Yasin. I am a software developer and I am interested in web technologies."
  }
};

let currentLang = localStorage.getItem('siteLang') || 'tr';

const langBtn = document.getElementById('langBtn');
const langFlag = document.getElementById('langFlag');
const langPanel = document.getElementById('langPanel');
const mainContent = document.getElementById('mainContent');
const mainText = document.getElementById('mainText');

function setLanguage(lang) {
  mainContent.querySelector('h1').textContent = texts[lang].title;
  mainText.textContent = texts[lang].body;
  currentLang = lang;
  localStorage.setItem('siteLang', lang);
  if (langFlag) {
    langFlag.textContent = lang === 'tr' ? '🇹🇷' : '🇬🇧';
  }
}

// Sayfa açıldığında seçili dili uygula
setLanguage(currentLang);

langBtn.addEventListener('click', () => {
  langPanel.style.display = 'flex';
});

// Panel dışına tıklanınca paneli kapat
langPanel.addEventListener('mousedown', function(e) {
  if (e.target === langPanel) {
    langPanel.style.display = 'none';
  }
});

document.getElementById('langClose').addEventListener('click', () => {
  langPanel.style.display = 'none';
});

document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', function() {
    const lang = this.getAttribute('data-lang');
    setLanguage(lang);
    langPanel.style.display = 'none';
  });
});