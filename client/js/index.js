$(function(){

    var socket = io();

    $('#sendBtn').click(function () {

        var message = $('#myMsg').val().trim();

        if (message.length > 0) {

            socket.emit('msg', message);
        }
    });

    socket.on('msg', function (incomingMsg, userName) {

        $('#chatsContainer').append(' ' + username + ': ' + incomingMsg + ' ');
        $('#chatsContainer').append('<br>');
    })
})