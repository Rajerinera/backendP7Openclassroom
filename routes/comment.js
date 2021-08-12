const {createComment, AllComment, getCommentById, updateComment, deleteComment} = require('../controllers/comment');
const express = require("express");
const router = express.Router();



router.post("/comment", createComment);
router.get("/api/comments", AllComment);
router.get("/api/comment/:commentId", getCommentById);
router.patch("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

module.exports = router 