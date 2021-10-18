const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/login-app-db')
const app = express()


app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.post('/auth/register', async (req, res)=>{
    console.log(req.body);
    res.json({status: 'ok'})
})


app.listen(port, ()=>{
    console.log("Serving is listening....")
})