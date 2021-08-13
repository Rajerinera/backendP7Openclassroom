const { createComment, AllComment, getCommentById, updateComment, deleteComment } = require("../service/comment");
const { deleteUser } = require("../service/user");

module.exports = {
    createComment: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: "need content"
            })
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
        if (!req.body) {
            res.status(400).send({
                messaage: "problème comment"
            });
        }
        updateComment(req.body, (err, results) => {
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
        deleteUser(req.params.commentId, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    sucess: 0,
                    message: 'delete failed',
                });
            }
            return res.json({
                sucess: 1,
                message: 'comment delete'
            })
        });
    }

}