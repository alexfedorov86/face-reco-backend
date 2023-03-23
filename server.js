const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

// Setup connection to PostgreSQL database
db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'face-recognition'
  }
});

function timeNow() {
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

app.use(express.json());
app.use(cors());

// Route not used by our app at the moment
app.get('/', (req, res) => {
  res.json('Welcome!');
  console.log('Request received', timeNow());
  db.select('*').from('users').then(data => {
    console.log(data);
  })
})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
// Profile not used at the moment, created for future functionality:
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
// Receive POST with image url from FE:
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.listen(3000, () => {
  console.log('App is running on port 3000');
})