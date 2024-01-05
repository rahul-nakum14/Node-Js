const jwt = require('jsonwebtoken');
const { getUser } = require('../utills/jwt_token_generate')
// const {setUser} = require('../utills/jwt_token_generate');  require for cookie based authtication only

function checkForAuthentication(req,res,next){

  let authorizationHeaderValue = req.headers.authorization;

  if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")){
    return res.json({Error:"Not Authorized"});
  }
  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(token);

  
  if (!user) {
    return res.json({ Error: "Invalid Token" });
  }
  req.user = user;
  req.userId = user.id;

  return next();
}

function restrictTo(roles) {

  
  return function (req, res, next) {


    // console.log(`restrictTo called: ${req.user.role}`);

    if (!req.user) return res.status(401).json({ Error: "Not Authorized to access" });
    console.log(req.user.role);

    if (!roles.includes(req.user.role)) return res.status(403).json({ Error: "Unauthorized to access" });

    next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo
}

//This is works

// const verifyToken = (req, res, next) => {
//   try {
//     let token = req.headers.authorization;

//     if (token) {
//       token = token.split(" ")[1];
//       let user = jwt.verify(token, SECRET_KEY);
//       req.userId = user.id;
//     } else {
//       res.status(401).json({ message: 'Unauthorized User' });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ message: 'Unauthorized User' });
//   }
// };


// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }

//     console.log(token);

//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) {
//             console.log(err);
//             return res.status(403).json({ message: 'Unauthorized: Invalid token' });
//         }
//         req.userId = decoded.userId; 
//         next();
//     });
// };





//Cookie BAsed Authentication works for browser only but for mobile we need JWT token

// const verifyToken = async (req, res, next) =>{
//   const userId = req.cookies.uid;

//   if(!userId) return res.json({Error:"Cookies not found"})

//   const user = setUser(userId);

//   if(!user) return res.json({Error:"User not found"})

//   req.user = user;
//   next();

// }
// module.exports = verifyToken;
