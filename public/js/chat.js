var socket = io()//This variable is critical. io() return socket(The connection is initiated and maintained)
let locationButton = $('#send-location')
let messageTextbox = $('[name=message]')

function scrollToBottom() {//It would scroll only when last message is just visible to us
    let messages = $('#messages')
    let newMessage = $('#messages').children('li:last-child')

    let scrollTop = messages.prop('scrollTop')
    let scrollHeight = messages.prop('scrollHeight')//Total height of all the msgss
    let clientHeight = messages.prop('clientHeight')//Part visible to client
    let newMessageHeight = newMessage.innerHeight()
    let previousMessageHeight = newMessage.prev().innerHeight()
    let scrollHeightBeforeNewMsg = scrollHeight - newMessageHeight
    if(clientHeight + scrollTop >= scrollHeightBeforeNewMsg - previousMessageHeight) {
        messages.scrollTop(scrollHeight)//So that we scroll to bottom
    }
}

socket.on('connect', function() {//Using normal function on client side for compatibility on various devices
    console.log("Connected to server")//Client side(chrome's developers console)
    let params = $.deparam(window.location.search)
    socket.emit('join', params , function(err) {
        if(err) {
            alert(err)
            window.location.href = '/'//Back to the join page
        }
        else {
            console.log('Name and roomname are valid')
        }
    })
    
})
socket.on('updateUserList', function(users) {
    let ol = $('<ol></ol>')
    users.forEach(function(user) {
        ol.append(`<li>${user}</li>`)
    })
    $('#users').html(ol)
})
socket.on('disconnect', function() {
    console.log("Disonnected from server")//When server is down or sth
})
socket.on('newMessage', function(message) {//Server to client, recieveing at client side
    let formattedTime = moment(message.createdAt).format('h:mm A');
    // console.log('New message notification', message);
    let template = $('#message-template').html()
    let html = Mustache.render(template , {
        from : message.from,
        text: message.text,
        createdAt : formattedTime
    })
    $('#messages').append(html)
    scrollToBottom()
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
    scrollToBottom()
})

$('#message-form').on('submit', function(e) {
    e.preventDefault()//Prevents from submitting the form 
    socket.emit('createMessage', {
        // from : $.deparam(window.location.search).name,
        // room : $.deparam(window.location.search).room, (This was another method to send msgs to room only)
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
            lat : position.coords.latitude,
            lon : position.coords.longitude
        })
    },function() {
        locationButton.attr("disabled", false).html('Send Location')//If req doesnt go well
        alert('Unable to fetch location')
    }) 
})