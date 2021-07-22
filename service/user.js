const pool = require("../connectiondb/db");
module.exports = {
    getUsers: callback => {
        pool.query(
            'SELECT id, name, email, FROM user',
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },
    getUsersById: (id, callBack) => {
        pool.query(
            'SELECT id, name, email FROM user WHERE id = ?', [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );

    },
    updateUser: (data, callBack) =>{
        pool.query(
            'UPDATE user SET name = ?, email = ?, password = ? where id = ?'
            [
                data.name,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser: (data, callBack) =>{
        pool.query(
            'DELETE from user WHERE id = ?', [data.id],
            (error, results, fields) =>{
                if(error){
                   return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
}