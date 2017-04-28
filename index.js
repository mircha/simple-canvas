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
	socket.on('pathadded', function(path){
		//console.log(data)
		socket.broadcast.to('chat').emit('add path', path);
		//io.emit('message', 'blah');
	})
	socket.on('rect', function( color, w,h,t,l){
		//console.log(data)
		socket.broadcast.to('chat').emit('rect', color, w,h,t,l);
		//io.emit('message', 'blah');
	})
	socket.on('send_redraw', function( data){
		console.log(data)
		socket.broadcast.to('chat').emit('do_redraw', data);
		//io.emit('message', 'blah');
	})
	socket.on('objAddOnce', function( id, data){
		//console.log(data)
		socket.broadcast.to('chat').emit('drawObj', id, data);
		console.log(data.type)
		//io.emit('message', 'blah');
	})
	socket.on('clear', function(){
		socket.broadcast.to('chat').emit('clearCanvas');
	})
	socket.on('removeObject', function(o){
		console.log('Removed object with id:'+o+'  '+o.id);
		socket.broadcast.to('chat').emit('removeObj',o);
	})
	socket.on('bringToFront', function(o){
		socket.broadcast.to('chat').emit('bringToFront',o);
	})
	socket.on('sendToBack', function(o){
		socket.broadcast.to('chat').emit('sendToBack',o);
	})
});


var path = require('path')

app.use(express.static('/'))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/img', express.static(path.join(__dirname, 'img')))

http.listen(3000, function(){
	console.log('listening on port 3000!')
});
