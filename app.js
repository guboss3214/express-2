require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash');
const connectDB = require('./db/connectDB');
const jwt = require('jsonwebtoken');
const infoRoute = require('./routes/getInfoRoute');

const users = [];

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    const user = users.find(u => u.email === email);
    if (!user) return done(null, false, { message: 'User not found' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false, { message: 'Invalid password' });

      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  const user = users.find(u => u.email === email);
  done(null, user);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', 
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 1000 } 
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views/pug'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/favicon.ico', express.static(path.join(__dirname, 'public/favicon.ico')));

const authenticateToken = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error('Invalid JWT:', err.message);
    return res.redirect('/login');
  }
};


app.use('/getInfo', authenticateToken, infoRoute);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', user: req.user });
});

app.get('/views', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
});


app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ email, password: hashedPassword });

  req.flash('success', 'Registration successful. Please log in.');
  res.redirect('/login');
});

app.post('/theme', (req, res) => {

  const { theme } = req.body;

  res.cookie('theme', theme, { maxAge: 365 * 24 * 60 * 60 * 1000 });

  res.status(200).send();

});

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    messages: req.flash('error'),
    successMessages: req.flash('success') 
  });
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login');
    }

    req.login(user, (err) => {
      if (err) return next(err);

      // 🔥 JWT токен
      const token = jwt.sign(
        { email: user.email },
        process.env.SESSION_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('token', token, { httpOnly: true });

      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});


app.get('/dashboard', authenticateToken, (req, res) => {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
