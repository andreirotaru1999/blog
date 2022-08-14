const db = require("../db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


async function createUser(user) {
    try {
        user.password = await bcrypt.hash(user.password, 10);
        console.log(user);
        db.query('INSERT INTO "user"(username, password, email) VALUES($1, $2, $3)', [
            user.username,
            user.password,
            user.email
        ]);
        return "succes";
    } catch (error) {
        console.log(error);
        return(error);
    }
}

async function login(body) {
    try {
        let user = await db.query('SELECT * FROM "user" WHERE username = $1', [
            body.username,
        ]);
        if(user.rows != []){
            user = user.rows[0];
            console.log(user);
            if( await bcrypt.compare(body.password, user.password)) {
                return user;
            }
            else {
                return ("invalid credentials");
            }
        } else{
            return ("invalid credentials");
        }
       
    } catch (error) {
        console.log(error);
        return(error);
    }
}

async function findUserByUsername(username) {
    try {
        let user = await db.query('SELECT * From "user" WHERE username = $1',[
            username,
        ]);
        console.log(user.rows);
        return user.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function findUserById(id) {
    try {
        let user = await db.query('SELECT * From "user" WHERE id = $1',[
            id,
        ]);
        console.log(user.rows);
        return user.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function saveToken(token) {
    try {
        db.query('INSERT INTO token (data) VALUES($1)', [
            token
        ]);
        return "succes";
    } catch (error) {
        console.log(error);
        return(error);
    }
}

async function findToken(data) {
    try {
        let token = await db.query('SELECT * From token WHERE data = $1',[
            data,
        ]);
        return token.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}



module.exports = {
    createUser,
    login,
    findUserByUsername,
    findUserById,
    findToken,
    saveToken
};