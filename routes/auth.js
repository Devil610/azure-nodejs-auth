const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')


const router = express.Router()
const User = require('../model/user')



mongoose.connect('mongodb://localhost:27017/auth');


router.use(bodyParser.json())


router.get('/', (req, res)=>{
    res.sendFile('index.html', {root: './public'})
})

router.post('/Register', async (req, res)=>{

    const {name, email, password: plainTextPassword} = req.body
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!name || typeof name !== 'string'){
        res.json({status: 'error', error: 'Invalid Name'})
    }
    if(!email || !email.match(validRegex)){
        res.json({status: 'error', error: 'Invalid Email'})
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        res.json({status: 'error', error: 'Invalid Password'})
    }
    if(plainTextPassword.length < 8 ){
        res.json({status: 'error', error: 'Password length must be >=8.'})
    }



    const password = await bcrypt.hash(plainTextPassword, 10)

    await User.create(
        {
            name,
            email,
            password
        },
        (err, data)=>{
            if(err){
                console.log("Error is    ", JSON.stringify(err))
                if(err.code === 11000){
                    res.json({status: 'error', error: 'A User with this email already exist.'})
                }
                else throw err
            }
            else{
                console.log(data)
                res.json({status: 'ok'})
            }
        }
    )

})

module.exports = router