const express = require('express');
const expressHbs = require('express-handlebars');
const path = require("path");

const app = express();
const {PORT} = require('./config/varisbles')
let users = require('./db/users');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')))

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

///////////////////////
app.get('/ping', (req, res) => {
    res.json('pong')
});
////////////////////////////
app.get('/', (req, res) => {
 // res.status(400).end('not found');
// res.write('Hello');
// res.json({name:'asdfg',age : 25})
// res.send('<h1> qqqqqqqqqqqqqqqqqqqqqQQQQQQQQ</h1>');
//     res.end('qqqqqqqqqqqqq');
    res.render('startPage');
});
//////////////////////////////
app.get('/login', (req, res) => {
    res.render('login', {isMale: true});
});
////////////////////////////
app.get('/registration', (req, res) => {
    res.render('registration');
})
//////////////////////////////////
app.get('/users', (req, res) => {
    res.render('users', {users})
});
/////////////////
app.get('/users/:user_id', (req, res) => {
    const {user_id} = (req.params);

    const currentUser = users.find(user => {
        return (user.id == user_id)
    });

    if (!currentUser) {
        res.status(404).end('user not found');
        return;
    }

    res.json(currentUser);
});
/////////////////////////////

app.post('/users', (req, res) => {
    const {name, password} = req.body;
    const userValid = users.find(user => {
        return ((user.name === name) && (user.password === password))
    });

    if (userValid) {
        res.render('users', {users});
    } else {
        res.render('badLog', {name});
    }
});
////////////////////////////////

app.post('/login', (req, res) => {

    let newUser = req.body;
    newUser.id = Math.round(Math.random() * 100);
    users.push(newUser);

    let isMale = false;
    if (newUser.gender === 'male') {
        isMale = true
    }

    res.render('login', {isMale});
})
/////////////////////////////
app.listen(PORT, () => {
    console.log('listen ', PORT)
})

