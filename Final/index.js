console.log("Importing libraries.");
var http = require('http');
var fs = require('fs');
var SerialPort = require("serialport").SerialPort;

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
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
});

PORT = 8080;
server.listen(PORT);
console.log("[HTTP] Server started on port " + PORT);

function ProcessLine(arr) {
  line = arr.join("").slice(0,-2);
  io.emit('gotline', line);
}

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600
});
port.on("open", function(){
  Line = [];
  console.log("[SERIAL] Opened");
  port.on("data", function(data){
    chars = JSON.parse(JSON.stringify(data))["data"].splice(",");
    chars.forEach(function(charcode) {
      //Convert to string knowng it is ascii.

      char = String.fromCharCode(charcode);
      //console.log("[SERIAL] Got data: " + char);

      Line.push(char);
      if (char == "\n") {
        ProcessLine(Line);
        Line = [];
      }
    });
  });
});

/*
var serialport = SerialPort("/dev/ttyUSB0");
serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
      console.log(data);
  });
});
*/
