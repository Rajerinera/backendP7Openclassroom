const { genSaltSync, hashSync } = require("bcrypt");
const { getUsers, getUsersById, updateUser, deleteUser } = require("../service/user");

module.exports = {
    getUsersById: (req, res) => {
        const id = params.id;
        getUsersById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Not found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    sucess: 0,
                    message: "update failed"
                })
            }
            return res.json({
                sucess: 1,
                message: "updated sucess"
            })
        })

    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data,(err, results) =>{
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    sucess: 0,
                    message: 'delete failed'
                });
            }
            return res.json({
                sucess: 1,
                message: 'user delete sucess'
            });
        })
    }
       
};