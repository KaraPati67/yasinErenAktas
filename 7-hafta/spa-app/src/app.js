import router from './router.js';

function renderPage(page) {
    const app = document.getElementById('app');
    app.innerHTML = page();
}

function init() {
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'home';
        renderPage(router(hash));
    });

    const initialHash = window.location.hash.slice(1) || 'home';
    renderPage(router(initialHash));
}

document.addEventListener('DOMContentLoaded', init);