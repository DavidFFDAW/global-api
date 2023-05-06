const express = require("express");
const router = express.Router();
// const { validateToken } = require("../../helpers/route.validator");
const {
    ChampionshipReign,
} = require("../../models/2kmanager/championship_reign");
const { Wrestler } = require("../../models/2kmanager/wrestler.model");
const { Team } = require("../../models/2kmanager/team.model");
const { Championship } = require("../../models/2kmanager/championship.model");

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

router.get("/create/datas", async function (req, res, next) {
    const id = req.params.id;
    const wrestler = new Wrestler();
    const teams = new Team();
    const championship = new Championship();

    try {
        const neededDatas = {
            championship: await championship.findByFilter({ active: true }),
            wrestlers: await wrestler.findByFilter({ status: "active" }),
            teams: await teams.findAll(),
        };
        res.status(200).json(neededDatas);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting the datas for the creation of a new title reign",
            message: err.message,
        });
    }
});

module.exports = router;
