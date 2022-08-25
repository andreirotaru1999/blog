const db = require("../db");
const authService = require("../authentication/authentication.service");
const fs = require('fs');
const { count } = require("console");
const e = require("express");

async function getArticles(pageNumber, search = undefined) {
    articlesPerPage = 5;
    if(search == undefined) {
        articles = await db.query('SELECT * From article ORDER BY created_on LIMIT $1 OFFSET $2', [
            articlesPerPage,
            pageNumber * articlesPerPage
        ]);
        return articles.rows;
    } else {
        articles = await db.query('SELECT * From article ORDER BY created_on LIMIT $1 OFFSET $2 WHERE title like %$3%', [
            articlesPerPage,
            pageNumber * articlesPerPage,
            search
        ]);
        return articles.rows;
    }
    
}

async function getNumberOfArticles() {
    number = await db.query('SELECT count(*) AS exact_count FROM public.article');
    return  number.rows[0].exact_count;
}

async function findArticleById(id) {
    articles = await db.query('SELECT * From article WHERE id = $1',[
        id,
    ]);
    console.log(articles.rows[0]);
    return articles.rows[0];
}

async function createArticle(article, username, imagePath) {
    const user = await authService.findUserByUsername(username);
    article.created_on = new Date();
    console.log("article:",article);
    db.query('INSERT INTO article(title, created_on, updated_on, description, image, user_id) VALUES($1, $2, $3, $4, $5, $6)', [
        article.title,
        article.created_on,
        article.updated_on,
        article.description,
        imagePath,
        user.id
    ]);
}

async function editArticle(article, id, imagePath) {
    article.updated_on = new Date();
    try {
        db.query('UPDATE article SET title = $1, created_on = $2, updated_on = $3, description = $4, image =$5 WHERE id = $6', [
            article.title,
            article.created_on,
            article.updated_on,
            article.description,
            imagePath,
            id
        ]);
    } catch (error) {
        console.log(error);
    }
}

async function getArticleById(id) {
    const article = await db.query('SELECT * From article WHERE id = $1',[
        id,
    ]);
    return article.rows[0];
}

async function deleteArticle(id) {
    const article = getArticleById(id);
    if(article) {
        db.query('DELETE FROM article WHERE id = $1',[
            id
        ]);
        return "article deleted";
    } else {
        return "this article doesn't exist";
    }
}


module.exports = {
    getArticles,
    findArticleById,
    createArticle,
    editArticle,
    deleteArticle,
    getNumberOfArticles
}