const express = require("express"); //application qui permet le routing de notre backend
require('dotenv').config(); //afin de sécuriser les données sur notre éditeur de code
const loginRoutes = require ("./routes/login") //récuperer le path de login

const app = express();
console.log("connecté à node js");

//permet de connecter avec l'interface à travers les autorisations
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
 app.use(express.json()); //faire apparaitre les données en json sur le localhost ou postman

 app.use(loginRoutes);

//test
//const db = require("./connectiondb/db")
//app.get(db) //test réussi
//

  module.exports = app;