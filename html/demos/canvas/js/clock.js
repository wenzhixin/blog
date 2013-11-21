var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	
	WIDTH = canvas.width,
	HEIGHT = canvas.height,
	RADIUS = WIDTH / 2 - 30;
	NUMBER_RADIUS = RADIUS + 10,
	FONT_HEIGHT = 15;
	
context.font = FONT_HEIGHT + 'px';


function drawCircle() {
	context.beginPath();
	context.arc(WIDTH / 2, HEIGHT / 2, RADIUS, 0, Math.PI * 2, true);
	context.stroke();
}

function drawCenter() {
	context.beginPath();
	context.arc(WIDTH / 2, HEIGHT / 2, 5, 0, Math.PI * 2, true);
	context.fill();
}

function drawNumbers() {
	var i, angle, numWidth;
		
	for (i = 1; i <= 12; i++) {
		angle = Math.PI / 6 * (i - 3);
		numWidth = context.measureText(i).width;
		context.fillText(i, WIDTH / 2 + Math.cos(angle) * NUMBER_RADIUS - numWidth / 2, 
			HEIGHT / 2 + Math.sin(angle) * NUMBER_RADIUS + FONT_HEIGHT / 3);
	}
}

function drawHands() {
	var date = new Date(),
		h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds();
	
	drawHand((h % 12) * 5 + (m / 60) * 5, RADIUS - 60);
	drawHand(m, RADIUS - 40);
	drawHand(s, RADIUS - 20);
}

function drawHand(loc, radius) {
	var angle = Math.PI * 2 * (loc / 60) - Math.PI / 2;
	
	context.moveTo(WIDTH / 2, HEIGHT / 2);
	context.lineTo(WIDTH / 2 + Math.cos(angle) * radius, 
		HEIGHT / 2 + Math.sin(angle) * radius);
	context.stroke();
}

function drawClock() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
	
	drawCircle();
	drawCenter();
	drawNumbers();
	drawHands();
	setTimeout(drawClock, 1000);
}

drawClock();
