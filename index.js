const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
//Routes
const routeAuth = require('./routes/auth')


const port = process.env.PORT || 3000

const app = express()

const JWT_SECRET = process.env.APPSETTING_JWT_SECRET || require('./JWT_SECRET')


app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/auth/', routeAuth)

app.post('/', (req, res) => {
    const { token } = req.body
    try {
        const user = jwt.verify(token, JWT_SECRET)
        res.json({status: 'ok'})
    }catch(err){
        res.json({status: 'error', error: 'Invalid Credintials. Please login again'})
    }

})


app.listen(port, () => {
    console.log("Serving is listening....")
})