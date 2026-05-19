const express = require('express');
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleswares/auth");



requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log("User: ", req.user);
  res.send(req.user.firstName + " Send the connection request!");
});

module.exports = requestRouter;