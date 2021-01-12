const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function(req,res,next){
    //Get token from header
    const token = req.header('x-auth-token');
    //VERIFY IF TOKEN EXISTS
    if(!token)
    {
        return res.status(401).json({'msg':'No token found'});
    }
    
    //VERIFY THE TOKEN
    try{
        jwt.verify(token,config.get('jwtSecret'),
        (error,decoded) => {
            if(error)
            {
                return res.status(401).json({'msg' : 'Token Invalid' })
            }
            else{
                req.user = decoded.user;
                next(); 
            }
        }
        )
    } catch(err){
        return res.status(500).json({'msg' : 'Server Error'});
    }
}