require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const app = express()
const port = 3000


//rateLimit
const limiter = rateLimit({
    //time 
    windowMs: 10 * 60 * 1000,
    //number of requests based on the time
    max: 10
})
// app.use(limiter)
app.set('trust proxy',1)

//staic folder
app.use(express.static('public'))

//Routes
const route = require('./routes/routes')
app.use('/api', route)

//home


//middlewares 
app.use(cors()) //enabling cors

app.listen(port,()=>console.log(`Server listening on port ${port}`)) 