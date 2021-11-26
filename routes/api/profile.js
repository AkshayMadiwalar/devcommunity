const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const config = require('config')
const request = require('request')
const {check,validationResult} = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')


//Get all profiles
router.get('/', async (req,res) =>{
    try {
        const profiles = await Profile.find().populate('user')
        return res.json(profiles)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})


//Get User Profile
router.get('/user/:user_id',async (req,res) => {
    try {
        const profile = await Profile.findOne({user:req.params.user_id})
        if(!profile){
            return res.status(400).json({msg:"Profile Not Found"})
        }
        res.json(profile)
    } catch (error) {
        console.log(error)
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg:"Profile Not Found"})
        }
        return res.status(500).send("Server Error")
    }
})

//Delete User
// Private Access
router.delete('/',auth,async (req,res)=>{
    try {
        await Profile.findOneAndDelete({user: req.user.id})
        await User.findOneAndDelete({_id:req.user.id})
        res.json({message:'User Deleted'})
    } catch (error) {
        console.log(error)
        return res.status(500).json('Server Error')
    }
})

// GET profile/me
router.get('/me',auth,async (req,res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate(
            'user',
            ['name','avatar']
        )

        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'})
        }

        res.json(profile)
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

//Get profile by id
// GET profile/me
router.get('/:id',async (req,res) => {
    console.log("HERE")
    try{
        console.log(req.params.id)
        const profile = await Profile.findOne({user: req.params.id}).populate(
            'user',
            ['name','avatar']
        )

        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'})
        }

        res.json(profile)
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})


//POST create profile
router.post('/addprofile',
    [
        auth,
        [
            check('status','Status is required').not().isEmpty(),
            check('skills','Skills are required').not().isEmpty()
        ]
    ],
    async (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const{
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body

        const profileFields = {};
        profileFields.user = req.user.id
        if(company) profileFields.company = company
        if(website) profileFields.website = website
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(status) profileFields.status = status
        if(githubusername) profileFields.githubusername = githubusername
        if(skills){
            profileFields.skills = skills.toString().split(',').map(skill => skill.trim())
        }

        profileFields.social = {}
        if(youtube) profileFields.social.youtube = youtube
        if(facebook) profileFields.social.facebook = facebook
        if(twitter) profileFields.social.twitter = twitter
        if(instagram) profileFields.social.instagram = instagram
        if(linkedin) profileFields.social.linkedin = linkedin
        
        console.log(profileFields)

        try{
            let profile = await Profile.findOne({user: req.user.id})
            if(profile){
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    { $set: profileFields},
                    { new: true}
                )
                return res.json(profile)
            }
            profile = new Profile(profileFields)
            await profile.save();
            res.json(profile)
        }catch(err){
            return res.status(500).send("Server error")
        }

    }
)

//Add Exprience
//Private Access
router.post('/experience',
    [
        auth,
        [
            check('title',"Title is Required").not().isEmpty(),
            check('company',"Company is Required").not().isEmpty(),
            check('from','From Date is Required').not().isEmpty()
        ]
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body

        const newExp = {}
        if(title) newExp.title = title
        if(company) newExp.company = company
        if(location) newExp.location = location
        if(from) newExp.from = from
        if(to) newExp.to = to
        if(current) newExp.current = current
        if(description) newExp.description = description

        try {
            const profile = await Profile.findOne({user:req.user.id})
            profile.experience.unshift(newExp)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.log(error)
            return res.status(500).send('Server Error')
        }
    }
)

// Delete Experience
// Private access
router.delete('/experience/:exp_id',
    auth,
    async (req,res) =>{
        try {
            const profile = await Profile.findOne({user:req.user.id})
            console.log(profile.experience)
            const removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.exp_id)
            profile.experience.splice(removeIndex,1)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.log(error)
            return res.status(500).send('Server Error')
        }

    }
)

//Add Education
//Private Access
router.post('/education',
[
    auth,
    [
        check('school',"School is Required").not().isEmpty(),
        check('degree',"Degree is Required").not().isEmpty(),
        check('fieldofstudy',"Field of Study is Required").not().isEmpty(),
        check('from','From Date is Required').not().isEmpty()
    ]
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body

    const newEdu = {}
    if(school) newEdu.school = school
    if(degree) newEdu.degree = degree
    if(fieldofstudy) newEdu.fieldofstudy = fieldofstudy
    if(from) newEdu.from = from
    if(to) newEdu.to = to
    if(current) newEdu.current = current
    if(description) newEdu.description = description

    try {
        const profile = await Profile.findOne({user:req.user.id})
        profile.education.unshift(newEdu)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Error')
    }
}
)


// Delete Education
// Private access
router.delete('/education/:edu_id',
    auth,
    async (req,res) =>{
        try {
            const profile = await Profile.findOne({user:req.user.id})
            console.log(profile.experience)
            const removeIndex = profile.education.map(edu => edu.id).indexOf(req.params.edu_id)
            profile.education.splice(removeIndex,1)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.log(error)
            return res.status(500).send('Server Error')
        }

    }
)


//Get user repos from github
router.get('/github/:username',(req,res)=>{
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('githubclientid')}&
            client_secret=${config.get('githubclientsecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        }
        request(options,(error,response,body)=>{
            if(error) console.log(error);

            console.log("Resp ",response)
            if(response.statusCode != 200){
                return res.status(400).json({msg:"No Github profile found"})
            }
            return res.json(JSON.parse(body))
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Error')
    }
})
module.exports = router