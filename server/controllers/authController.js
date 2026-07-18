const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 👇 ADD THIS HERE
  const token = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

const loginUser = (req, res) => {
  res.json({
    message: "Login Controller Working",
  });
};

module.exports = {
  registerUser,
  loginUser,
};