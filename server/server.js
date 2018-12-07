const path = require('path')//Inbuilt node module

const express = require('express')

// console.log(__dirname + '/../public')//dirname brings path of root directory

var publicPath = path.join(__dirname,'..','/public')//betterway
const port = process.env.PORT || 3000
// console.log(publicPath)

var app = express()

app.use(express.static(publicPath))

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)//It automatically looks for index.html file
})