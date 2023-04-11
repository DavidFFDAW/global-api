const express = require('express');
const router = express.Router();
const { validateToken } = require('../helpers/route.validator');
const { Blog } = require('../models/blog.model');


const blog = new Blog();

router.get('/all', async function (req, res, next) {

  try {
    const posts = await blog.findAll();
    res.status(200).json(posts);
  } catch (err) {
    console.error(`Error while getting posts: `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});


router.post('/upsert', async function (req, res, next) {
  const headers = req.headers;

  if (!validateToken(headers)) return res.status(403).json({'message': 'Unauthorized'});

  try {
    const post = await blog.upsert(req.body);
    return res.status(200).json(post);
  } catch (err) {
    console.error(`Error while upserting post: `, err.message);
    return res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = router;
