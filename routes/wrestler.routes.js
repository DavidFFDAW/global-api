const express = require('express');
const router = express.Router();
const { validateToken } = require('../helpers/route.validator');
const { Wrestler } = require('../models/wrestler.model');


const wrestler = new Wrestler();

// GET - ALL wrestlers list
router.get('/all', async function (req, res, next) {
  const queryParameters = req.query;

  try {
    const wrestlers = await (queryParameters
      ? wrestler.findByFilter(queryParameters)
      : wrestler.findAll()
    );
    res.status(200).json(wrestlers);
  } catch (err) {
    console.error(`Error while getting wrestlers: `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

router.get('/released', async function (req, res, next) {
  const queryParameters = req.query;
  queryParameters.status = 'released';

  try {
    const wrestlers = await (queryParameters
      ? wrestler.findByFilter(queryParameters)
      : wrestler.findAll()
    );
    res.status(200).json(wrestlers);
  } catch (err) {
    console.error(`Error while getting wrestlers: `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

router.get('/active', async function (req, res, next) {
  const queryParameters = req.query;
  queryParameters.status = 'active';

  try {
    const wrestlers = await (queryParameters
      ? wrestler.findByFilter(queryParameters)
      : wrestler.findAll()
    );
    res.status(200).json(wrestlers);
  } catch (err) {
    console.error(`Error while getting wrestlers: `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

/* POST wrestler */
router.post('/upsert', async function (req, res, next) {
  if (!validateToken(req.headers)) return res.status(403).json({'message': 'Unauthorized'});

  try {
    const wrestler = await wrestler.upsert(req.body);
    return res.status(200).json(wrestler);
  } catch (err) {
    console.error(`Error while upserting wrestler: `, err.message);
    return res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = router;
