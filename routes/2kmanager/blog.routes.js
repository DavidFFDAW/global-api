const express = require('express');
const router = express.Router();
const { validateToken } = require('../../helpers/route.validator');
const { Blog } = require('../../models/2kmanager/blog.model');

const blog = new Blog();

router.get('/all', async function (req, res, next) {
    try {
        const posts = await blog.findAll();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(err.statusCode || 500).json({
            type: 'Error while getting posts',
            message: err.message,
        });
    }
});

router.get('/single/:id', async function (req, res, next) {
    const id = req.params.id;

    try {
        const singlePost = await blog.findOneByFilter({ id });
        res.status(200).json(singlePost);
    } catch (err) {
        console.error(err.message);
        res.status(err.statusCode || 500).json({
            type: 'Error while getting single blog post',
            message: err.message,
        });
    }
});

router.post('/upsert', async function (req, res, next) {
    const headers = req.headers;

    if (!validateToken(headers)) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const post = await blog.upsert(req.body);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(err.statusCode || 500).json({ type: 'Error while upserting post', message: err.message });
    }
});

router.delete('/delete/:id', async function (req, res, next) {
    if (!validateToken(req.headers)) return res.status(403).json({ message: 'Unauthorized' });

    const deleteID = req.params.id;

    if (!deleteID) return res.status(401).json({ message: 'Not id provided for deletion' });

    try {
        const deletionResponse = await blog.delete(deleteID);
        return res.status(200).json(deletionResponse);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            type: 'Error while deleting wrestler',
            message: err.message,
        });
    }
});

router.delete('/bulk/delete', async function (req, res, next) {
    if (!validateToken(req.headers)) return res.status(403).json({ message: 'Unauthorized' });

    const idsArray = req.body.blogIds;

    if (!idsArray || idsArray.length <= 0) return res.status(401).json({ message: 'Not ids provided for deletion' });

    try {
        const deletionResponse = await blog.bulkDelete(idsArray);
        return res.status(200).json(deletionResponse);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            type: 'Error while deleting wrestler',
            message: err.message,
        });
    }
});

module.exports = router;
