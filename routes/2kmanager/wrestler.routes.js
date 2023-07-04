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

router.get("/with/championships/active", async function (req, res, next) {
    try {
        const wrestlers = await wrestler.findWithChampionships();
        res.status(200).json(wrestlers);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting active wrestlers with championships",
            message: err.message,
        });
    }
});

router.get("/single/:id", async function (req, res, next) {
    const queryParameters = req.query;
    queryParameters.id = req.params.id;

    try {
        const singleWrestlerByID = await wrestler.findOneByFilter(
            queryParameters
        );
        res.status(200).json(singleWrestlerByID);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting active wrestlers",
            message: err.message,
        });
    }
});

router.post("/upsert", async function (req, res, next) {
    const isValidToken = await validateToken(req.headers);
    if (!isValidToken) return res.status(403).json({ message: "Unauthorized" });

    try {
        const upserted = await wrestler.upsert(req.body);
        return res.status(200).json(upserted);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            type: "Error while upserting wrestler",
            message: err.message,
        });
    }
});

router.delete("/status/change/", async function (req, res, next) {
    if (!validateToken(req.headers))
        return res.status(403).json({ message: "Unauthorized" });

    try {
        const deletionResponse = await wrestler.changeStatus(req.body);
        return res.status(200).json(deletionResponse);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            type: "Error while deleting wrestler",
            message: err.message,
        });
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    if (!validateToken(req.headers))
        return res.status(403).json({ message: "Unauthorized" });

    const deleteID = req.params.id;

    try {
        const deletionResponse = await wrestler.delete(deleteID);
        return res.status(200).json(deletionResponse);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            type: "Error while deleting wrestler",
            message: err.message,
        });
    }
});

module.exports = router;
