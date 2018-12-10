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
    var li = $('<li></li>')//jQuery to create elements
    li.text(`${message.from} ${formattedTime}: ${message.text}`)
    $('#messages').append(li);
})
socket.on('newLocationMessage' ,function(locationMessage) {
    let formattedTime = moment(locationMessage.createdAt).format('h:mm A');
    var li = $('<li></li>')
    var a = $('<a target="_blank">My Location</a>')//Target blank will open the link in a new tab
    a.attr("href",locationMessage.url)
    li.text(`${locationMessage.from} ${formattedTime}: `)
    li.append(a)
    $('#messages').append(li);
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