const {createComment, AllComment, getCommentById, updateComment, deleteComment} = require('../controllers/comment');
const multer = require('../middleware/multer-config');
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")




router.post("/comment",auth,multer, createComment);
router.get("/api/comments",auth, AllComment);
router.get("/api/comment/:commentId",auth, getCommentById);
router.put("/api/comment/:commentId",auth,multer, updateComment);
router.delete("/api/comment/:commentId",auth, deleteComment);

module.exports = router 