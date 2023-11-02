const express = require("express");
const router = express.Router();
const {
  likeCoin,
  dislikeCoin,
  checkLikeStatus,
  getListOfLikedCoins,
} = require("../controllers/likeController");

router.post("/like", likeCoin);
router.delete("/dislike", dislikeCoin);
router.get("/check", checkLikeStatus);
router.get("/list/:email", getListOfLikedCoins);

module.exports = router;
