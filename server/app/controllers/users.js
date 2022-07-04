"use strict";

const fileSrvc = require("../helpers/file");

var controllers = {
  getAll: async (req, res) => {
    var users = [], myId = req.headers["x-access-token"];
    try {
      users = await fileSrvc.readFileData(`users`);
      users = users.filter((e)=> e.id != myId)
    } catch (error) {}
    users.forEach((element) => {
      delete element.password;
    });
    res.json(users);
  },
  checkEmail: async (req, res) => {
    const email = req.query.email;
    try {
      var users = [];
      users = await fileSrvc.readFileData(`users`);
      res.json(isEmailAvailable(email, users));
      return;
    } catch (error) {
    }
    res.json(false);
  },
  checkUsername: async (req, res) => {
    const username = req.query.username;
    try {
      var users = [];
      users = await fileSrvc.readFileData(`users`);
      res.json(isUsernameAvailable(username, users));
      return;
    } catch (error) {
    }
    res.json(false);
  },
};

module.exports = controllers;

function isEmailAvailable(email, users) {
  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    if (element.email === email) return false;
  }
  return true;
}

function isUsernameAvailable(username, users) {
  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    if (element.username === username) return false;
  }
  return true;
}
