const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

const authCookieName = 'authentication';

let users = [];
let authenticated = [];
let matches = [];



class User {
    constructor(username, password, wins, losses){
        this.username = username;
        this.password = password;
        this.wins = wins;
        this.losses = losses;
    }

    incrementWins(){
        this.wins++;
    }

    incrementLosses(){
        this.losses++;
    }
}
class AuthData {
    constructor (username, token){
        this.username = username;
        this.token = token;
    }
}

class Match {
    constructor(matchID, matchName, player1=null, player2=null){
        this.matchID = matchID
        this.matchName = matchName
        this.player1 = player1;
        this.player2 = player2;
    }

    setPlayer1(player1){
        this.player1 = player1;
    }

    setPlayer2(player2){
        this.player2 = player2;
    }
}

//Middleware to verify authentication
const verifyAuth = async (req, res, next)=> {
    const authenticate = await findAuth('token', req.cookies[authCookieName]);
    if (authenticate){
        next();
    } else {
        res.status(401).send({msg: 'Unauthorized'})
    }
}

//Test users endpoint
apiRouter.get('/user', (req, res) => {
    res.send(users);
})

//Test auth endpoint
apiRouter.get('/authenticated', (req, res) => {
    res.send(JSON.stringify(authenticated));
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

//Logout Endpoint
apiRouter.delete('/session', verifyAuth, async (req, res)=> {
    const authData = await findAuth('token', req.cookies[authCookieName]);

    console.log('logout, ' + authData.username);
    authenticated = authenticated.filter((auth) => auth['token'] !== req.cookies[authCookieName]);
    res.clearCookie(authCookieName);
    res.status(204).end();
});

//Get matches endpoint
apiRouter.get('/match', (req, res) => {
    res.send(matches);
});

//create match endpoint
apiRouter.post('/match', verifyAuth, (req, res) => {
    console.log('create game');
    const matchName = req.body.matchName;
    const id = generateUMID();
    if (matchName == '') {
        res.status(400).send({msg: "Please enter a match name"});
    }
    if (id < 0) {
        res.status(400).send({msg: "No more games can be created."});
    } else {
        const newMatch = new Match(id, matchName);
        matches.push(newMatch);
        res.send({id: id});
    }
});

//join match endpoint
apiRouter.put('/match', verifyAuth, async (req, res) => {
    const authData = await findAuth('token', req.cookies[authCookieName]);
    const matchID = req.body.matchID;
    const match = matches.find(m => m.matchID == matchID);
    const matchIndex = matches.indexOf(match);
    if (matchIndex < 0) {
        res.status(400).send({msg: "Not a valid gameID"})
    } else {
        if (req.body.playerNo === 1){
                if (match.player1 != null){
                    res.status(403).send({msg: "Already taken"})
                } else {
                    match.setPlayer1(authData.username);
                }
            } else if (req.body.playerNo === 2){
                if (match.player2 != null){
                    res.status(403).send({msg: "Already taken"})
                } else {
                    match.setPlayer2(authData.username);
                }
            }
            matches[matchIndex] = match;
            res.status(200).end();
    }
    
});

//Finish Match Endpoint
apiRouter.put('/result', verifyAuth, async (req, res) => {
    const authData = await findAuth('token', req.cookies[authCookieName]);
    const user = users.find(u => u.username == authData.username);
    const userIndex = users.indexOf(user);
    if (req.body.victor){
        user.incrementWins();
    } else {
        user.incrementLosses();
    }
    users[userIndex] = user;

    console.log("Deleting match " + req.body.matchID);
    matches = matches.filter(m => m.matchID != req.body.matchID);
    res.end();
})

//Deals endpoint
apiRouter.get('/deals', async (req, res)=>{
    fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15")
      .then(async (response) => {
        return await response.json();
      })
      .then(data => res.send(data))
      .catch(err => {
        console.log(err);
        res.send([]);
      });
})

//generate an authentication token and send it back to client as a cookie
function createAuthCookie(username, res){
    const newAuthData = new AuthData(username, uuid.v4());
    console.log(newAuthData);
    res.cookie(authCookieName, newAuthData.token, {
        maxAge: 100 * 60 * 60 * 24 * 365,
        secure : true,
        httpOnly: true,
        sameSite: 'strict'
    });
    authenticated.push(newAuthData);
}

function generateUMID(){
    let id;
    let iters = 0;

    while (true){
        iters++;
        id = Math.floor(Math.random()*1000)
        let unique = true;
        for (const match of matches){
            unique = match.matchID === id ? false : true;
            if (!unique) break;
            if (iters > 1000) return -1;
        }
        if (unique) break;
    }

    return id;
}

async function findAuth(field, value){
    if (!value) return null;    
    return authenticated.find((u) => u[field] === value);
}

// log when listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

