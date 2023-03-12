const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'something123',
        database: 'face-detector'
    }
});

const app = express();


app.use(bodyParser.json()); //middleware
app.use(cors());


app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt, saltRounds, myPlaintextPassword)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds, myPlaintextPassword)}); //dependecy injection

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res, db)});

app.put('/image', (req,res) => {image.handleImage(req,res,db)});

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)});


// put is a way to update things

app.listen(3000, () => {
    console.log('everything ok!');
})


// const PORT = process.env.PORT
// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// })

// console.log(PORT);


// const DATABASE_URL = process.env.DATABASE_URL
// app.listen(3000, () => {
//     console.log(`Server is listening on port ${DATABASE_URL}`);
// })

// console.log(3000);

// app.listen(process.env.PORT || 3000, () => {
//     console.log(`Server is listening on port ${process.env.PORT}`);
// })