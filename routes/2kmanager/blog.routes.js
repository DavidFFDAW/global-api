const express = require("express");
const router = express.Router();
const { validateToken } = require("../../helpers/route.validator");
const { Blog } = require("../../models/2kmanager/blog.model");

const blog = new Blog();

router.get("/all", async function (req, res, next) {
    try {
        const posts = await blog.findAll();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(err.statusCode || 500).json({
            type: "Error while getting posts",
            message: err.message,
        });
    }
});

router.post("/upsert", async function (req, res, next) {
    const headers = req.headers;

    if (!validateToken(headers))
        return res.status(401).json({ message: "Unauthorized" });

    try {
        const post = await blog.upsert(req.body);
        return res.status(200).json(post);
    } catch (err) {
        return res
            .status(err.statusCode || 500)
            .json({ type: "Error while upserting post", message: err.message });
    }
});

module.exports = router;
