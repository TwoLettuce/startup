const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'authentication';

let users = [];
let authenticated = [];
let games = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

class User {
    constructor(username, password, wins, losses){
        this.username = username;
        this.password = password;
        this.wins = wins;
        this.losses = losses;
    }
}
class AuthData {
    constructor (username, token){
        this.username = username;
        this.token = token;
    }
}


//Test users endpoint
apiRouter.get('/user', (req, res) => {
    res.send(users);
})

//Test auth endpoint
apiRouter.get('/auth/authenticated', (req, res) => {
    res.send(JSON.stringify(authenticated));
});

//Test games endpoint
apiRouter.get('/auth/game', verifyAuth, (req, res) => {
    res.send(games);
});


//Register Endpoint
apiRouter.post('/user', (req, res) => {
    console.log('register, ' + req.body.username);
    if (users.find((u) => u['username'] === req.body.username)){
        res.status(409).send({msg: 'User with that Username already exists!'});
    } else {
        createAuthCookie(req.body.username, res);
        const newUser = new User(req.body.username, req.body.password, 0, 0);
        users.push(newUser);
        res.send({username: req.body.username});
    }
});

//Login Endpoint
apiRouter.post('/session', (req, res)=> {
    console.log('login, ' + req.body.username);
    if (users.find((u) => u['username'] === req.body.username && u['password'] === req.body.password)){
        createAuthCookie(req.body.username, res);
    } else {
        res.status(409).send({msg: 'Invalid credentials!'});
        res.send({username: req.body.username});
    }
});



//generate an authentication token and send it back to client as a cookie
function createAuthCookie(username, res){
    const newAuthData = new AuthData(username, uuid.v4());
    console.log(newAuthData);
    res.cookie(authCookieName, newAuthData.token, {
        maxAge: 100 * 60 * 60 * 24 * 365,
        secure : true,
        httpOnly: true,
        sameSite: 'strict',
    });
    authenticated.push(newAuthData);
}

//Middleware to verify authentication
function verifyAuth(req, res, next) {
    const user = users.find((u) => u[token].token == req.cookies[authCookieName]);
    if (user){
        next();
    } else {
        res.status(401).send({msg: 'Unauthorized'})
    }
}


// log when listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

