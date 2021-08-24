const pool = require("../connectiondb/db");
const mysql = require("mysql");


module.exports = {
    getUsers: callback => {
        pool.query(
            'SELECT * FROM user',
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        ); 

    },
    getUsersById: (iduser, result) => {
       pool.query("SELECT * FROM user WHERE iduser = ?", [iduser],
            (error, res,) => {
                if (error) {
                    console.log("error", error)
                    result(error, null);
                    return;
                    
                } 
                if(res.length){
                    console.log("found user", res);
                    result(null, res);
                    return;
                }
                result(res[0], null);
            }
           
        ); 
        console.log(iduser)
    },
    updateUser: ( data, callBack) =>{  
        pool.query(
        `UPDATE user SET first_name = ?, name = ?, job= ? WHERE iduser = ?`,
        [data.first_name,data.name,data.job,data.id],
            (error, results, fields) => { 
                if(error){
                    console.log(error)
                    callBack(error); ;   
                }  
                    console.log(results) 
                    return callBack(null, results[0]); 

            } 
        );
    },
    deleteUser: (data, callBack) =>{
        pool.query(
            'DELETE FROM user WHERE iduser = ?', [data],
            (error, results, fields) =>{
                if(error){
                    console.log(error);
                }
                console.log(data)
                    //callBack(null, results[0]);
            } 
        );
    },
}