function moveForward(){
	socket.emit('start');
	console.log('start');
}

function moveReverse(){
	socket.emit('reverse');
	console.log('reverse');
}

document.getElementById('forward').onclick = moveForward;
document.getElementById('reverse').onclick = moveReverse;
