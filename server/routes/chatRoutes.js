const express = require("express");
const router = express.Router();
const { parseChatIntent } = require("../controllers/chatController");

router.post("/parse", parseChatIntent);

module.exports = router;
