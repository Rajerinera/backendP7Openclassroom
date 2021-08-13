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
        `UPDATE user SET name = ?, email = ? WHERE iduser = ?`,[data.name,data.email,data.id],
            (error, results, fields) => { 
                if(error){
                    console.log(error)
                    callBack(error); ;   
                }  
                    console.log(data.name) 
                    console.log(data.email)
                    console.log(data.id)
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
                   return callBack(error);
                }
                callBack(null, results[0]);
            } 
        );
    },
}