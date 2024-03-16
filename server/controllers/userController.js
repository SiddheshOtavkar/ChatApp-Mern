const userModel = require("../modal/userModel");
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
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Registeration",
            success: false,
            error
        });
    }
};

const loginController = async (req, res, next) => {

}

module.exports = {
    registerController,
    loginController,
}