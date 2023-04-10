const express = require('express');
const router = express.Router();
const wrestler = require('../services/wrestler.service');

// GET - ALL wrestlers list
router.get('/all', async function (req, res, next) {
  try {
    const wrestlers = await wrestler.findAll();
    res.status(200).json(wrestlers);
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

/* POST wrestler */
router.post('/upsert', async function(req, res, next) {
    res.status(400).json({'message': 'No se pueden crear ni modificar aun'});
});

module.exports = router;
