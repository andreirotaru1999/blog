const express = require('express')
const router = express.Router()
const db = require("../db");
const service = require ("./comment.service.js")
const middleware = require('../middleware');
const jwt_decode = require('jwt-decode');


router.post('/:id/comments/new', middleware.authenticationGuard, async (req,res) => {
    let cookie = req.cookies['jwt'];
    cookie = jwt_decode(cookie);
    resp = await service.createComment(req.params.id, req.body, cookie.user.username)
    res.json(resp);
})

router.get('/:id/comments', async (req, res) => {
   res.json(await service.getCommentsByArticle(req.params.id));
})

router.get('/comments/:id', async (req,res) => {
    res.json(await service.findCommentById(req.params.id));
 })

router.get('/comments/:parentId/children', async (req,res) => {
   res.json(await service.getCommentsByParent(req.params.parentId));
})

router.put('/comments/:id', middleware.authenticationGuard, async (req,res) => {
    res.json(await service.updateComment(req.params.id, req.body));
})

router.delete('/comments/:commentId', middleware.authenticationGuard, async (req,res) => {
    res.json(await service.deleteComment(req.params.commentId));
})

module.exports = router;