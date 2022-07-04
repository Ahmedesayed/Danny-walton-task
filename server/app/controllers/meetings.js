"use strict";

const fileSrvc = require("../helpers/file"),
  dateSrvc = require("../helpers/dateValidation");

var controllers = {
  getUserMeetings: async (req, res) => {
    var meetings = [];
    const userId = req.headers["x-access-token"];
    try {
      meetings = await fileSrvc.readFileData(`meetings`);
      meetings = meetings.filter((e) => e.userId == userId);
    } catch (error) {}
    res.json(meetings);
  },

  getById: async (req, res) => {
    var meetings = [];
    const id = req.params.id,
      userId = req.headers["x-access-token"];
    try {
      meetings = await fileSrvc.readFileData(`meetings`);
    } catch (error) {}
    res.json(meetings.find((e) => e.id == id && e.userId == userId));
  },

  add: async (req, res) => {
    var meeting = req.body;
    if (await isMeetingDatesAvailablity(meeting)) {
      meeting.id = Date.now();
      meeting.userId = Number(req.headers["x-access-token"]);
      await fileSrvc.appendFileData(meeting, `meetings`);
      res.json(meeting);
    } else {
      res
        .status(400)
        .send({error:"Meeting dates are not available please choose another dates"});
    }
  },

  update: async (req, res) => {
    const meeting = req.body;
    if (await isMeetingDatesAvailablity(meeting)) {
      await fileSrvc.appendFileData(meeting, `meetings`);
      res.json(meeting);
    } else {
      res
        .status(400)
        .send({error:"Meeting dates are not available please choose another dates"});    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    res.json(await fileSrvc.deleteFileData(id, "meetings"));
  },
};

module.exports = controllers;

async function isMeetingDatesAvailablity(meeting) {
  var meetings = await fileSrvc.readFileData("meetings");
  if(meeting.id) meetings = meetings.filter((e)=> e.id !== meeting.id);
  for (let index = 0; index < meetings.length; index++) {
    const element = meetings[index];
    if (
      !dateSrvc.isDateAvailable(element.start, element.end, meeting.start) ||
      !dateSrvc.isDateAvailable(element.start, element.end, meeting.end)
    )
      return false;
  }
  return true;
}
