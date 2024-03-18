const express = require("express");
const router = express.Router();
const {
    registerController,
    loginController,
    setAvatarController,
} = require("../controllers/userController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/setavatar/:id", setAvatarController);
router.get("/allusers/:id", getAllUsers);

module.exports = router;
