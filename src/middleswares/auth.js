const jwt = require("jsonwebtoken");
const User = require("../models/User");


const userAuth = async (req, res, next) => {
  try{
    //Read the token from the req cookies
    const { token } = req.cookies;
    if(!token) {
      throw new Error("Invalid token.");
    }

    //Validate the token
    const decodedObj = await jwt.verify(token, "Dev@Tinder");
    const { _id } = decodedObj;

    // Find the user
    const user = await User.findById(_id);
    if(!user) {
      throw new Error("User not found.");
    }
    
    req.user = user;
    next();
  }
  catch(error) {
    res.status(401).send("Unauthorized: " + error.message);
  }

};



module.exports = { userAuth };