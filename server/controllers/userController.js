const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Confirm data
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "password must be at least 6 characters" });
  }

  try {
    // Check if the email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(403).json({
        message: "user with that email already exists",
      });
    }

    // Check if the username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(403).json({
        message: "username already taken",
      });
    }

    // Create new user
    const user = await User.create({
      username: username,
      email: email,
      password: password,
      profilePicture:
        "https://res.cloudinary.com/yilin1234/image/upload/v1685746074/Generic-Profile-Image_vlk1kx.png",
      about: "Hello, I'm new here and excited to be part of this community!",
    });

    if (user) {
      res.status(201).json({ message: `New user ${username} created` });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign({ userId: user._id }, access_token_secret, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ userId: user._id }, refresh_token_secret, {
      expiresIn: "30d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: process.env.NODE_ENV === "production" ? true : false, //http for development, https for production
      sameSite: "None", //cross-site cookie
      maxAge: 30 * 24 * 60 * 60 * 1000, // cookie will expire after 30 days
    });

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refresh = async (req, res) => {
  console.log("refreshing");
  // Get the refresh token from the request cookies

  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(403).json({ message: "No refresh token provided" });
  }

  try {
    // Verify the refresh token
    const verified = jwt.verify(token, refresh_token_secret);

    const user = await User.findById(verified.userId);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Create a new access token and refresh token
    const accessToken = jwt.sign({ userId: user._id }, access_token_secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Refresh token expired" });
    }
    return res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully." });
};

const restoreSession = async (req, res) => {
  // Extract token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Assuming format "Bearer YOUR_TOKEN"

  if (!token) return res.status(400).json({ message: "Unauthorized" }); // Unauthorized

  try {
    // Verify the access token
    const verified = jwt.verify(token, access_token_secret);

    // Find the user by ID
    const user = await User.findById(verified.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      about: user.about,
    };

    res.status(200).json({
      message: "User restored successfully",
      userInfo: userResponse,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    }
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { username, profilePicture, about } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    // If a user with the same username exists and it's not the current user
    if (existingUser && String(existingUser._id) !== String(userId)) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    user.profilePicture = profilePicture;
    user.about = about;
    await user.save();

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  refresh,
  restoreSession,
  updateUser,
};
