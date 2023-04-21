const express = require("express");
const router = express.Router();
// const { validateToken } = require("../../helpers/route.validator");
const { ChampionshipReign } = require("../../models/2kmanager/championship_reign");

// const wrestler = new Wrestler();
const reigns = new ChampionshipReign();

router.get("/all", async function (req, res, next) {

    try {
        const champReigns = await reigns.getChampionshipReigns();
        // const parsedWrestlersReigns = await reigns.mapReignsWithWrestlersAndChampionships(champReigns, wrestler);
        // console.log(parsedWrestlersReigns);
        res.status(200).json(champReigns);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting all wrestlers",
            message: err.message,
        });
    }
});

router.get("/single/:id", async function (req, res, next) {
    const id = req.params.id;

    try {
        const singleTitleReign = await reigns.findOneTitleReignByID(id);
        res.status(200).json(singleTitleReign);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting active wrestlers",
            message: err.message,
        });
    }
});

module.exports = router;
