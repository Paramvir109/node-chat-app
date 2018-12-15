const path = require('path')//Inbuilt node module
const http = require('http')//to configure app with socket.io

const express = require('express')
const socketIO = require('socket.io')

var {generateMessage, generateLocationMsg} = require('./utils/message')//This fn returns an object
var{isValidString} = require('./utils/validate')
var {Users} = require('./utils/users')

var publicPath = path.join(__dirname,'..','/public')//betterway
const port = process.env.PORT || 3000
var users = new Users()

var app = express()
var server = http.createServer(app)//We can simply use this
var io = socketIO(server)//We got a socket server back
app.use(express.static(publicPath))

io.on('connection' ,(socket) => {//socket argument is similar to socket var in script of index.html
    console.log("New user connected")//socket is continuously listening for connection


    socket.on('disconnect', () => {//When a client disconnects
        console.log("Client disonnected from server")
        //Remove the user from collection as well
        let removedUser = users.removeUser(socket.id)
        if(removedUser) {
            let room = removedUser.room
            let name = removedUser.name
            io.to(room).emit('updateUserList' , users.getUserList(room))
            io.to(room).emit('newMessage', generateMessage('Admin', `${name} has left`))
        }
    })

    socket.on('join', (params,callback) => {
        if(isValidString(params.name) && isValidString(params.room)) {
            let room = params.room.toLowerCase()//Room is case insensitive
            if(!users.isUnique(params.name,room)) {
                return callback('Display name already taken in this room')
            }
            callback()
            socket.join(room)//It joins a specific room
            users.removeUser(socket.id)//We remove the user from any previous potential rooms
            users.addUser(socket.id , params.name, room)
            io.to(room).emit('updateUserList' , users.getUserList(room))

            socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to the room'))
            socket.broadcast.to(room).emit('newMessage' , 
                generateMessage('Admin' , `${params.name} has joined the room`))
        }
        else {
            callback('Name and roomname are required')
        }
    })
    /* Create messsage event from client would emit message to server which in turn would emit the same message
     to all the connected connections with created at time stamp 
     We emit createMessage in dev console*/
    socket.on('createMessage' , (message,callback) => {
        var user = users.getUser(socket.id)
        if(user && isValidString(message.text)) {
            io.to(user.room).emit('newMessage' , generateMessage(user.name, message.text))

        }
        callback()//messagee field becomes blank again//For acknowledgement
        // callback('Data from server')//( gets printed on client side. See charLearn.js)
        //createdAt property always sent by server so that user can't manipulate it ***(check in index.js)
        

    })
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id)
        if(user) {
            io.to(user.room).emit('newLocationMessage' , generateLocationMsg(user.name,coords.lat,coords.lon))

        }
    })

})


server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)//It automatically looks for index.html file
})