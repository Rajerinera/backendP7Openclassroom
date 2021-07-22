const { create, loginEmail } = require("../service/login");
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const  jwt = require("jsonwebtoken");
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
                const token = jwt.sign({result: results}, process.env.TOKEN,{
                 expiresIn:  "24h"
                });
                return res.status(200).json({
                    result: results,
                    message: "login succes",
                    token: token,
                });
                
            }else{
                res.status(400).json("User not found")
            }
        });
    } 
}  
