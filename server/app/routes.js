"use strict";

const authCtrl = require("./controllers/auth");
const usersCtrl = require("./controllers/users");
const meetingsCtrl = require("./controllers/meetings");

module.exports = (app) => {
  // API ROUTE
  app.route('/api').get((res,req)=> res.send("VLC API Works !!!!"));

  // Users
  app.route("/api/users").get(usersCtrl.getAll);
  app.route("/api/users/email").get(usersCtrl.checkEmail);
  app.route("/api/users/username").get(usersCtrl.checkUsername);

  // Meetings
  app.route("/api/meetings").get(meetingsCtrl.getUserMeetings);
  app.route("/api/meetings/:id").get(meetingsCtrl.getById);
  app.route("/api/meetings").post(meetingsCtrl.add);
  app.route("/api/meetings").put(meetingsCtrl.update);
  app.route("/api/meetings/:id").delete(meetingsCtrl.delete);

  // Auth
  app.route("/api/login").post(authCtrl.login);
  app.route("/api/signup").post(authCtrl.signup);
};
