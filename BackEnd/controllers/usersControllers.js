// controllers/userController.js
const User = require("../models/usersModels");

exports.createUser = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // استخدام Model.create() لإدراج المستخدم الجديد
    const newUser = await User.create({
      Name,
      Email,
      Password,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
