const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middleswares/auth");


app.use("/admin", adminAuth);
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
   try{
    throw new Error("Something went wrong in admin route");
    res.send("All data send")
   }
   catch(err) {
    res.status(500).send("An error occurred: " + err.message);
   }
});


app.get("/user", userAuth, (req, res) => {
    res.send("All User data send")
});

app.delete("/admin/deleteUser", (req, res) => {
    
    res.send("User deleted")
});

app.use("/userError", (err, req, res, next) => {
    if(err) {
        res.status(500).send("An error occurred: " + err.message);
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});