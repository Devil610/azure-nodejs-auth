const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')

const router = express.Router()

//User Model
const User = require('../model/user')
//Connecting to mongodb
mongoose.connect('mongodb://localhost:27017/auth');

router.use(bodyParser.json())


router.post('/Register', async (req, res)=>{

    const {name, email, password: plainTextPassword} = req.body
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!name || typeof name !== 'string'){
        res.json({status: 'error', type: 'reg', field: 'name', error: 'Invalid Name'})
    }
    if(!email || !email.match(validRegex)){
        res.json({status: 'error', type: 'reg', field: 'email', error: 'Invalid Email'})
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        res.json({status: 'error', type: 'reg', field: 'password', error: 'Invalid Password'})
    }
    if(plainTextPassword.length < 8 ){
        res.json({status: 'error', type: 'reg', field: 'password', error: 'Password length must be >=8.'})
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
                if(err.code === 11000){
                    res.json({status: 'error', type: 'reg', field: 'email', error: 'A User with this email already exist.'})
                }
            }
            else{
                res.json({status: 'ok'})
            }
        }
    )

})

module.exports = router