const {createComment, AllComment, getCommentById, updateComment, deleteComment} = require('../controllers/comment');
const multer = require('../models/multer-config');
const express = require("express");
const router = express.Router();




router.post("/comment",multer, createComment);
router.get("/api/comments", AllComment);
router.get("/api/comment/:commentId", getCommentById);
router.patch("/api/comment/:commentId", updateComment);
router.delete("/api/comment/:commentId", deleteComment);

module.exports = router 