require('dotenv').config()
const { response } = require('express');
const express = require('express')
const router = express.Router()
const db = require("../db");
const service = require("./authentication.service.js")
const jwt = require('jsonwebtoken');
const middleware = require('../middleware');

// router.get('/:id', async (req,res) => {
//     const response = await service.getUserArticles(req.params.id);
//     res.json(response);
// })

router.post('/new', async (req,res) => {
    const response = await service.createUser(req.body);
    res.json(response);
})

router.post('/login', async (req,res) => {
    const response = await service.login(req.body);
    if(response !== "invalid credentials") {
        user = { username: req.body.username};
        const token = jwt.sign({user: user, role:response.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "3h"});
        service.saveToken(token);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3 * 60 * 60 * 1000 // 3h
        })
        res.json(response);
    } else {
        res.json(response);
    }
})
router.post('/logout',  (req, res) => {
    res.clearCookie('jwt');
    res.send({
        message: 'success'
    })
})



module.exports = router;