const express = require("express");
const router = express.Router();
const { Wrestler } = require("../../models/2kmanager/wrestler.model");
const { validateToken } = require("../../helpers/route.validator");

const wrestler = new Wrestler();

router.get("/all", async function (req, res, next) {
    const queryParameters = req.query;

    try {
        const wrestlers = await (queryParameters
            ? wrestler.findByFilter(queryParameters)
            : wrestler.findAll());
        res.status(200).json(wrestlers);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting all wrestlers",
            message: err.message,
        });
    }
});

router.get("/released", async function (req, res, next) {
    const queryParameters = req.query;
    queryParameters.status = "released";

    try {
        const wrestlers = await (queryParameters
            ? wrestler.findByFilter(queryParameters)
            : wrestler.findAll());
        res.status(200).json(wrestlers);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting released wrestlers",
            message: err.message,
        });
    }
});

router.get("/active", async function (req, res, next) {
    const queryParameters = req.query;
    queryParameters.status = "active";

    try {
        const wrestlers = await (queryParameters
            ? wrestler.findByFilter(queryParameters)
            : wrestler.findAll());
        res.status(200).json(wrestlers);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting active wrestlers",
            message: err.message,
        });
    }
});

router.post("/upsert", async function (req, res, next) {
    if (!validateToken(req.headers))
        return res.status(403).json({ message: "Unauthorized" });

    try {
        const wrestler = await wrestler.upsert(req.body);
        return res.status(200).json(wrestler);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            type: "Error while upserting wrestler",
            message: err.message,
        });
    }
});

module.exports = router;
