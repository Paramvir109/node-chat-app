const path = require('path')//Inbuilt node module
const http = require('http')//to configure app with socket.io

const express = require('express')
const socketIO = require('socket.io')

var publicPath = path.join(__dirname,'..','/public')//betterway
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)//We can simply use this
var io = socketIO(server)//We got a socket server back
app.use(express.static(publicPath))

io.on('connection' ,(socket) => {//socket argument is similar to socket var in script of index.html
    console.log("New user connected")//socket is continuously listening for connection
    socket.emit('newMessage' , {
        from: 'Admin',
        text : ' Welcome to the room',
        createdAt : new Date().getTime()
    })
    socket.broadcast.emit('newMessage' , {
        from: 'Admin',
        text : 'New user has joined the room',
        createdAt : new Date().getTime()
    })

    socket.on('disconnect', () => {//When a client disconnects
        console.log("Client disonnected from server")
    })
    /* Create messsage event from client would emit message to server which in turn would emit the same message
     to all the connected connections with created at time stamp 
     We emit createMessage in dev console*/
    socket.on('createMessage' , (message) => {
        console.log('New message was created', message)
        io.emit('newMessage' , {
            from : message.from,
            text : message.text,
            createdAt : new Date().getTime()
            //This property always sent by server so that user can't manipulate it ***(check in index.js)
        })
        // socket.broadcast.emit('newMessage' , {//Everyone will recieve the message except the current user
        //     //(The one sending the message)
        //     from : message.from,
        //     text : message.text,
        //     createdAt : new Date().getTime()
        // })
    })

})


server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)//It automatically looks for index.html file
})