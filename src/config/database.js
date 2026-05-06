const mongoose = require("mongoose");


const url = "mongodb://shovonbiswas123:shovonbiswas123@ac-cbcw3c7-shard-00-00.dxq8snk.mongodb.net:27017,ac-cbcw3c7-shard-00-01.dxq8snk.mongodb.net:27017,ac-cbcw3c7-shard-00-02.dxq8snk.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-u4l75v-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectDB = async () => {
    await mongoose.connect(url);
}

module.exports = connectDB;
