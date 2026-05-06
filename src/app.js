const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post("/signup", async (req, res) => {
    const userObj = {
      firstName: "Aksay",
      lastName: "saini",
      emailId: "aksay.saini.cse@gamil.com",
      password: "aksay123",
      age: 28,
      gender: "Male",
      _id: "507f1f77bcf86cd799439011",
    };
    const user = new User(userObj);

    try {
        await user.save();
    res.send("User created successfully");
    }
    catch (error) {
        console.error("Error creating user", error);
        res.status(400).send("Error creating user");
    }
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
