//cette page contient les données sql qui vont être exporté,

const pool = require("../connectiondb/db");

//Query pour ajouter des données dans la base de données SQL
module.exports = {
    create: (data, callBack) => {
        pool.query(
            "INSERT INTO `user`(`name`,`email`, `password`) VALUES(?,?,?)",
            [data.name,
            data.email,
            data.password,
            ],
            (error, results, fields) =>{
                if(error){
                    callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    loginEmail:(email, callBack) =>{
        pool.query(
            `SELECT * from user where email =?`,
            [email],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
}

//Query pour s'identifer via l'email
