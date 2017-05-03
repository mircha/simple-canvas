var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var socketid =[];

io.sockets.on('connection', function(socket){
	socketid.push(socket.id);
	socket.join('chat');
	setTimeout(function(){
	io.sockets.in(socketid).emit('socketid', socket.id);
		console.log(socket.id + ' connected')
		console.log(socketid + ' clients')
	},100)

	socket.on('disconnect', function(){
		var index = socketid.indexOf(socket.id);
		socketid.splice(index, 1);
		console.log(socket.id + ' disconnected')
	})
	socket.on('update', function(json, k){
		socket.broadcast.to('chat').emit('updateCanvas', json, k);
	})
	socket.on('clear', function(){
		socket.broadcast.to('chat').emit('clearCanvas');
	})
});


var path = require('path')

app.use(express.static('/'))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/img', express.static(path.join(__dirname, 'img')))
app.use('/help', express.static(path.join(__dirname, 'help')))

http.listen(3000, function(){
	console.log('listening on port 3000!')
});
