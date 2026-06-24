const express = require('express');
const cors = require('cors');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// Session Store
const sessionStore = new SequelizeStore({ db: sequelize });

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 din
    httpOnly: true
  }
}));

// Routes
app.use('/api/auth', authRoutes);

// Sync session store
sessionStore.sync();

// Middleware — Role Check
const isAuth = (req, res, next) => {
  if (!req.session.user) return res.status(401).json({ error: 'Not logged in' });
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.user) return res.status(401).json({ error: 'Not logged in' });
  if (req.session.user.role !== 'admin') return res.status(403).json({ error: 'Admins only!' });
  next();
};

// Protected Routes
app.get('/api/dashboard', isAuth, (req, res) => {
  res.json({ message: `Welcome ${req.session.user.username}!`, role: req.session.user.role });
});

app.get('/api/admin', isAdmin, (req, res) => {
  res.json({ message: `Welcome Admin ${req.session.user.username}!` });
});

// DB Sync & Start
sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});