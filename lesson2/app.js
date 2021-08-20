const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require("fs");
const path = require("path");

const app = express();
const {PORT,usersPath} = require('./config/varisbles');
const writeUser=require('./helper/writeFile')
let users = require('./db/users');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')))

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/ping', (req, res) => {
    res.json('pong')
});

app.get('/', (req, res) => {
    res.render('startPage');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/registration', (req, res) => {
    res.render('registration');
})

app.get(usersPath, (req, res) => {
    res.render('users', {users})
});

app.get(`${usersPath}/:user_id`, (req, res) => {
    const {user_id} = (req.params);
    const currentUser = users.find(user => +user.id === +user_id);

    if (!currentUser) {
        res.status(404).end('user not found');
        return;
    }

    res.json(currentUser);
});

app.post('/login', (req, res) => {
    const {name, password} = req.body;
    const userValid = users.find(user => {
        return ((user.name === name) && (user.password === password))
    });

    if (userValid) { res.redirect(usersPath)}
  else  {res.render('badLog', {name})}
    });

app.post('/registration', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    writeUser(path.join(__dirname, 'db', 'users.js'),users)

    res.redirect(`/login`);
})

app.listen(PORT, () => {
    console.log('listen ', PORT)
})





