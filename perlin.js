const dots = []
const factor = 0.0052
const count = 150
const size = 1000
const radius = size * 2
function setup() {
    frameRate([30])
	cnv = createCanvas(windowWidth/2, windowHeight/2);
    cnv.position(windowWidth/4,windowHeight/8,'fixed');
	const width = (windowWidth + windowHeight) /4;
	background('#F5FFFA');

	noiseDetail(100)
	colorMode(HSB, 200)
	strokeWeight("5px")
	stroke(10)
	noFill()

	
	for (let i = 0; i < count; i++) {	const rand = random(TWO_PI) ; const rand2 = random(100);
		dots.push(new Dot(width/4, [rand,70 * rand], rand * 100, 8 ))
	}
}

function draw() {
	for (let i = 0; i < dots.length; i++) {
		const rand = random(PI)
		const dot = dots[i]
		n = noise(dot.pos.x * factor, dot.pos.y * factor )
		dot.update(n)
		dot.draw()
	}
}

class Dot {
	constructor (radius, colorRange, brightness, alpha) {
		const r = random(TWO_PI)
		const s = random(100)
		const d = random(100)
		const x = width / 2 + sin(r) * s
		const y = height / 2 + cos(r) * d
		this.pos = createVector(x,y)
		this.prev = createVector(x,y)
		this.color = color(20)
		this.deadCount = 0
		this.radius = radius
		this.colorRange = colorRange
		this.alpha = alpha
		this.brightness = brightness
	}
	
	update(noize) {
		const r = random(32)
		this.v = p5.Vector.fromAngle(noize * r + (this.deadCount  + TWO_PI * r ))
		this.v.setMag(10)
		this.color = color(map(noize, 0, 1, ...this.colorRange), 100 * r, this.brightness, this.alpha)
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
