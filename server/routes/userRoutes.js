const express = require("express");
const router = express.Router();
const {
    registerController,
    loginController,
    setAvatarController,
    getAllUsersController,
} = require("../controllers/userController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/setavatar/:id", setAvatarController);
router.get("/allusers/:id", getAllUsersController);

module.exports = router;
