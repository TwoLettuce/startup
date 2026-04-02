const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const authCollection = db.collection('auth');
const matchCollection = db.collection('match');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function addUser(user) {
  await userCollection.insertOne(user);
}

function getUser(username) {
  return userCollection.findOne({ username: username });
}

async function getUsers() {
  return userCollection.find({}).toArray();
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function addAuth(auth){
  await authCollection.insertOne(auth);
}

async function getAuthDatas(){
  const auths = await authCollection.find({});
  return auths;
}

function getAuthDataByToken(token) {
  return authCollection.findOne({ token: token });
}

async function removeAuth(auth) {
  await authCollection.deleteOne({ token: auth.token });
}

async function addMatch(match) {
  await matchCollection.insertOne(match);
}

async function updateMatch(match) {
  await matchCollection.updateOne({ matchID: match.matchID }, { $set: match });
}

async function removeMatch(matchID) {
  await matchCollection.deleteOne({ matchID: Number(matchID) });
}

async function getMatch(matchID) {
  await matchCollection.findOne({ matchID: matchID });
}

async function getMatches() {
  return matchCollection.find({}).toArray();
}




module.exports = {
  addUser,
  getUser,
  updateUser,
  addAuth,
  getAuthDatas,
  getAuthDataByToken,
  removeAuth,
  getUsers,
  addMatch,
  updateMatch,
  removeMatch,
  getMatch,
  getMatches
};
