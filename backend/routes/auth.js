const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Sign In //
// This will add Email, username and password thorough POST method
// POST: localhost:3000/api/v1/register

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, 8);
    const user = new User({ email, username, password: hashpassword });
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Sign In
// POST: localhost:3000/api/v1/signin

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "Please Sign Up First" });
    }

    const ispasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!ispasswordCorrect) {
      res.status(400).json({ message: "Incorrect Password" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(400).json({ message: "User Already Exists" });
  }
});

module.exports = router;
