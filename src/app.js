const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt")
const validator = require("validator");


app.use(express.json());

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

//Get User by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({emailId: userEmail})
    if(user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  }
  catch (error) {
    res.status(400).send("User not found");
  }
})

//Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try{
    const users = await User.find({});
    res.send(users);
  }
  catch (error) {
    res.status(400).send("Error fetching users");
  }
})


// Delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  }
  catch(error){
    res.status(400).send("Error deleting user");
  }
})

// Update data of the user.
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key),
    );

    if (!isUpdateAllowed) {
      return res.status(400).send("Invalid updates");
    }

    if(data.skills.length > 20) {
      return res.status(400).send("Skills can not be more than 20");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });

    res.send(user);
  } catch (error) {
    res.status(400).send("User update is unsuccessful: " + error.message);
  }
});


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
