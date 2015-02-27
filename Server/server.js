var irobot = require('./index');
var robot = new irobot.Robot('/dev/ttyUSB0');
//var robot = new irobot.Robot('/dev/ttyO0');
var io = require('socket.io').listen(3232);
io.set('log level', 1); // reduce logging
 
robot.on('sensordata', function (data) {
 
	if(io.countup == null) io.countup= 0;
	if (io.countup++ % 10 == 0) { //only send every n times
		//console.log(io.countup);
		data['countup'] = io.countup;
		io.sockets.volatile.emit('sensordata', data);
	};
});
 
 
io.sockets.on('connection', function (socket) {
 
	socket.on('drive', function (data) {
	try {
		console.log("drive",data);
		console.log("data: " + data)
		robot.drive(data);
	}
	catch(err)
	{
	console.log("Drive error encountered, most likely value out of bounds, ingoring");
	}
	});
 
	socket.on('sing', function (data) {
		console.log("sing",data);
		robot.sing(data);
	});
 
	socket.on('safeMode', function () {
		console.log("safeMode");
		robot.safeMode();
	});
 
	socket.on('fullMode', function () {
		console.log("fullMode");
		robot.fullMode();
	});
 
});
