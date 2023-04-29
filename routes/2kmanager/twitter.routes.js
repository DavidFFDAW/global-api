const express = require("express");
const router = express.Router();
const { Twitter } = require("../../models/2kmanager/twitter.model");
const { validateToken } = require("../../helpers/route.validator");

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

router.post("/tweet/upsert", async function (req, res, next) {
    const isValidToken = await validateToken(req.headers);
    if (!isValidToken) return res.status(403).json({ message: "Unauthorized" });

    try {
        const upserted = await tw.upsert(req.body);
        res.status(200).json(upserted);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while upserting tweets",
            message: err.message,
        });
    }
});

router.delete("/tweet/delete/:id", async function (req, res, next) {
    const id = req.params.id;

    try {
        const list = await tw.delete(id);
        res.status(200).json(list);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while deleting tweet by id: " + id,
            message: err.message,
        });
    }
});

module.exports = router;
