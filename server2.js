
//modulos necessarios
var app = require('express')();
var express = require("express");
//criando o htpp server que que deverá passar os requests para o express app
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//dicionario p/ guardar username e ID
var dic = {};

//definindo a porta
http.listen(process.env.PORT || 3000);

//printa no prompt se o servidor estiver online
console.log('Chat Online em: localhost:3000');

//acessando a pasta onde estarao os arquivos do "chat client"
app.use(express.static(__dirname + '/client'));


app.get('/', function(req,res){
  //redirecionar p/ o home.hmtl
  res.sendFile(__dirname + '/client/home.html');

});


//Post do nome
app.post('/', function(req, res){
  //aqui pegamos a informação do post pelo req.body.name 
  username = req.body.username;
  console.log(username)

  //vai para localhost:8080/chat
  res.redirect('/chat');
  
  });

// Para evitar o problema de overwrite do username
io.on('connection', function (client) {
  
  client.send(client.id);
  id = client.id;

  //relaciona o id com o username
  dic[client.id] = username;
  
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
  socket.on('msg', function(msg, user){
 
    userName = dic[socket.id];
    io.emit('msg', msg, userName);

  });
});
