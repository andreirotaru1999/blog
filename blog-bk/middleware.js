const db = require("./db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const service = require("./authentication/authentication.service.js");
const jwt_decode = require('jwt-decode');

async function authenticationGuard(req, res, next) {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        if (!claims) {
            throw   'not logged in';
        }
        const user = await service.findToken(cookie);
        if(user) {
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
}

function roleGuard(role) {
    return async function(req, res, next) {
        try {
            let cookie = req.cookies['jwt'];
            cookie = jwt_decode(cookie);
            if(cookie.role === role  && cookie.role === 'admin') {
                next();
            } else {
                return res.status(401).send({
                    message: 'wrong role'
                })
            }
        } catch (error) {

            console.log(error);
        }
    }
}

module.exports = {
    authenticationGuard,
    roleGuard
}