const jwt = require('jsonwebtoken');
const SECRET_KEY = 'THISISSECRET';

// const generateToken = (userId) => {
//     const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
//     return token;
// };

// module.exports = generateToken;
//get user or validate token

function getUser(token){
    if(!token) return null;
    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        // console.log('Decoded Token:', JSON.stringify(decoded)); // Log the decoded token as a string
        return decoded;
    }catch(error){
        return null;
    }
}

// const generateToken = (user) =>{
//     return jwt.sign({
//         id: user.id,
//         email: user.email,
//         role: user.role
//     },SECRET_KEY);
// }

function generateToken(user){
    const payload ={
        id: user.id,
        email: user.email,
        role: user.role
    };
    const token = jwt.sign(payload,SECRET_KEY);
    return token;
}


// Require For cookie Based Authentication Only
// const setUser = (token) =>{
//     try{
//         if(!token){ 
//             return null;
//         }
//         return jwt.verify(token,SECRET_KEY);
//     }
//    catch(error){
//     console.log(error);
//    }
// }

module.exports = {
    generateToken,
    getUser
    // setUser
};
