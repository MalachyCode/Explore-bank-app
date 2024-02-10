const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')

const app = express()

//Added middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})  

app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`)
})