const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next) => {

    //Get Token from header set in access-token field
    const token = req.header('access-token')

    //Check Token
    if(!token){
        res.status(401).json({message:"Not Authorized, Access Denied!"})
    }

    //Verify Token
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'))
        req.user = decoded.user
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({message:"Invalid Token, Access Denied!"})
    }
}