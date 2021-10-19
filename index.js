const express = require('express')
const path = require('path')

//Routes
const routeAuth = require('./routes/auth')


const port = process.env.PORT || 3000

const app = express()


app.use('/', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res)=>res.redirect('/auth/'))
app.use('/auth/', routeAuth)



app.listen(port, ()=>{
    console.log("Serving is listening....")
})