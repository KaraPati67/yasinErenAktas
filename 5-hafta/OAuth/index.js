const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
const session = require('express-session');

const app = express();

// Google OAuth yapılandırması
passport.use(new GoogleStrategy({
    clientID: '135349768388-d9h3gkm2ipuuq8mb414t3guehi3a59he.apps.googleusercontent.com', // Google API Console'dan alınan ID
    clientSecret: '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', // Google API Console'dan alınan Secret
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(session({
    secret: 'AIzaSyCdUQpOmbIcgAGF8FjLKi9ETRSjPo9ZLj4-', // Güvenli bir secret anahtarı kullanın
    resave: false,
    saveUninitialized: true
}));

app.use(session({ secret: 'AIzaSyCdUQpOmbIcgAGF8FjLKi9ETRSjPo9ZLj4-', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Anasayfa olarak index.html'i göster
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Google ile giriş
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const name = req.user.displayName;
        const picture = req.user.photos[0].value;
        res.redirect(`/profile?name=${encodeURIComponent(name)}&picture=${encodeURIComponent(picture)}`);
    }
);

app.get('/profile', (req, res) => {
    const name = req.query.name;
    const picture = req.query.picture;
    res.sendFile(path.join(__dirname, 'profile.html'));
});

app.listen(3000, () => {
    console.log('Sunucu çalışıyor: http://localhost:3000');
});

// ESC tuşuna basıldığında programı durdur
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', (key) => {
    if (key.toString() === '\x1B') { // ESC tuşu
        console.log('Program durduruluyor...');
        process.exit();
    }
});