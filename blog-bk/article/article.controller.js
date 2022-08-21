const express = require('express')
const router = express.Router()
const service = require("./article.service.js")
const middleware = require('../middleware');
const jwt_decode = require('jwt-decode');
//const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage });

router.post('/new', middleware.authenticationGuard, middleware.roleGuard("admin"), upload.single('image'), async (req,res) => {
    console.log(req.cookies);
    let cookie = req.cookies['jwt'];
    cookie = jwt_decode(cookie);
    if(req.file) {
        const imagePath = req.file.filename;
        await service.createArticle(req.body,cookie.user.username, imagePath);
    } else {
        await service.createArticle(req.body,cookie.user.username);
    }
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

router.get('/image/:imageId', async (req, res) => {
    imagePath = '/uploads/' + req.params.imageId;
    res.sendFile(imagePath, { root: path.join(__dirname, '../') });
})

router.put('/:id/edit', middleware.authenticationGuard, middleware.roleGuard("admin"), upload.single('image'), async (req,res) => {
    if(req.file) {
        const imagePath = req.file.filename;
        await service.editArticle(req.body, req.params.id, imagePath);
    } else {
        await service.editArticle(req.body, req.params.id);
    }
    res.json(req.body)
})

router.delete('/:id', async (req,res) => {
    response = service.deleteArticle(req.params.id);
    res.json(response);
})

module.exports = router;