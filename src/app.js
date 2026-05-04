const express = require("express");
const app = express();

app.get("/user", (req, res) => {
    res.send({"firstName": "shovon", "lastName": "biswas"});
});

app.post("/user", (req, res) => {
  res.send("Data saved successfully");
});

app.delete("/user", (req, res) => {
    res.send("Data deleted successfully");
})

//This will match all HTTP methods (GET, POST, PUT, DELETE, etc.) for the "/user" route
app.use("/test",(req, res) => {
    res.send("Hello World");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});