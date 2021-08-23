const { createComment, AllComment, getCommentById, updateComment, deleteComment } = require("../service/comment");
const fs = require('fs');

module.exports = {
    createComment: (req, res) => {
        if (!req.body.image) {
            req.body.image = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
            : ""
        } else {
            req.body.image = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : ""
        }
        createComment(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    sucess: 0,
                    message: 'error' 
                });
            } 
            return res.status(200).json({ 
                sucess: 1,
                data: results,
                message: "réussis vraiment"
            })
        }) 
    },

    AllComment: (req, res) => {
        AllComment((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(results);
        });
    },

    getCommentById: (req, res) => {
        getCommentById(req.params.commentId, (err, rows) => { 
            if (err) {
                console.log(err)
                return
            }
            console.log("connect réussi ??" + rows)
            res.json(rows);
        })
    },
 
    updateComment: (req, res) => {
        if (!req.body.image) {
            req.body.image = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : ""
        } else {
            req.body.image = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : ""
        }
        
        updateComment(req.body,req.params.commentId, (err, results) => {
            if (err) {
                console.log(err);  
                return;
            }
            return res.json({
                sucess: 1, 
                message: "update comm sucess"  
            }) 
        })
    },

    deleteComment: (req, res) => {
        const test = req.params.commentId
        deleteComment(test, (err, results) => {
            if (err) { 
                console.log(err);
                return;
            }
            res.json({
                sucess: 1,
                message: 'comment delete'
            })
        });
    }

}