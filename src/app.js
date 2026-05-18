const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt")
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleswares/auth");


app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
      //Validation of data
      validateSignUpData(req);

      const { firstName, lastName, emailId, password } = req.body;

      //Hashing the password
      const passwordHash = await bcrypt.hash(password, 10);
      console.log("Password hash: ", passwordHash);

      const user = new User({
        firstName, lastName, emailId, password: passwordHash
      });
      await user.save();
      res.send("User created successfully");
    }
    catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

app.get("/profile", userAuth, async (req, res) => {
  try {
  const user = req.user;
  res.send(user);
  }
  catch (error) {
    res.status(401).send("Unauthorized: " + error.message);
  }
})

app.post("/login", async (req, res) => {

  try {
    const { emailId, password } = req.body;
    if(!validator.isEmail(emailId)) {
      throw new Error("Invalid email");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid) {
      //Create a JWT token
      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder", {expiresIn: "1h"});
      console.log("Generated token: ", token);

      //Add the token to cookies and send the response to the user.
      res.cookie("token", token, {
        expires: new Date(Date.now() + 3600000), // 1 hour
      });


      res.send("Login successful");
    }
    else {
      throw new Error("Invalid password");
    }
  }
  catch (error) {
    res.status(400).send("Error: " + error.message);
  }
})

app.post("/sendConnectionRequest", userAuth, async(req, res) => {
  console.log("User: ", req.user);
  res.send(req.user.firstName + " Send the connection request!")
})

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database can not be connected", error);
  });
