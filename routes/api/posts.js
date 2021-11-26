const express = require('express')
const router = express.Router()
const {check,validationResult} = require('express-validator')
const auth = require("../../middleware/auth")


const User = require('../../models/User')
const Post = require('../../models/Posts')

//Add POST
router.post('/',
    [
        auth,
        [
            check('text','Text is required').not().isEmpty(),

        ]
    ],
    async (req,res) => {
        const erros = validationResult(req)
        if(!erros.isEmpty()){
            res.satus(400).json({errors:errors.array()})
        }

        try {
            const user = await User.findById(req.user.id).select('-password')

            const newPost = new Post({
                text : req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })
            const post = await newPost.save()
            return res.json(post)

        } catch (error) {
            console.log(error)
            res.status(500).send('Server Error')
        }


})

// Get all POSTS
// Private access
router.get('/',auth,async (req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1})
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

// Get POST by postid
// Private access
router.get('/:id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            res.status(400).json({msg:"No Post found"})
        }
        res.json(post)
    } catch (error) {
        console.log(error)
        if(error.kind === 'ObjectId'){
            return res.status(400).json({msg:"No Post found"})
        }
        res.status(500).send('Server Error')
    }
})


// Delete post by postid
// Private access
router.delete('/:id',auth,async (req,res)=>{
    try {
        const posts = await Post.findById(req.params.id)
        if(posts.user.toString() != req.user.id){
            return res.status(401).json({msg:"Not authorized!"})
        }
        await posts.remove()
        res.json({msg:"Post Deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

// PUT like a post
// Private access
router.put('/like/:id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)  
        
        //check if post has been already liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg:"Post has already been liked"})
        }
        post.likes.unshift({user:req.user.id})
        await post.save(post.likes);
        return res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})


// PUT Unlike a post
// Private access
router.put('/unlike/:id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)  
        
        //check if post has been already liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg:"Post cannot be unliked, it has not been liked!"})
        }
        const removeAtIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeAtIndex,1)
       
        await post.save(post.likes);
        return res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})


// POST Add a comment to post
// Private access
router.post('/comment/:id',
    [
        auth,
        [
            check('text','Comment is Required').not().isEmpty()
        ]
    ],
    async (req,res)=>{
        try {
            const post = await Post.findById(req.params.id)  
            const user = await User.findById(req.user.id).select('-password')

            const newComment = {
                text:req.body.text,
                name:user.name,
                avatar: user.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment)
            await post.save()
            return res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server Error')
        }
})


// Delete  comment of post
// Private access
router.delete('/comment/:id/:comment_id',auth,
    async (req,res)=>{
        try {
            const post = await Post.findById(req.params.id)
            const comments = post.comments
            const removeIndex = comments.map(comment => comment.id).indexOf(req.params.comment_id)

            const commentToDelete = comments[removeIndex]
   
            if(commentToDelete.user.toString() === req.user.id){
                post.comments.splice(removeIndex,1)
                await post.save()
                return res.json(post)
            }
            return res.status(401).json({msg:"Unable to Delete!"})
        } catch (error) {
            console.log(error)
            res.status(500).send('Server Error')
        }
})

module.exports = router