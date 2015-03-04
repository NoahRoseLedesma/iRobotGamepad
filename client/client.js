var GampadID = 1; // IMPORTANT make sure this is set PROPERLY. Use navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []) to ensure you have the corrent gamepad selected!
var socket = io.connect("http://10.48.102.111:3232");
function xinputTick()
{
	var gamepad = navigator.webkitGetGamepads && navigator.webkitGetGamepads()[GampadID];

	speed = (gamepad.buttons[7] * 500);
	speed = Math.round(speed);
	b12 = gamepad.buttons[12];
	b13 = gamepad.buttons[13];
	b14 = gamepad.buttons[14];
	b15 = gamepad.buttons[15];
	b1 = gamepad.bubblesttons[1];
	if(b12 == 1 && b13 == 0 && b14 == 0 && b15 == 0 )
	{
		//Drive forward
		//console.log('Forward');
		socket.emit('drive', {
                left: speed,
                right: speed
            });
	}
	if(b12 == 1 && b13 == 0 && b14 == 0 && b15 == 1 )
	{
		//Drive Forward + Right
		//console.log('Forward and Right');
		socket.emit('drive', {
                left: (0.5 * speed),
                right: speed
            });
	}
	if(b12 == 0 && b13 == 0 && b14 == 0 && b15 == 1 )
	{
		//Drive Right
		//console.log('Right');
		socket.emit('drive', {
                left: 0,
                right: speed
            });
	}
	if(b12 == 0 && b13 == 1 && b14 == 0 && b15 == 1 )
	{
		//Drive Backwards + Right
		//console.log('Right and Backwards');
		socket.emit('drive', {
                left: (-0.5 * speed),
                right: (-1 * speed)
            });
	}
	if(b12 == 0 && b13 == 1 && b14 == 0 && b15 == 0 )
	{
		//Drive Backwards
		//console.log('Backwards');
		socket.emit('drive', {
                left: (-1 * speed),
                right: (-1 * speed)
            });
	}
	if(b12 == 0 && b13 == 1 && b14 == 1 && b15 == 0 )
	{
		//Drive Backwards + Left
		//console.log('Backwards and Left');
		socket.emit('drive', {
                left: (-1 * speed),
                right: (-0.5 * speed)
            });
	}
	if(b12 == 0 && b13 == 0 && b14 == 1 && b15 == 0 )
	{
		//Drive Left
		//console.log('Left');
		socket.emit('drive', {
                left: speed,
                right: 0
            });
	}
	if(b12 == 1 && b13 == 0 && b14 == 1 && b15 == 0 )
	{
		//Drive Forward + left
		//console.log('Forward and Left');
		socket.emit('drive', {
                left: speed,
                right: (0.5 * speed)
            });
	}
	if(b1 == 1)
	{
		socket.emit('drive', {
                left: 0,
                right: 0
            });
		socket.emit('fullMode');
	}
}
	$( document ).ready(function() {
var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
var speed = 0;
var gamepad;
var b12;
var b13;
var b14;
var b15;
var b1;
if(gamepadSupportAvailable)
{
	//console.log('Gamepad is supported by your browser');
		//console.log(gamepad);
	setInterval(function () {xinputTick()}, 100)
}
else
{
	console.log('Gamepad is not supported! Resorting to backup controlls.');
	return;
	// Use bool gamepadSupportAvailable to check if gamepad support is avalible this session.
}
});
