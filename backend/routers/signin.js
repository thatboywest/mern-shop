const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); // You may need to install this module
const User = require("../Models/SigninSchema");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { name, email, phone, id_num, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      id_num,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
