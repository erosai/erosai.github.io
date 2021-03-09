//erosai
var x2 = 400;
var y2 = 0;
var tx = 600;
var ty = 0;
var t = 0;
var up = 0;
var up2 = 0;
var bubbles = [];
var startNum=12;
var down=1.0;
var cnv ; 
function dome(){}



function preload() {
    img = loadImage('thaci.png');
    pes = loadImage('500.jpg');
}
function windowResized(){
    resizeCanvas(windowWidth/2,windowHeight/2);

    cnv.position(windowWidth/4,windowHeight/4,'fixed');
  }

function setup() {
	cnv = createCanvas(windowWidth/2, windowHeight/2);
	cnv.position(windowWidth/4 , windowHeight/4 , 'fixed');
	frameRate(50);
}

function mouseDragged() {}

function draw() {
	
	background(0);
	push();
	textSize(30)
	textAlign(CENTER);
	
	//text("Press T to see the target",width/2,300)
		textSize(120)

	//text("Worm AI",width/2,250)
	pop();
	t++;
	
    image(pes, tx, ty, 50, 25);
		
		//text("Worm A.I.",500,300); Just for thumbnail
	
	if (t < 5) {
		up = round(random(1, 0));
	}
	if (t < 5) {
		up2 = round(random(1, 0));
	}
	if (up == 1) {
		tx += t / 10;
	}
	if (up == 0) {
		tx -= t / 10;
	}
	if (up2 == 1) {
		ty += t / 10;
	}
	if (up2 == 0) {
		ty -= t / 10;
	}
	if (t > 60) {
		t = 0;
	}
	if (tx > x2) {
		x2 += (tx - x2) / 60
	}
	if (tx < x2) {
		x2 -= (x2 - tx) / 60
	}
	if (ty > y2) {
		y2 += (ty - y2) / 60
	}
	if (ty < y2) {
		y2 -= (y2 - ty) / 60
	}
	bubbles.push(new Bubble(x2, y2));

	if (bubbles.length > 100) {
		bubbles.splice(0, 1);
	}

	dome();
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].move();
	}


}

function Bubble(x, y) {
	this.x = x
	this.y = y
	this.move = function() {

		if (this.x > width) {
			up = 0;
		}
		if (this.y > height) {
			up2 = 0
		}
		if (this.x < 0) {
			up = 1
		}
		if (this.y < 0) {
			up2 = 1;
		}

		image(img ,this.x, this.y, 50, 50);
	}
}
