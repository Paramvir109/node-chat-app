var socket = io()//This variable is critical. io() return socket(The connection is initiated and maintained)
let locationButton = $('#send-location')
let messageTextbox = $('[name=message]')

socket.on('connect', function() {//Using normal function on client side for compatibility on various devices
    console.log("Connected to server")//Client side(chrome's developers console)
    
})
socket.on('disconnect', function() {
    console.log("Disonnected from server")//When server is down or sth
})
socket.on('newMessage', function(message) {//Server to client, recieveing at client side
    let formattedTime = moment(message.createdAt).format('h:mm A');
    console.log('New message notification', message);
    let template = $('#message-template').html()
    let html = Mustache.render(template , {
        from : message.from,
        text: message.text,
        createdAt : formattedTime
    })
    $('#messages').append(html)
})
socket.on('newLocationMessage' ,function(locationMessage) {
    let formattedTime = moment(locationMessage.createdAt).format('h:mm A');
    let template = $('#location-message-template').html()
    let html = Mustache.render(template , {
        from : locationMessage.from,
        url: locationMessage.url,
        createdAt : formattedTime
    })
    $('#messages').append(html)
})

$('#message-form').on('submit', function(e) {
    e.preventDefault()//Prevents from submitting the form 
    socket.emit('createMessage', {
        from : 'User',
        text : messageTextbox.val()
    }, function() {
        messageTextbox.val('')
    })

})
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')

    }
    locationButton.attr("disabled", true).html('Sending...');
    navigator.geolocation.getCurrentPosition(function(position) {
        //position is the object we get when we call getCurrentPosition fn
        locationButton.attr("disabled", false).html('Send Location')//If req goes well
        socket.emit('createLocationMessage', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        })
    },function() {
        locationButton.attr("disabled", false).html('Send Location')//If req doesnt go well
        alert('Unable to fetch location')
    }) 
})