const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  refresh,
  restoreSession,
  updateUser,
} = require("../controllers/userController");
const verifyJWT = require("../middlewares/verifyJWT");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/restoreSession", verifyJWT, restoreSession);
router.put("/update/:userId", verifyJWT, updateUser);

module.exports = router;
