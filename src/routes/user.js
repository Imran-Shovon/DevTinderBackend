const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

const { userAuth } = require("../middleswares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

//Get all the pending request or the loggedIn user
userRouter.get("/user/requests", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);
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

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({
          message: "Data fetched successfully.",
          data: data,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit; // Max limit of 50
        const skip = (page - 1) * limit;


        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ]
        });
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) =>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        const feedUsers = await User.find({
            _id: { $ne: loggedInUser._id, $nin: Array.from(hideUsersFromFeed) },
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        
        res.json({
            message: "Feed data fetched successfully.",
            data: feedUsers,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = userRouter;