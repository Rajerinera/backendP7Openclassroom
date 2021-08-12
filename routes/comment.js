const {createComment, getComment, getCommentById, updateComment, deleteComment} = require('../controllers/comment');
const express = require("express");
const router = express.Router();



router.post("/comment", createComment);
router.get("/comment", getComment);
router.get(":id", getCommentById);
router.patch("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

module.exports = router 