const express = require('express');
const router = express.Router();
const wrestlerService = require('../services/wrestler.service');
const { validateToken } = require('./route.validator');

// GET - ALL wrestlers list
router.get('/all', async function (req, res, next) {
  const headers = req.headers;
  console.log(headers);

  try {
    const wrestlers = await wrestlerService.findAll();
    res.status(200).json(wrestlers);
  } catch (err) {
    console.error(`Error while getting wrestlers: `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

/* POST wrestler */
router.post('/upsert', async function (req, res, next) {
  const headers = req.headers;

  if (!validateToken(headers)) return res.status(403).json({'message': 'Unauthorized'});

  try {
    const wrestler = await wrestlerService.upsert(req.body);
    return res.status(200).json(wrestler);
  } catch (err) {
    console.error(`Error while upserting wrestler: `, err.message);
    return res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = router;
