const { User } = require("../../models/2kmanager/users.model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const user = new User();

router.post("/login", async function (req, res, next) {
    const body = req.body;

    if (!body.email || !body.password) {
        return res.status(400).json({ message: "Missing email or password" });
    }

    try {
        const foundUser = await user.findByEmail(body.email);

        if (!foundUser)
            return res.status(404).json({ message: "User not found" });

        const isCorrectPassword = bcrypt.compareSync(
            body.password,
            foundUser.password
        );

        if (!isCorrectPassword)
            return res.status(401).json({ message: "Password is incorrect" });

        return res.status(200).json({
            id: foundUser.id,
            message: "Login successful",
            token: foundUser.api_token,
            name: foundUser.username,
            email: foundUser.email,
            type: foundUser.type,
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            type: "Error while trying to login",
            message: err.message,
        });
    }
});

module.exports = router;
