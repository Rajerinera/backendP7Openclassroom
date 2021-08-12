const pool = require('../connectiondb/db');
const mysql = require("mysql");

module.exports = {
    createComment: (newComment, result) => {
        pool.query(
            "INSERT into `comment`(`title`, `content`, `idcom`) VALUES(?,?,?)", [
            newComment.title,
            newComment.content,
            newComment.idcom
        ],
            (error, results, fields) => {
                if (error) {
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
    updateComment: (comment, callBack) => {
        pool.query(
            `UPDATE user SET title = ?, content = ? WHERE idcomment = ?`, [comment.title, comment.email, comment.id],
            (error, results, fields) => {
                if (error) {
                    console.log(error)
                    callBack(error);;
                }
                console.log(comment.name)
                console.log(comment.email)
                console.log(comment.id)
                console.log(results)
                return callBack(null, results[0]);

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
                return callBack(null, results[0]);
            }
        );
    },

}