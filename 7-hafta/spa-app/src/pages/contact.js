export default function Contact() {
    return `
        <div>
            <h1>İletişim</h1>
            <p>Herhangi bir sorunuz varsa, bize ulaşmaktan çekinmeyin!</p>
            <form>
                <label for="name">Adınız:</label>
                <input type="text" id="name" name="name" required>
                
                <label for="email">E-posta:</label>
                <input type="email" id="email" name="email" required>
                
                <label for="message">Mesajınız:</label>
                <textarea id="message" name="message" required></textarea>
                
                <button type="submit">Gönder</button>
            </form>
        </div>
    `;
}