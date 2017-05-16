var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs-extra');

var socketid =[];
var names = [];
io.sockets.on('connection', function(socket){
	socketid.push(socket.id);
	
	socket.join('chat');
	setTimeout(function(){
	io.sockets.in(socketid).emit('socketid', socket.id);
		console.log(socket.id + ' connected')
		console.log(socketid + ' clients')
	},100)

	console.log(Object.keys(io.engine.clients))
	console.log(names)

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
	socket.on('saveToJSON', function(json, name){
		var file = __dirname+'/json/'+name+'.json';
		fs.outputFile(file, json);
	})
	socket.on('loadFiles', function(){
    	var files=loadQuery(sql);
    	setTimeout(function(){  io.emit('resFiles',files)  }, 500)
  	})
});
var sql = [];
const testFolder = './json/';
// const fs = require('fs');
var path = require('path')
function loadQuery(sql){
    fs.readdir(testFolder, (err, files) => {
      sql.length=0;

      files.filter(file => {return path.extname(file)==='.json'}).forEach(file => {
        fs.readFile(path.join(__dirname, testFolder,file), 'utf8', function(err, data) {
          if (err) throw err;
        sql.push({name : file, sql: data});
        });
      });

      
  })
  return sql; 
}
app.use(express.static('/'))
app.get('/', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(__dirname + '/index.html');
});

app.get('/check_name', function(req, res, name) {
	//console.log(req.query)
	fs.stat(__dirname+'/json/'+req.query.name+'.json', function(err, stat){
		console.log(__dirname+'/json/'+req.query.name+'.json')
		if(err == null){
			console.log('File exists');
			res.send('false')
		}else{
			console.log('not file');
			res.send('true')
		}
	})
});
app.get('/identity', function(req, res){
	//res.send(req.query.name+' -> '+req.query.xxx)
	//res.send(req.query.xxx)
	//names[req.query.socket] = req.query.name;
		names.push(req.query.name);
	res.send(names)
	setTimeout(function(){

	console.log(Object.keys(io.engine.clients))
	},100)
})
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/img', express.static(path.join(__dirname, 'img')))
app.use('/help', express.static(path.join(__dirname, 'help')))
app.use('/json', express.static(path.join(__dirname, 'json')))
app.use('/log', express.static(path.join(__dirname, 'log')))

http.listen(3000, function(){
	console.log('listening on port 3000!')
});
