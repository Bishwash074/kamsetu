const User = require("../models/User");

// GET PROFILE
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  const { skills, bio } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.skills = skills || user.skills;
    user.bio = bio || user.bio;

    const updatedUser = await user.save();
    res.json(updatedUser);
  }
};