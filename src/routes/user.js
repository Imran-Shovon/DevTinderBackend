const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middleswares/auth");
const ConnectionRequest = require("../models/connectionRequest");

//Get all the pending request or the loggedIn user
userRouter.get("/user/requests", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", "firstName lastName photoUrl age gender about skills");
        // }).populate("fromUserId", ["firstName", "lastName"])

        res.json({
            message: "Data fetched successfully.",
            data: connectionRequests
         });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = userRouter;