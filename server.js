//modulos necessarios
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");

 //criando o htpp server que que deverá passar os requests para o express app
 //SocketIO escutar o htpp server
 var app = express();
 var httpServer = http.createServer(app);
 var io = socketIO.listen(httpServer);    

//definindo a porta
httpServer.listen(process.env.PORT || 8080);

//printa no prompt se o servidor estiver online
console.log('Online');
