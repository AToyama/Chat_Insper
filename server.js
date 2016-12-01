//modulos necessarios
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");

 //criando o htpp server que que deverá passar os requests para o express app
 //SocketIO escutar o htpp server
 var app = require('express')();
 var httpServer = http.createServer(app);
 var io = socketIO.listen(httpServer);  

 var bodyParser = require('body-parser');  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//dicionario p/ guardar username e ID
var user = {};

//array contando os sockets conectados
//connections = [];

//definindo a porta
httpServer.listen(process.env.PORT || 3000);

//printa no prompt se o servidor estiver online
console.log('Online');

//acessando a pasta onde estarao os arquivos do "chat client"
app.use(express.static(__dirname + '/client'));


app.get('/', function(req,res){

	res.sendFile(__dirname + '/client/home.html');
});

//pega o username do input da homepage
app.post('/', function(req,res){
	username = req.body.username;
	console.log(username);
	//vai para localhost:8080/chat
	res.redirect('/chat')

});


io.on('connection', function (client) {

  // Para evitar o problema de overwrite do username
  client.send(client.id);
  id = client.id;
  console.log(id)

  //relaciona o id com o username
  user[client.id] = username;

});

//chat.html para localhost:8080/chat
app.get('/chat', function(req,res){
	res.sendFile(__dirname + '/client/chat.html');
});


io.on('connection', function(socket){
	
	/*
	//Connect
	connections.push(socket);
	console.log('Connected: %s users connected: ', connections.length);
	console.log(connections);

	
	//Disconnect
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s users connected', connections.length);
	});

	*/

	//emitindo a mensagem

    socket.on('msg', function (incomingMsg , user) {
    	userName = user[socket.id];
        io.emit('msg', incomingMsg, userName);
        
    });

});
