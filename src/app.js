const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middleswares/auth");


app.use("/admin", adminAuth);
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
   
    res.send("All data send")
});


app.get("/user", userAuth, (req, res) => {
    res.send("All User data send")
});

app.delete("/admin/deleteUser", (req, res) => {
    
    res.send("User deleted")
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});