// console.log('🔧 Starting server...');
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config(); // ← important

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('public'));

// // Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('✅ Connected to MongoDB Atlas');
// }).catch((err) => {
//   console.error('❌ MongoDB connection error:', err);
// });

// // Routes
// const entriesRoute = require('./routes/entries');
// app.use('/api/entries', entriesRoute);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

// console.log('🔧 Starting server...');
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: true,
//   credentials: true // Allow session cookies from frontend
// }));
// app.use(bodyParser.json());
// app.use(express.static('public'));

// // Session Middleware
// app.use(session({
//   secret: 'yourSecretKey', // Replace this with a strong secret
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URI,
//     collectionName: 'sessions'
//   }),
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 // 1 day
//   }
// }));

// // Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('✅ Connected to MongoDB Atlas');
// }).catch((err) => {
//   console.error('❌ MongoDB connection error:', err);
// });

// // Routes
// const entriesRoute = require('./routes/entries');
// const authRoute = require('./routes/auth'); // 🔑 Add auth route

// app.use('/api/entries', entriesRoute);
// app.use('/api/auth', authRoute); // 🆕 Auth route added

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

console.log('🔧 Starting server...');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true // Allow session cookies from frontend
}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}
// ✅ Add register and login page routes HERE
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});
// 🔐 Protect the main diary page
app.get('/', isAuthenticated, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
const entriesRoute = require('./routes/entries');
const authRoute = require('./routes/auth');

app.use('/api/entries', entriesRoute);
app.use('/api/auth', authRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

