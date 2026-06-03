const express = require('express');
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleswares/auth");
const ConnectionRequest = require("../models/connectionRequest");



requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];

    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message: "Invalid status type: " + status,
        
      })
    }

    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({
        message: "User not found.",
      })
    }

    const existingConnectionRequst = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ]
    });

    if(existingConnectionRequst){
      return res.status(400).json({
        message: "Connection request already exists.",
      })
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    })
    const data = await connectionRequest.save();
    res.json({
      message: req.user.firstName + " is " + status + " to "+ toUser.firstName,
      data,
    })
  }
  catch(err){
    console.log(err);
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = requestRouter;