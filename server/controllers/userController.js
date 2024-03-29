const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
    // console.log(req.body);
    try {
        const { username, email, password } = req.body;
        const userName = await userModel.findOne({ username });
        if (userName) {
            return res.json({ message: "Username already used", success: false });
        }
        const emailCheck = await userModel.findOne({ email });
        if (emailCheck) {
            return res.json({ message: "Email already used", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            email,
            username,
            password: hashedPassword,
        });

        delete user.password;

        res.status(200).send({
            message: "user registered successfully!!",
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: "Error in Registeration",
            success: false,
            error,
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.json({
                message: "Invalid Username or Password",
                success: false,
            });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.json({
                message: "Invalid Username or Password",
                success: false,
            });
        }
        delete user.password;
        res.json({
            message: "User Login Successfully",
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error while Login",
            success: false,
            error,
        });
    }
};

const setAvatarController = async (req, res) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await userModel.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error while setting avatar",
            success: false,
            error,
        });
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({
            _id: { $ne: req.params.id }
        }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        res.json({
            message: "All users are",
            success: true,
            users,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error while getting all users",
            success: false,
            error,
        })
    }
};

const logOutController = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.json({
                message: "User id is required",
                success: false,
            });
        };
        
        res.json({
            message: "Logout Successful",
            success: true,
        });
    } catch (error) {
        res.json({
            message: "Error while logging out!",
            success: false,
            error
        })
    }
};

module.exports = {
    registerController,
    loginController,
    setAvatarController,
    getAllUsersController,
};
