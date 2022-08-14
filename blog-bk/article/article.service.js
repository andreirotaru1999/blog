const db = require("../db");
const authService = require("../authentication/authentication.service");
const fs = require('fs');

async function getArticles() {
    articles = await db.query('SELECT * From article');
    //console.log(articles.rows);
    return articles.rows;
}

async function findArticleById(id) {
    articles = await db.query('SELECT * From article WHERE id = $1',[
        id,
    ]);
    console.log(articles.rows[0]);
    return articles.rows[0];
}

async function createArticle(article, username) {
    const user = await authService.findUserByUsername(username);
    console.log("article:",article);
    saveImage(article.image);
    db.query('INSERT INTO article(title, created_on, updated_on, description, image, user_id) VALUES($1, $2, $3, $4, $5, $6)', [
        article.title,
        article.created_on,
        article.updated_on,
        article.description,
        article.image,
        user.id
    ]);
}

async function editArticle(article, id) {
    try {
        db.query('UPDATE article SET title = $1, created_on = $2, updated_on = $3, description = $4, image =$5 WHERE id = $6', [
            article.title,
            article.created_on,
            article.updated_on,
            article.description,
            article.image,
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

function saveImage(baseImage) {
    /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
    //path of folder where you want to save the image.
    const localPath = `../images/`;
    //Find extension of file
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    const rand = Math.ceil(Math.random()*1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `Photo_${Date.now()}_${rand}.${ext}`;
    
    //Check that if directory is present or not.
    // if(!fs.existsSync(`${uploadPath}/uploads/`)) {
    //     fs.mkdirSync(`${uploadPath}/uploads/`);
    // }
    // if (!fs.existsSync(localPath)) {
    //     fs.mkdirSync(localPath);
    // }
    fs.writeFileSync(localPath+filename, base64Data, 'base64');
    return {filename, localPath};
}

module.exports = {
    getArticles,
    findArticleById,
    createArticle,
    editArticle,
    deleteArticle
}