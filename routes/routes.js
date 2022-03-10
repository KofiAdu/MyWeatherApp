require('dotenv').config()
const express = require('express')
const router = express.Router()
const needle = require('needle')
const url = require('url')
const apiCache = require('apiCache')

//init cache 
const cache = apiCache.middleware


//using async because needle returns a promise
router.get('/', cache('1 minute'),async (req, res) => {
    try {
        const params = new URLSearchParams({ 
            ['appid']:process.env.API_KEY,
            ...url.parse(req.url, true).query
        })
         
        const result = await needle('get', `${process.env.API_URL}?${params}`)
        const data = result.body 
        res.status(200).json(data)
    }catch (err) {
        res.status(500).json(err)
    } 
})



module.exports =  router



