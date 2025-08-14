import Home from './pages/home.js';
import About from './pages/about.js';
import Contact from './pages/contact.js';

export default function router(route) {
    switch (route) {
        case 'home':
            return Home;
        case 'about':
            return About;
        case 'contact':
            return Contact;
        default:
            return () => `<h2>404 - Sayfa Bulunamadı</h2>`;
    }
}