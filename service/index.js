const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'authentication';

let users = [];
let games = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;


app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);


//Test endpoint
apiRouter.get('/user', (req, res) => {
    users.push({greeting: 'bonjour!'});
    res.send(users);
})

//Register Endpoint
apiRouter.post('/user', (req, res) => {
    if (users.find((u) => u['username'] === req.username)){
        res.status(409).send({msg: 'User with that Username already exists!'});
    } else {
        res.send({msg: 'You registered!'})
    }
});


// log when listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
