const jwt  = require('jsonwebtoken')
const User = require('../models/user')
exports.isAuth = async (req,res,next) =>{

    if(req.headers && req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1]

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decode.userId)
        if(!user){
            return res.json({success: flase, message:'unauthorized access! '})
        }

        req.user = user;
        next();
        }catch(error){
        if(error.name=== 'jsonWebTokenError'){
            return res.json({success:false, message:'unauthorizes access! '});
        }
        if(error.name=== 'TokenExpiredError'){
            return res.json({success:false, message:'sesson expired try sign in! '});
        }
        return res.json({success:false, message:'Inernal server error '});
        }
        

    }else{
        res.json({success:false, message:'unauthorized access!'});
    }
}