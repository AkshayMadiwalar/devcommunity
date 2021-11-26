const express = require('express')
const ConnectDB = require('./config/db')
const path = require('path')

const app = express()

//Init Middleware
app.use(express.json({extended: false}))

ConnectDB()


app.use('/users',require('./routes/api/users'))
app.use('/profile',require('./routes/api/profile'))
app.use('/auth',require('./routes/api/auth'))
app.use('/posts',require('./routes/api/posts'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})