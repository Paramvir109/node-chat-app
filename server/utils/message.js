const moment = require('moment' )
let generateMessage = (from, text) => {
    return {
        from,
        text,
        // createdAt : new Date().getTime()
        createdAt : moment().valueOf()
    }
}
let generateLocationMsg = (from,latitude, longitude) => {
    return {
        from,
        url : `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt : new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMsg
}