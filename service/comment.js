const pool = require('../connectiondb/db');
const mysql = require("mysql");

module.exports = {
    createComment: (newComment, result) => {
        pool.query(
            "INSERT into `comment`(`title`, `content`, `image`, `author`, `idcom`) VALUES(?,?,?,?,?)", [
            newComment.title,
            newComment.content,
            newComment.image,
            newComment.author,
            newComment.idcom
        ],
            (error, results, fields) => {
                if (error) {
                    console.log(newComment.image)
                    result(error);
                }
                return result(null, results)
            }
        );
    },
 
    AllComment: callBack => { 
        pool.query(
            'SELECT * FROM comment',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                callBack(null, results)
            }

        );
    },

    getCommentById: (idcom1, result) => {
        pool.query("SELECT * FROM comment WHERE idcom = ?", 
            [idcom1],
            (error, resultat,) => {
                if (error) { 
                    console.log("error", error);
                    result(error, null);
                    return;
                }
                if (resultat.length) {
                    console.log("found comment", resultat);
                    result(null, resultat);
                    return;
                }
                result(resultat[0], null);

            }
        );
        console.log(idcom1)
    },
    updateComment: (comment, id, callBack) => {
        pool.query(
            `UPDATE comment SET title = ?, content = ?, image=? WHERE idcomment = ?`, 
            [comment.title,comment.content,comment.image, id],
            (error, results, fields) => {
                if (error) {
                    console.log(error)
                    
                    //callBack(error);
                }
                console.log(comment.title)
                console.log(comment.content)
                console.log(comment.image) 
                console.log(comment.id)
                //return callBack(null, results); 
                

            }
        );
    },
    deleteComment: (comment, callBack) => {
        pool.query(
            'DELETE FROM comment WHERE idcomment = ?', [comment],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                callBack(null, results[0]);
            }
        );
    },

}