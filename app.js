require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views/pug'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/favicon.ico', express.static(path.join(__dirname, 'public/favicon.ico')));

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    });
};

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/views', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
});

app.post('/theme', (req, res) => {
    const { theme } = req.body;
    res.cookie('theme', theme, { maxAge: 365 * 24 * 60 * 60 * 1000 }); 
    res.json({ success: true });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

app.get('/dashboard', authenticateToken, (req, res) => {
    res.render('dashboard', { title: 'Dashboard', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 