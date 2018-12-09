var socket = io()//This variable is critical. io() return socket(The connection is initiated and maintained)

socket.on('connect', function() {//Using normal function on client side for compatibility on various devices
    console.log("Connected to server")//Client side(chrome's developers console)
    
})
socket.on('disconnect', function() {
    console.log("Disonnected from server")
})
socket.on('newMessage', function(message) {//Server to client, recieveing at client side
    console.log('New message notification', message);
    var li = $('<li></li>')//jQuery to create elements
    li.text(`${message.from} : ${message.text}`)
    $('#messages').append(li);
})

$('#message-form').on('submit', function(e) {
    e.preventDefault()//Prevents from submitting the form 
    socket.emit('createMessage', {
        from : 'User',
        text : $('[name=message]').val()
    }, function() {

    })
    $('[name=message]').val('')

})