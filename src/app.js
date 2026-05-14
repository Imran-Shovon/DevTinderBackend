const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
    res.send("User created successfully");
    }
    catch (error) {
        console.error("Error creating user", error);
        res.status(400).send("Error creating user");
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
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data, { returnDocument: "after" });

    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
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
