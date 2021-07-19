const {signup, login}  = require("../controllers/login");
const express = require("express");
const router = express.Router(); 

router.post("/signup", signup); //la route pour s'inscrire
router.post("/login", login) //la route pour s'authentifier

module.exports = router;