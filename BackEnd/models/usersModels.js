const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

module.exports = mongoose.model("User", usersSchema, "Users");
