const express = require("express");
const router = express.Router();
const externalImagesAPI = "http://vps-f87b433e.vps.ovh.net/2k/api/v2/";
const fetch = require("node-fetch");

router.get("/all", async function (req, res, next) {
    try {
        const images = await fetch(externalImagesAPI + "images");
        const imagesJSON = await images.json();
        res.status(200).json(imagesJSON);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            type: "Error while getting all wrestlers",
            message: err.message,
        });
    }
});
