import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
const router = express.Router();

// @desc    register/create user
// @path    POST "/api/user/register"
router.post("/register", async (req, res) => {
  try {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new User
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save and send response
    const savedUser = await newUser.save();
    res.status(201).json({ _id: savedUser._id, username: savedUser.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc    user login
// @path    POST "/api/user/login"
router.post("/login", async (req, res) => {
  try {
    // find user
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(400).json("Wrong email or password");
    }

    // validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("Wrong email or password");
    }

    // send response
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
