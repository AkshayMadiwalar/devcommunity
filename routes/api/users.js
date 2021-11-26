const express = require('express')
const router = express.Router()
const config = require('config')
const {check,validationResult} = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

router.post('/register',
    [
        check('name','Name is Required').not().isEmpty(),
        check('email','PLease enter a valid Email').isEmail(),
        check('password','Password must of minimum 6 characters').isLength({min:6})
    ],
    async (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()})
        }
        
        const {name,email,password} = req.body

        try{
            let user = await User.findOne({email})
            if(user){
                res.status(400).json({errors:[{msg:"User already existing"}]})
            }
            const avatar = gravatar.url(email,{
                s:'200',
                r: 'pg',
                d: 'mm'
            })
            user = new User({
                name,
                email,
                avatar,
                password
            })
            //Encript Password
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password,salt)
            await user.save()

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
            res.status(500).json('Server Error')
        }
})

module.exports = router