const path = require('path')//Inbuilt node module
const http = require('http')//to configure app with socket.io

const express = require('express')
const socketIO = require('socket.io')

var publicPath = path.join(__dirname,'..','/public')//betterway
const port = process.env.PORT || 3000
// console.log(publicPath)

var app = express()
var server = http.createServer(app)//We can simply use this
var io = socketIO(server)//We got a socket server back
app.use(express.static(publicPath))

io.on('connection' ,(socket) => {//socket argument is similar to socket var in script of index.html
    //connection of a client is a very popular event
    console.log("New user connected")//socket is continuously listening for connection

    socket.on('disconnect', () => {//When a client disconnects
        console.log("Client disonnected from server")
    })

})


server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)//It automatically looks for index.html file
})