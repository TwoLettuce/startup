const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const authCollection = db.collection('auth');

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
  return userCollection;
}

function getAuthDataByToken(token) {
  return authCollection.findOne({ token: token });
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function removeAuth(user) {
  await userCollection.removeOne({ token: user.token });
}

async function addMatch(match) {

}

async function updateMatch(match) {

}

async function removeMatch(match) {

}

async function getMatch() {

}

async function getMatches() {

}





module.exports = {
  addUser,
  getUser,
  getAuthDataByToken,
  updateUser,
  removeAuth,
  getUsers,
  addMatch,
  updateMatch,
  removeMatch,
  getMatch,
  getMatches
};
