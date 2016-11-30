//modulos necessarios
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");

 //criando o htpp server que que deverá passar os requests para o express app
 //SocketIO escutar o htpp server
 var app = express();
 var httpServer = http.createServer(app);
 var io = socketIO.listen(httpServer);    

//array contando os sockets conectados
connections = [];

//definindo a porta
httpServer.listen(process.env.PORT || 8080);

//printa no prompt se o servidor estiver online
console.log('Online');

//acessando a pasta onde estarao os arquivos do "chat client"
app.use(express.static((__dirname, 'client')));


io.sockets.on('connection',function(socket){
	//Connect
	connections.push(socket);
	console.log('Connected: %s users connected: ', connections.length);

	//Disconnect
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s users connected', connections.length);
	});
});