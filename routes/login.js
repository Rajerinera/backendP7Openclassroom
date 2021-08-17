const {signup, login}  = require("../controllers/login");
const express = require("express");
const router = express.Router(); 

const verifyPassword = require("../middleware/pass");
const verifyEmail = require("../middleware/email");


// module npm blocant les attaque de force bloque l utilisateur si il rentre trop de requetes
const rateLimit = require("express-rate-limit");
//limite la connexion abusive
const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: "trop de requete abusive , vous devez attendre 3 minutes",
});

router.post("/signup", verifyPassword, verifyEmail,signup); //la route pour s'inscrire
router.post("/login",limiter, login) //la route pour s'authentifier

module.exports = router; 