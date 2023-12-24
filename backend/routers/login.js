// Import necessary modules and dependencie
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../Models/SigninSchema");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. Please sign up or try again." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Don't explicitly state whether the email or password is incorrect
      return res
        .status(401)
        .json({ error: "Invalid credentials. Please sign up or try again." });
    }

    // Return success message along with user information
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router for use in other parts of the application
module.exports = router;
