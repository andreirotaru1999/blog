const db = require("../db");
const authService = require("../authentication/authentication.service");

async function createComment(id, comment, user) {
    try {
        const user = await authService.findUserByUsername(username);
        if(comment.parentId){
            const parent = await findCommentById(comment.parentId)
            parent.numberOfChildren ++;
            updateComment(comment.parentId, parent);
        }
        const data = await db.query('INSERT INTO comment (content, created_on, parent_id, article_id, user_id) VALUES($1, $2, $3, $4, $5)',[
            comment.content,
            comment.createdOn,
            comment.parentId,
            id,
            user.id
        ])
    } catch (error) {
        console.log("eroare:", error);
    }
}

async function getCommentsByArticle(id) {
    try {
        const data = await db.query('SELECT * FROM comment WHERE article_id = $1 AND parent_id IS NULL', [
            id,
        ])
        return data.rows;
    } catch (error) {
        console.log("eroare:", error);
        return ("eroare: " , error);
    }
}

async function getCommentsByParent(id) {
    try {
        const data = await db.query('SELECT * FROM comment WHERE parent_id = $1', [
             id,
         ])
         console.log(data.rows);
         return data.rows;
     } catch (error) {
         console.log("eroare:", error);
     }
}

async function findCommentById(id) {
    const comment = await db.query('SELECT * From comment WHERE id = $1',[
        id,
    ]);
    console.log(id," ", comment.rows);
    return comment.rows[0];
}

async function updateComment(id, comment) {
    try {
        const  oldComment = await findCommentById(id);
        if (oldComment) {
            const data = await db.query('UPDATE comment set content = $1, created_on = $2, parent_id = $3 WHERE id = $4',[
                comment.content,
                comment.createdOn,
                comment.parentId,
                id,
            ])
            return "comment updated";
        } else {
            return "this comment doesn't exist";
        }
       
    } catch (error) {
       console.log(error);
    }
}

async function deleteComment(id) {
    const  comment = await findCommentById(id);
    if(comment) {
        db.query('DELETE FROM comment WHERE id = $1', [
            id,
        ]);
        return "comment deleted";
    } else {
        return "this comment doesn't exist";
    }
}

module.exports = {
    createComment,
    getCommentsByArticle,
    getCommentsByParent,
    findCommentById,
    updateComment,
    deleteComment,
}