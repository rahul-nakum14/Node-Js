const jwt = require('jsonwebtoken');
const JWT_KEY= ('secret.js');

function protectRouteUser(req,res,next){
    if(req.cookies.login){
        
        let isVerified=jwt.verify(req.cookies.login,JWT_KEY);
        if(isVerified){
            next();
        }else{
            return res.json({
                message: 'User is not verified',
              });
        }
       
    }
    else{
        return res.json({
            message: 'Uer is not logged in',
            // data: user,
          });
    }
}
module.exports=protectRouteUser;