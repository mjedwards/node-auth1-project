const db = require("./dbConfig");

module.exports = {
  addUser,
  userLogin,
  find
};

function addUser(user) {
  return db("Users").insert(user);
}

function userLogin(user) {
  return db("Users")
    .where(user)
    .select("id", "email", "password");
}

function find() {
  return db("users").select("id", "email");
}
