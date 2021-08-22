const express = require('express');
const expressHbs = require('express-handlebars');
const path = require("path");

const app = express();
const calc = require('./helper/calc')
const {PORT,calcPath,loginPath,registrationPath} = require('./config/varisbles');
const writeUser = require('./helper/writeFile');
let users = require('./db/users.json');

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

app.get(calcPath, (req, res) => {
    res.render('calc')
});

app.get(loginPath, (req, res) => {
    res.render('login');
});

app.get(registrationPath, (req, res) => {
    res.render('registration');
})

app.post(calcPath, (req, res) => {
    const result = calc(+req.body.n1, +req.body.n2, req.body.operation);
    res.render('result', {result});
});

app.post(loginPath, (req, res) => {
    const {name, password} = req.body;
    const userValid = users.find(user => {
        return ((user.name === name) && (user.password === password))
    });

    if (userValid) {
        res.redirect(calcPath)
    } else {
        res.render('badLog', {name})
    }

});

app.post(registrationPath, (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    writeUser(path.join(__dirname, 'db', 'users.json'), users)

    res.redirect(loginPath);
})

app.listen(PORT, () => {
    console.log('listen ', PORT)
})





