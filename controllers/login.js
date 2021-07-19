const { create, loginEmail } = require("../service/login");
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const { sign } = require("jsonwebtoken");
const { createPool } = require("mysql");

module.exports = {
    signup:(req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message:'database error'
                });
            }
            return res.status(200).json({
                sucess: 1,
                data: results
            });
        })
    },
    login:(req, res) =>{
        const body = req.body;
        loginEmail(body.email, (err, results) =>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    sucess: 0,
                    data: "invalid passord or email"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results}, "TOKEN",{
                 expiresIn:  "24h"
                });
                return res.json({
                    success: 1,
                    message: "login succes",
                    token: jsontoken
                })
            }
            console.log(result)
        });
    }
} 