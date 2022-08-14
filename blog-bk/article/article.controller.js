const express = require('express')
const router = express.Router()
const service = require("./article.service.js")
const middleware = require('../middleware');
const jwt_decode = require('jwt-decode');


router.post('/new', middleware.authenticationGuard, middleware.roleGuard("admin"), async (req,res) => {
    let cookie = req.cookies['jwt'];
    cookie = jwt_decode(cookie);
    await service.createArticle(req.body,cookie.user.username);
    res.json(req.body);
})
router.get('', async (req,res) => {
    articles = await service.getArticles();
    res.json(articles);
})

router.get('/:id', async (req,res) => {
    articles = await service.findArticleById(req.params.id);
    res.json(articles);
})

router.put('/:id/edit', middleware.authenticationGuard, middleware.roleGuard("admin"), async (req,res) => {
    res.json(req.body)
    service.editArticle(req.body, req.params.id);
   
})

router.delete('/:id', async (req,res) => {
    response = service.deleteArticle(req.params.id);
    res.json(response);
})

module.exports = router;