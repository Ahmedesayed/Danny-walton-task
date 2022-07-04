"use strict";

const bcrypt = require("bcryptjs"),
  fileSrvc = require("../helpers/file");

var controllers = {
  login: async (req, res) => {
    var users = [];
    const params = req.body;
    try {
      users = await fileSrvc.readFileData(`users`);
    } catch (error) {}
    var user = users.find((e) =>
      checkUser(e, params.password, params.username)
    );
    if (user) {
      delete user.password;
      res.json(user || {});
    } else res.end(null);
  },

  signup: async (req, res) => {
    const user = req.body;
    user.id = Date.now();
    await fileSrvc.appendFileData(user, `users`);
    delete user.password;
    res.json(user);
  },
};

function checkUser(user, password, username) {
  return (
    bcrypt.compareSync(password, user.password) &&
    (user.username === username || user.email === username)
  );
}

module.exports = controllers;
