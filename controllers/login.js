const { create, loginEmail } = require("../service/login");
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const  jwt = require("jsonwebtoken");
const maskData = require("maskdata");
const pool = require('../connectiondb/db');

const emailMaskOptions = {
    maskWith: "*",
    unmaskedStartCharactersBeforeAt: 2,
    unmaskedEndCharactersAfterAt: 1,
    maskAtTheRate: false,
  };

module.exports = {
    signup:(req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        body.email = maskData.maskEmail2(req.body.email, emailMaskOptions);
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
        const email = maskData.maskEmail2(req.body.email, emailMaskOptions);
        const password = req.body.password;
        if(!email || !password){
            res.status(400).json(`miss ${!email ? "email" : "mdp"}!`);
        }
        loginEmail(email, (err, results) =>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    sucess: 0,
                    data: "invalid passord or email"
                });
            }
            const result = compareSync(password, results.password);
            if(result){
                const token = jwt.sign({result: results}, process.env.TOKENTEST,{
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
