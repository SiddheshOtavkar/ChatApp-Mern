const express = require("express");
const { addMessageController, getMessagesController } = require("../controllers/messageController");
const router = express.Router();

router.post("/addmsg", addMessageController);
router.get("/getmsg", getMessagesController);

module.exports = router;
