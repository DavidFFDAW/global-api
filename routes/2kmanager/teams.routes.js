const express = require("express");
const router = express.Router();
const { Team } = require("../../models/2kmanager/team.model");

const team = new Team();

router.get("/", async function (_, res, next) {

    try {
        const list = await team.getTeams();
        res.status(200).json(list);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting teams",
            message: err.message,
        });
    }
});

router.get("/members", async function (_, res, next) {

    try {
        const teams = await team.getAllTeamsWithMembers();
        res.status(200).json(teams);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting all teams with members",
            message: err.message,
        });
    }
});


router.get("/team/:id", async function (req, res, next) {
    const queryParameters = req.query;
    queryParameters.id = req.params.id;

    try {
        const singleTeam = await team.getSingleTeam(
            queryParameters
        );
        res.status(200).json(singleTeam);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting single team by id: " + queryParameters.id,
            message: err.message,
        });
    }
});

router.get("/team/members/:id", async function (req, res, next) {
    const queryParameters = req.query;
    queryParameters.id = req.params.id;

    try {
        const singleTeamWithMembers = await team.getSingleTeamWithMembersById(
            queryParameters
        );
        res.status(200).json(singleTeamWithMembers);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting single team with members by id: " + queryParameters.id,
            message: err.message,
        });
    }
});

router.post("/create/team", async function (req, res, next) {
    const isValidToken = await validateToken(req.headers);
    if (!isValidToken) return res.status(403).json({ message: "Unauthorized" });

    try {
        const created = await team.createTeam(req.body);
        return res.status(200).json(created);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            type: "Error while creating team",
            message: err.message,
        });
    }
});

router.put("/update/team", async function (req, res, next) {
    const isValidToken = await validateToken(req.headers);
    if (!isValidToken) return res.status(403).json({ message: "Unauthorized" });

    try {
        const created = await team.createTeam(req.body);
        return res.status(200).json(created);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            type: "Error while updating team",
            message: err.message,
        });
    }
});

module.exports = router;
