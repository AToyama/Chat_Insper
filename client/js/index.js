$(function(){

    var socket = io();

    $('#send').click(function () {

        var msg = $('#myMsg').val().trim();

        if (msg.length > 0) {

            console.log(msg);
            socket.emit('msg', msg);
        }
    });

    socket.on('msg', function (incomingMsg, user) {

        $('#chatsContainer').append(user + ": " + incomingMsg);
        $('#chatsContainer').append('<br>');
    });
});