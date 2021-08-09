const express = require("express");
const router = express.Router();

const comment = require("../controllers/comment");

router.post("/comment", comment.createComment);
router.get("/comments", comment.getAllComment);
router.get("/comment/:id", comment.getCommentById);
router.patch("/comment/:id", comment.updateComment);
router.delete("/comment/:id", comment.deleteComment);

module.exports = router;
