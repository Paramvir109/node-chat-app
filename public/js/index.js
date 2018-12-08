var socket = io()//This variable is critical. io() return socket(The connection is initiated and maintained)

socket.on('connect', function() {//Using normal function on client side for compatibility on various devices
    console.log("Connected to server")//Client side(chrome's developers console)

    socket.emit('createMessage', {//We don't want to emit until we have connection that's why in this block
        from : "Dufrene",//(Client sending info to server)
        text : "Meet me ASAP"//WE CAN DIRECTLY EMIT THE EVENT IN DEV CONSOLE TOO
    })//When emmitting first time, (reload the page as well as client side js has to be refreshed)
})
socket.on('disconnect', function() {
    console.log("Disonnected from server")
})
socket.on('newMessage', function(message) {//Server to client, recieveing at client side(To anyone who is connected)
    console.log('New message notification', message);
})
