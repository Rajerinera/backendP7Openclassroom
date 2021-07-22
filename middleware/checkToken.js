const {verify} = require('jsonwebtoken');

module.exports = {
    checkToken:(req, res, next) =>{
        const token = req.get('authorization');
        if(token){
            token = token.slice(7)
            verify(token, process.env.TOKEN, (err, decoded,) =>{
                        if(err){
                            res.send({
                                sucess: 0,
                                message: 'invalid token'
                            })
                        }else{
                            next();
                        }
            })
        }else{
            res.send({
                sucess: 0,
                message: "Denied"
            })
        }
    }
}