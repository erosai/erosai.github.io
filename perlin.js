const dots = []
const factor = 0.008
const count = 2000
const size = 500
const radius = size * 0.8 
function setup() {
    frameRate([60])
	cnv = createCanvas(windowWidth/2, windowHeight/2);
    cnv.position(windowWidth/4,windowHeight/4,'fixed');

	background(241);
	noiseDetail(2)
	colorMode(HSB, 200)
	strokeWeight(2)
	stroke(32)
	noFill()
	ellipse(width /2, height /2, radius * 5 + 1)
	
	for (let i = 0; i < count; i++) {		
		dots.push(new Dot(radius, [60,100], -10, 14))
	}
}

function draw() {
	for (let i = 0; i < dots.length; i++) {
		const dot = dots[i]
		n = noise(dot.pos.x * factor, dot.pos.y * factor)
		dot.update(n)
		dot.draw()
	}
}

class Dot {
	constructor (radius, colorRange, brightness, alpha) {
		const r = random(TWO_PI)
		const x = width / 2 + sin(r) * radius
		const y = height / 2 + cos(r) * radius
		this.pos = createVector(x,y)
		this.prev = createVector(x,y)
		this.color = color(0)
		this.deadCount = 0
		this.radius = radius
		this.colorRange = colorRange
		this.alpha = alpha
		this.brightness = brightness
	}
	
	update(noize) {
		this.v = p5.Vector.fromAngle(noize * TWO_PI + (this.deadCount * PI))
		this.v.setMag(2)
		this.color = color(map(noize, 0, 1, ...this.colorRange), 1500, this.brightness, this.alpha)
		this.prev = this.pos.copy()
		this.pos = this.pos.add(this.v)
		
		if (dist(width/2, height/2, this.pos.x, this.pos.y) > this.radius + 2) {
			this.deadCount++
		}
	}
	
	draw() {
		if (
      dist(width / 2, height / 2, this.pos.x, this.pos.y) > this.radius ||
      dist(width / 2, height / 2, this.prev.x, this.prev.y) > this.radius
    ) {
      return
    }

		strokeWeight(1)
		stroke(this.color)
		line(this.prev.x, this.prev.y, this.pos.x, this.pos.y)

	}
}
