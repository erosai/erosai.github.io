class Flower {
  constructor(start, head, r, option = {}) {
    this.start = start;
    this.head = head;
    this.bend = p5.Vector.random3D();
    this.bend.z = abs(this.bend.z);
    this.pedalCount = option.padelCount || floor(randomGaussian(130, 5));
    this.startAngle = random(TWO_PI * 2);
    this.r = r;
    this.t = floor(random(100));
    this.half = option.half || random([true, false]);
  }

  setHeading(vec) {
    this.head = vec.copy();
    this.head.normalize();
    // print(1)
  }

  draw() {
    push();
    translate(this.start);

    // push()
    // strokeWeight(0.2)
    // stroke("rgb(245,0,255)")
    // line(0,0,0,this.head.x*50,this.head.y*50,this.head.z*50)
    // stroke("rgb(0,185,255)")
    // line(0,0,0,0,0,100)
    // stroke("rgb(255,0,0)")
    // line(0,0,0,100,0,0)
    // stroke("rgb(0,255,16)")
    // line(0,0,0,0,100,0)
    // pop()

    // rotateX(asin())
    // rotateX(atan(this.head.y/this.head.z))
    rotateX(createVector(this.head.y, this.head.z).heading() - PI / 2);
    rotateY(asin(this.head.x / this.head.mag()));

    // push()
    // stroke("rgb(0,185,255)")
    // line(0,0,0,0,0,100)
    // stroke("rgb(255,0,0)")
    // line(0,0,0,100,0,0)
    // stroke("rgb(0,255,16)")
    // line(0,0,0,0,100,0)
    // pop()

    const pedalModifier = this.half ? 0.5 : 1;
    for (let i = 0; i < this.pedalCount * pedalModifier; i++) {
      const ang = map(
        i,
        0,
        this.pedalCount,
        this.startAngle + 2,
        this.startAngle + 2 * TWO_PI
      );

      const wavDelta = map(i, 0, this.pedalCount, 0, TWO_PI);
      const waving1 = cos(this.t * 0.05 + wavDelta) * this.r * 0.1;
      const waving2 = cos(this.t * 0.03 + wavDelta) * this.r * 0.1;
      // const waving2 = sin(this.t*0.05) * 10

      bezier(
        cos(ang) * TWO_PI,
        sin(ang) * TWO_PI,
        0,
        cos(ang) * TWO_PI,
        sin(ang) * TWO_PI,
        this.r,
        cos(ang) * this.r * 0.5,
        sin(ang) * this.r,
        this.r * 1.5 + waving1,
        cos(ang) * this.r * 1.5 + this.bend.x * this.r * 0.5,
        sin(ang) * this.r * 1.5 + this.bend.y * this.r * 0.5,
        this.r + this.bend.z * this.r * 0.5 + waving2
      );
    }

    pop();

    this.t++;
  }
}
