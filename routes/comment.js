const {createComment, AllComment, getCommentById, updateComment, deleteComment} = require('../controllers/comment');
const multer = require('../middleware/multer-config');
const express = require("express");
const router = express.Router();




router.post("/comment",multer, createComment);
router.get("/api/comments", AllComment);
router.get("/api/comment/:commentId", getCommentById);
router.patch("/api/comment/:commentId",multer, updateComment);
router.delete("/api/comment/:commentId", deleteComment);

module.exports = router 