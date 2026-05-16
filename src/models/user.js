const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 100,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    },
    runValidators: true,
  },
  photoUrl: {
    type: String,
    default: "https://avatars.githubusercontent.com/u/30509968?v=4",
  },
  about: {
    type: String,
    default: "Hello! I'm new here.",
  },
  skills: {
    type: [String],
  },
}, {
    timestamps: true,
});

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);