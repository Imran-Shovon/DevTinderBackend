const express = require('express');
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleswares/auth");
const { validateEditProfileData } = require("../utils/validation");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
  const user = req.user;
  res.send(user);
  }
  catch (error) {
    res.status(401).send("Unauthorized: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit fields in request body");
    }

    const loggedInUser = req.user;
    // console.log("Logged in user: ", loggedInUser);
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    res.json({ 
      message: `${loggedInUser.firstName} your profile updated successfully`,
      data: loggedInUser
     });
  }
  catch (error) {
    res.status(401).send("Unauthorized: " + error.message);
  }
})

module.exports = profileRouter;