$(function(){

    /*
     * Make a socket object, 
     * All our communication to the server, i.e. 
     * talking to or listening from server will happen via this object
     */
    var socket = io();

    /*
     * Whenever user clicks the send button
     * Send the Message to the server
     */
    $('#sendBtn').click(function () {

        //retrieve the msg from textbox, trim it off white spaces
        var msg = $('#myMsg').val().trim();

        /*
         * If the msg length is not zero, i.e. msg is not empty, send it to server.
         * We will trigger/emit a "msg" event to the server... This event name can be
         * Anything of our choice, here we will use "msg"
         */
        if (msg.length > 0) {

            /*
             * We will Append the username infront of the message
             *  for decoration purpose only....
             */
            var userName = $('#username').val();
            var completeMsg = userName + ': ' + msg;

            //use socket.emit to send something to the server
            socket.emit('msg', completeMsg);
        }
    });

    $('#myMsg').keyup(function (e) {
        if (e.which == 13) {

            if (msg.length > 0) {

                var userName = $('#username').val();
                var completeMsg = userName + ': ' + msg;

                socket.emit('msg', completeMsg);
            }
        }
    });

    /*
     * Whenever we receive any 'msg' event from server,
     * We append it to our chatsContainer field...
     * USe socket.on for listening from server
     */
    socket.on('msg', function (incomingMsg) {
        var decoratedHtml = '' + incomingMsg + '';

        $('#chatsContainer').append(decoratedHtml);
    })
})