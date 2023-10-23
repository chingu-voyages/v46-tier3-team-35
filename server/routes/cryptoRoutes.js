const express = require("express");
const router = express.Router();
const { createCryptoData, getCryptoData, getCryptoDataById } = require("../controllers/cryptoController");

router.post("/create", createCryptoData);
router.get("/", getCryptoData );
router.get("/:id", getCryptoDataById);

module.exports = router;