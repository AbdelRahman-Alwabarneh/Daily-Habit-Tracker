const mongoose = require("mongoose");
const HabitSchema = new mongoose.Schema({
  NameHabit: { type: String, required: true },
  Habit_description: { type: String, required: true },
  Categories: { type: String },
  isDeleted: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
});

module.exports = mongoose.model("Habit", HabitSchema, "Habits");
