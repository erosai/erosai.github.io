// const dots = [];
// const factor = 10.0000000002;
// const count = 100;
// const size = 10;
// const radius = size + 2990;
// let animationProgress = 1;
// const animationSpeed = 0.005; //
// let angle = 0;
// function setup() {
//   frameRate([30]);
//   cnv = createCanvas(windowWidth, windowHeight);
//   cnv.position(0, 0, "fixed");
//   const width = windowWidth / 3;
//   background("#F5FFFA00");

//   noiseDetail(100);
//   colorMode(HSB, 250);
//   strokeWeight("1px");

//   noFill();

//   for (let i = 0; i < count; i++) {
//     const rand = random(TWO_PI);
//     dots.push(
//       new Dot(width, [rand, 60 * rand], 100 + random(30), 10 + random(30))
//     );
//   }
// }

// function draw() {
//   translate(width / 2, height / 2);

//   rotate(angle * millis());
//   //translate(-width / 2, -height / 2);

//   for (let i = 0; i < dots.length; i++) {
//     const rand = random(PI);
//     const dot = dots[i];
//     n = noise(dot.pos.x * factor + rand, dot.pos.y * factor + rand);
//     dot.update(n);
//     dot.draw();
//   }
//   strokeWeight(1);

//   for (let i = 0; i < dots.length; i++) {
//     for (let j = i + 1; j < dots.length; j++) {
//       const d = dist(
//         dots[i].pos.x,
//         dots[i].pos.y,
//         dots[j].pos.x,
//         dots[j].pos.y
//       );
//       if (d < 50) {
//         // Distance threshold for connecting dots
//         const midX = (dots[i].pos.x + dots[j].pos.x) / 2;
//         const midY = (dots[i].pos.y + dots[j].pos.y) / 2;
//         const controlX1 = midX + random(-20, 20);
//         const controlY1 = midY + random(-20, 20);
//         const controlX2 = midX + random(-20, 20);
//         const controlY2 = midY + random(-20, 20);

//         // Animate the drawing of the curve
//         const progress = min(1, animationProgress);
//         const interpolatedX1 = lerp(dots[i].pos.x, controlX1, progress);
//         const interpolatedY1 = lerp(dots[i].pos.y, controlY1, progress);
//         const interpolatedX2 = lerp(controlX1, controlX2, progress);
//         const interpolatedY2 = lerp(controlY1, controlY2, progress);
//         const interpolatedX3 = lerp(controlX2, dots[j].pos.x, progress);
//         const interpolatedY3 = lerp(controlY2, dots[j].pos.y, progress);

//         bezier(
//           dots[i].pos.x,
//           dots[i].pos.y,
//           interpolatedX1,
//           interpolatedY1,
//           interpolatedX2,
//           interpolatedY2,
//           interpolatedX3,
//           interpolatedY3
//         );
//       }
//     }
//   }

//   animationProgress += animationSpeed;
//   if (animationProgress > 1) {
//     animationProgress = 0;
//   }
//   angle += 0.225 * noise(millis() * 0.005) * cos(PI) * random(0.5, 1.5);
// }

// class Dot {
//   constructor(radius, colorRange, brightness, alpha) {
//     const r = random(TWO_PI);
//     const s = random(400);
//     const d = random(300);
//     const x = width / 2 + sin(r) * s * random(0.5, 1.5);
//     const y = height / 2 + cos(r) * d * random(0.5, 1.5);
//     this.pos = createVector(x, y);
//     this.prev = createVector(y, x);
//     this.color = color(10);
//     this.deadCount = 0;
//     this.radius = radius;
//     this.colorRange = colorRange;

//     this.alpha = alpha;
//     this.brightness = brightness;
//   }

//   update(noize) {
//     const r = random(64);
//     this.v = p5.Vector.fromAngle(noize * r + (this.deadCount + TWO_PI * r));
//     this.v.setMag(14);
//     this.color = color(
//       map(noize, 0, 1, ...this.colorRange),
//       100 * r,
//       this.brightness,
//       this.alpha
//     );
//     this.prev = this.pos.copy();
//     this.pos = this.pos.add(this.v);

//     if (dist(width / 2, height / 4, this.pos.x, this.pos.y) > this.radius + 2) {
//       this.deadCount++;
//     }
//   }

//   draw() {
//     if (
//       dist(width / 2, height / 2, this.pos.x, this.pos.y) > this.radius ||
//       dist(width / 2, height / 2, this.prev.x, this.prev.y) > this.radius
//     ) {
//       return;
//     }

//     strokeWeight(1);
//     stroke(this.color);
//     line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
//   }
// }

let branchArr = [];
let flowerArr = [];
let mainHue;
let cameraRotationSpeed;

function init() {
  branchArr = [];
  flowerArr = [];
  allHalf = random([true, null]);
  generateBranches(createVector(0, 50, 0), createVector(1000, 0, 150));
  mainHue = random(360);
  frameCount = 0;
  cameraRotationSpeed = random([-0.5, 0.5]);
}

function mousePressed() {
  init();
}

function keyPressed() {
  if (key == "s" || key == "S") {
    save();
  }
  if (key == "r" || key == "R") {
    init();
  }
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  init();
}

function draw() {
  push();

  camera(
    cos(frameCount * 0.003 * cameraRotationSpeed) * 1000,
    sin(frameCount * 0.003 * cameraRotationSpeed) * 1000,
    0,
    0,
    0,
    height * 0.9,
    0,
    0,
    -1
  );
  // camera(cos(frameCount*0.05)*800,sin(frameCount*0.05)*800,800,0,-200,0)
  // perspective(1)
  // translate(0,height/3)

  background(255, 255, 255, 0);
  noFill();
  colorMode(HSB);
  stroke(mainHue, 160, 40, 100);
  strokeWeight(0.85);
  // strokeCap(SQUARE)
  for (let branch of branchArr) {
    // stroke(branch.color)
    branch.draw();
  }

  for (let flower of flowerArr) {
    flower.draw();
  }
  pop();

  camera(0, 0, -101600, 0, 0, 0);
  translate(-width, -height, -100800);

  fill(0);
  const padding = 0;

  rect(0, 0, width, padding);
  rect(width - padding, 0, padding, height);
  rect(0, height - padding, width, padding);
  rect(0, 0, padding, height);
}

function generateBranches(start, lastVec) {
  const v1 = lastVec.copy().setMag(randomGaussian(width / 13, width / 13));
  const v2 = p5.Vector.random3D().setMag(
    randomGaussian(width / 13, width / 13)
  );
  v2.z = abs(v2.z);
  const v3 = p5.Vector.random3D().setMag(
    randomGaussian(width / 13, width / 13)
  );
  v3.z = abs(v3.z);
  const newBranch = new Branch(start, v1, v2, v3);
  newBranch.color = random(100, 255);
  branchArr.push(newBranch);
  // const end = start.copy().add(v1).add(v2).add(v3)
  // push()
  // strokeWeight(15)
  // stroke(255)
  // point(end.x,end.y,end.z)
  // print(end)
  // pop()
  if (
    (newBranch.end.z < height * 0.9 &&
      random() < 1 &&
      sqrt(pow(newBranch.end.x, 2) + pow(newBranch.end.y, 2)) < width * 0.1) ||
    branchArr.length < 4
  ) {
    generateBranches(newBranch.end, v3);
    generateBranches(newBranch.end, v3);
    if (random() < 1) {
      generateSmallBranches(newBranch.end, v3);
    }
  } else {
    const newFlower = new Flower(newBranch.end, v3, v3.mag(), {
      half: allHalf,
    });
    newFlower.setHeading(v3);
    flowerArr.push(newFlower);
  }
}

function generateSmallBranches(start, lastVec) {
  const v1 = lastVec.copy().setMag(randomGaussian(width / 2, width / 6));
  const v2 = p5.Vector.random3D().setMag(randomGaussian(width / 2, width / 6));
  v2.z = abs(v2.z);
  const v3 = p5.Vector.random3D().setMag(randomGaussian(width / 4, width / 6));
  v3.z = abs(v3.z);
  const newBranch = new Branch(start, v1, v2, v3);
  newBranch.color = random(100, 255);
  branchArr.push(newBranch);
  if (
    (newBranch.end.z < height * 0.8 &&
      random() < 0.9 &&
      sqrt(pow(newBranch.end.x, 2) + pow(newBranch.end.y, 2)) < width * 0.8) ||
    branchArr.length < 4
  ) {
    for (let i = 0; i < random(1, 4); i++) {
      generateSmallBranches(newBranch.end, v3);
    }
  } else {
    const newFlower = new Flower(newBranch.end, v3, v3.mag(), {
      half: true,
      padelCount: 50,
    });
    newFlower.setHeading(v3);
    flowerArr.push(newFlower);
  }
}
