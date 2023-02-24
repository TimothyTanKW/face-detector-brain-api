const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const cors = require('cors');

const app = express();
app.use(bodyParser.json()); //middleware
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'tim',
            email: 'tim@gmail.com',
            password: 'timmie',
            entries: 0,
            joined: new Date()
        },
        {
            id: '155',
            name: 'ph',
            email: 'ph@gmail.com',
            password: 'phkr',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id:'589',
            hash: '',
            email: 'tim@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users);
});

app.post('/signin', (req, res) => {
    bcrypt.compare(myPlaintextPassword, '$2b$10$60ixCIJe9SSDHqq5wO7hZeSGGAL6u9wUiLI8cKjZMeuJ6tr9nSpg6', function(err, result) {
        console.log('this is true', result)
    });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        // res.json("success");
        res.json(database.users[0]); 
    } else {
        res.status(404).json('error login')
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '923',
        name: name,
        email: email,
        // password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if(!found) {
        res.status(404).json('no such user');
    }
});


app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        } 
    })
    if(!found) {
        res.status(404).json('not found');
    }
});

app.listen(3000, () => {
    console.log('everything ok!');
})



//to create,
// signin
// register
// profile
// image


// app.post('/register', (req, res) => {
//     const { email, name, password } = req.body;
//     database.users.push({
//         id: '923',
//         name: 'wkk',
//         email: 'wkk@gmail.com',
//         password: 'wkkvk',
//         entries: 5,
//         joined: new Date()
//     })
//     res.json(database.users[database.users.length - 1]);
// });
