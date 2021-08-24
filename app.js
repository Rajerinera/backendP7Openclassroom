const express = require("express"); //application qui permet le routing de notre backend
require('dotenv').config(); //afin de sécuriser les données sur notre éditeur de code
const cors = require('cors')
const cookieSession = require('cookie-session')
const helmet = require("helmet");
const nocache = require("nocache")
const path = require("path");
const loginRoutes = require ("./routes/login") //récuperer le path de login
const userRoutes = require("./routes/user") //récuperer le path de user
const commentRoutes = require("./routes/comment");

const app = express();
app.use(helmet());
app.use(nocache());
console.log("connecté à node js");

//permet de connecter avec l'interface à travers les autorisations
app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

  app.use(
    cookieSession({
      name: "session",
      secret: process.env.SECRET,
      cookie: { 
        secure: true,
        httpOnly: true, 
        domain: "http://localhost:3000/", 
      },
    })
  ); 

 app.use(express.json()); //faire apparaitre les données en json sur le localhost ou postman

 app.use("/images", express.static(path.join(__dirname, "images")));
 app.use(loginRoutes);
 app.use(userRoutes);
 app.use(commentRoutes);

 
  module.exports = app;