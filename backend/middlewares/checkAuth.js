const jwt  = require("jsonwebtoken");

const checkAuth = (req,res,next) => {
    try{
        const token = req.headers.authorization;
        jwt.verify(token,process.env.Key_JWT,(err,user)=>{
            if(err) {return res.status(401);}
            req.user = user
            next();

        });
    }catch(error){
        res.status(401).json({
            message:'Auth failed'
        })
    }
}
module.exports = checkAuth;