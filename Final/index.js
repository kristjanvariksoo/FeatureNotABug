console.log("Importing libraries.");
var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client

var server = http.createServer(function(req, res) {
  console.log("[HTTP] Request was gotten." + req);
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});


// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    console.log('[SOCK] Client connected!');
    console.log(socket);
});

PORT = 8080;
server.listen(PORT);
console.log("[HTTP] Server started on port " + PORT);

var SerialPort = require("serialport").SerialPort;
var serialport = new SerialPort("/dev/ttyUSB0");
serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
      console.log(data);
  });
});
