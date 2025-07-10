const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");

router.post("/messages", upload.single("file"), createMessage);
router.get("/messages", getMessages);

module.exports = router;
