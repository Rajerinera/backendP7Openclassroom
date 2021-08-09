const pool = require('../connectiondb/db');

module.exports = {
    createComment:(newComment, result) => {
        pool.query(
            "INSERT into `comment`(`title`, `content`) VALUES(?,?)",[
                newComment.title,
                newComment.content
            ],
            (error, results, fields) => {
                if(error){
                    result(error);
                }
                return result(null, results)
            }
        );
    },

    getAllComment: result =>{
        pool.query(
            "SELECT * FROM comment",
            [],
            (error, results, fields) => {
                if(error){
                    return result(error)
                }
                return result(null, results)
            }
        )
    },

    getCommentById: (id, result) => {
        "SELECT * FROM comment WHERE idcomment = ?",[
            id
        ],
        (error, results) => {
            if(error){
                console.log(error, "error");
                result(error, null);
                return
            }
            if(results.lenght){
                console.log("found user", results);
                result(null, results);
                return
            }
            result(results[0], null);

        }
    },
    updateComment: ( comment, callBack) =>{  
        pool.query(
        `UPDATE user SET title = ?, content = ? WHERE idcomment = ?`,[comment.title,comment.email,comment.id],
            (error, results, fields) => { 
                if(error){
                    console.log(error)
                    callBack(error); ;   
                }  
                    console.log(comment.name) 
                    console.log(comment.email)
                    console.log(comment.id)
                    console.log(results) 
                    return callBack(null, results[0]); 

            }
        );
    },
    deleteComment: (comment, callBack) =>{
        pool.query(
            'DELETE FROM comment WHERE idcomment = ?', [comment],
            (error, results, fields) =>{
                if(error){
                   return callBack(error);
                }
                return callBack(null, results[0]);
            } 
        );
    },

}