const mysql = require('mysql');

//Pour se connecter au sein de la base de donnée SQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.SQLdb,
  connectionLimit: 50
});

//Verifier que l'on est bien connecté à la base de données
console.log('connecté sql' + pool);


// Pour travailler sur la table "user" de notre base de donnée
let sqlUser = 'SELECT * FROM user';
pool.query(sqlUser, (err, result, field) => {
  if (err) {
    return console.log(err);
  }
  return console.log(result);
})

let sqlComment = 'SELECT * FROM comment';
pool.query(sqlComment, (err, result, field) => {
  if (err) {
    return console.log(err);
  }
  return console.log(result)
})


module.exports = pool;