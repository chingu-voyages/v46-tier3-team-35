const Like = require("../models/like");

const likeCoin = async (req, res) => {
  try {
    const { name, image, userEmail } = req.body;
    const existingLike = await Like.findOne({ userEmail, name });

    if (existingLike) {
      return res.status(400).json({ msg: "You have already liked this coin" });
    }

    const newLike = new Like({ name, image, userEmail });
    await newLike.save();

    res.json({ msg: "Coin liked successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const dislikeCoin = async (req, res) => {
  try {
    const { name, userEmail } = req.body;
    const existingLike = await Like.findOneAndDelete({ userEmail, name });

    if (!existingLike) {
      return res.status(400).json({ msg: "You have not liked this coin yet" });
    }

    res.json({ msg: "Coin disliked successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const checkLikeStatus = async (req, res) => {
  try {
    const { name, userEmail } = req.query; // or req.params, depending on how you set up your route
    const existingLike = await Like.findOne({ userEmail, name });

    if (!existingLike) {
      return res.json({ liked: false, msg: "Coin is not liked" });
    }

    res.json({ liked: true, msg: "Coin is liked" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getListOfLikedCoins = async (req, res) => {
  try {
    const { email } = req.params;
    const likedCoins = await Like.find({ userEmail: email });

    res.json(likedCoins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  likeCoin,
  dislikeCoin,
  checkLikeStatus,
  getListOfLikedCoins,
};
