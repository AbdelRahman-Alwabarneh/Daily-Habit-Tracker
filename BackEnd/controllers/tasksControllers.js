const Habit = require("../models/habitsModels");

exports.createHabit = async (req, res) => {
  try {
    const { NameHabit, Habit_description, Categories } = req.body;

    if (!NameHabit || !Habit_description || !Categories) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHabit = await Habit.create({
      NameHabit,
      Habit_description,
      Categories,
    });

    res
      .status(201)
      .json({ message: "Habit created successfully", Habit: newHabit });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllHabit = async (req, res) => {
  try {
    const Habits = await Habit.find({ isDeleted: false });

    res.status(200).json({ Habits });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const { id } = req.params; // احصل على المعرف من معلمات المسار
    const { NameHabit, Habit_description, Categories } = req.body;

    if (!id || !NameHabit || !Habit_description || !Categories) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // البحث وتحديث المهمة باستخدام معرف الرسالة
    const updatedHabit = await Habit.findByIdAndUpdate(
      id, // استخدم معرف الرسالة لتحديد العنصر الذي تريد تحديثه
      { NameHabit, Habit_description, Categories },
      { new: true } // إرجاع العنصر المحدث بدلاً من العنصر الأصلي
    );

    if (!updatedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res
      .status(200)
      .json({ message: "Habit updated successfully", Habit: updatedHabit });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.DeletedHabit = async (req, res) => {
  try {
    const { id } = req.params; // احصل على المعرف من معلمات المسار
    const { isDeleted } = req.body;

    if (!isDeleted) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // البحث وتحديث المهمة باستخدام معرف الرسالة
    const DeletedHabit = await Habit.findByIdAndUpdate(
      id, // استخدم معرف الرسالة لتحديد العنصر الذي تريد تحديثه
      { isDeleted },
      { new: true } // إرجاع العنصر المحدث بدلاً من العنصر الأصلي
    );

    if (!DeletedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res
      .status(200)
      .json({ message: "Habit Deleted successfully", Habit: DeletedHabit });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.DoneHabit = async (req, res) => {
  try {
    const { id } = req.params; // احصل على المعرف من معلمات المسار
    const { done } = req.body;

    if (!done) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // البحث وتحديث المهمة باستخدام معرف الرسالة
    const doneedHabit = await Habit.findByIdAndUpdate(
      id, // استخدم معرف الرسالة لتحديد العنصر الذي تريد تحديثه
      { done },
      { new: true } // إرجاع العنصر المحدث بدلاً من العنصر الأصلي
    );

    if (!doneedHabit) {
      return res.status(404).json({ message: "done not found" });
    }

    res
      .status(200)
      .json({ message: "Habit done successfully", Habit: doneedHabit });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
