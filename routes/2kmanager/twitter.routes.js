const express = require("express");
const router = express.Router();
const { Twitter } = require("../../models/2kmanager/twitter.model");

const tw = new Twitter();

router.get("/", async function (_, res, next) {
    try {
        const list = await tw.getAllTweetsWithReplies();
        res.status(200).json(list);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting tweets",
            message: err.message,
        });
    }
});

router.get("/tweet/:id", async function (req, res, next) {
    const id = req.params.id;

    try {
        const list = await tw.getSingleTweetWithReplies(id);
        res.status(200).json(list);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting tweets",
            message: err.message,
        });
    }
});

module.exports = router;
