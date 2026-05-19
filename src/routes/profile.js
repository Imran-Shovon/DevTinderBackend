const express = require('express');
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleswares/auth");


profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
  const user = req.user;
  res.send(user);
  }
  catch (error) {
    res.status(401).send("Unauthorized: " + error.message);
  }
})

module.exports = profileRouter;