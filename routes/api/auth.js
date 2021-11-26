const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const config = require('config')
const becrypt = require('bcryptjs')
const {check,validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

router.get('/',auth, async (req,res) => {
    try{
        let user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        res.status(500).send("Server Error")
    }
})

router.post('/login',
    [
        check('email','PLease enter a valid Email').isEmail(),
        check('password','Please enter a password').exists()
    ],
    async (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()})
        }
        
        const {email,password} = req.body

        try{
            let user = await User.findOne({email})
            console.log(user)
            if(!user){
                return res.status(400).json({errors:[{message:"Invalid Credentials"}]})
            }
            console.log("User: ",user)

            const isMatch = await becrypt.compare(password,user.password)
            console.log("PWD ",isMatch)
            if(!isMatch){
                return res.status(400).json({errors:[{message:"Invalid Credentials"}]})
            }
            

            //Return Json Web Token
            const payload = {
                user: {
                    id:user.id
                }
            }
            jwt.sign(payload,
                config.get('jwtSecret'),
                {expiresIn:36000},
                (err,token) => {
                    if(err) throw err
                    res.json({token})
                }
            )

        }catch(err){
            console.log(err)
            res.status(500).json('Server Error')
        }
})

module.exports = router