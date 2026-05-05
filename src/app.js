const express = require("express");
const app = express();

app.use("/user", (req, res, next) => {
    next();
    // res.send("Response 1");
},
(req, res, next) => {
    // res.send("Response 2");
    next();
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});