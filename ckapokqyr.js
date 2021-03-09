let wall;
let eyeZ;
let sh;
let t;
let es = [];
const CYCLE = 100;
var cnv;
function windowResized(){
	resizeCanvas(windowWidth/2,windowHeight/2);
	cnv.position(windowWidth/4,windowHeight/4,'fixed');
  }

function preload(){
	mouthimg = loadImage('assets/mouth.png');
}
function setup() {
    cnv = createCanvas(windowWidth/2, windowHeight/2, WEBGL);
	cnv.position(windowWidth/4,windowHeight/4);
	let dep = max(width,height);
	ortho(-width / 2, width / 2, height / 2, -height / 2,-dep*2 , dep*2);
  eyeZ = height / 2 / tan((30 * PI) / 180); // The default distance the camera is away from the origin.
	wall = new IntersectPlane(0, 0, 1, 0, 0, 300);
  noStroke();
	init();
	
	//shader
	sh = createShader(vert,frag);
	this.shader(sh);
	sh.setUniform("u_resolution", [width,height]);
	sh.setUniform("u_lightDir", [1,-1,-1]);
}

function draw() {
  background(255);
 
	//culclate mousePos
  let x = mouseX - width / 2;
  let y = (mouseY - height / 2)*-1;
	/*
	let radius = 200;
	x = cos(frameCount/CYCLE*TWO_PI)*radius;
	y = sin(frameCount/CYCLE*TWO_PI)*radius;
	*/
  const Q = createVector(0, 0, eyeZ); // A point on the ray and the default position of the camera.
  const v = createVector(x, y, -eyeZ); // The direction vector of the ray.
  let intersect; // The point of intersection between the ray and a plane.
  let closestLambda = eyeZ * 10; // The draw distance.
	let lambda = wall.getLambda(Q, v); // The value of lambda where the ray intersects the object
	if (lambda < closestLambda && lambda > 0)
	{
		// Find the position of the intersection of the ray and the object.
		intersect = p5.Vector.add(Q, p5.Vector.mult(v, lambda));
		closestLambda = lambda;
	}
	const mousePos = createVector(intersect.x,intersect.y,intersect.z);
	
	for(let item of es)
	{
		item.setTarget(mousePos);
		item.update();
		item.display();
	}
}
 

function init()
{
	let size = min(width,height)*0.7;
	let span = size/3;
	for(let y = 0; y <= 4; y+=span)
	{
		for(let x = 0; x <= 4; x+=span)
		{
			es.push(new Eye(createVector(x-50,y,0),span*0.4));
			es.push(new Eye(createVector(x+50,y,0),span*0.4));
		}
	}
}



class Eye
{
	constructor(_pos,_radius)
	{
		this.pos = _pos;
		this.radius = _radius;
		this.dMult = random(0.05,0.1);
		this.currentTarget = createVector(0,0,1);
		this.target = createVector(0,0,1);
		this.tex = createGraphics(this.radius*4,this.radius*2);
	}
	
	setTarget(_targetPos)
	{
		this.target = _targetPos;
	}

	update()
	{
		this.currentTarget.add(p5.Vector.sub(this.target,this.currentTarget).mult(this.dMult));
	}
	
	drawTex()
	{
		this.tex.ellipseMode(CENTER);
		this.tex.noStroke();
		this.tex.background("#F4F8FB");		
		let diameter = this.tex.width*0.2;
		let noiseMult = noise(this.pos.x + sin((frameCount/CYCLE)*TWO_PI));
		diameter += (noiseMult-0.5)/5 * diameter;
		this.tex.fill(100);
		this.tex.ellipse(this.tex.width/2,this.tex.height/2,diameter,diameter);
		
		this.tex.push();
		this.tex.translate(this.tex.width/2,this.tex.height/2);
		for(let r = 0 ; r <TWO_PI; r+=PI/30)
		{
			this.tex.stroke(40);
			this.tex.push();
			this.tex.rotate(r);
			this.tex.line(0,0,diameter/2,0);
			this.tex.pop();
		}
		this.tex.pop();
		this.tex.noStroke();
		
		diameter *= 0.5;
		this.tex.fill("black");
		this.tex.ellipse(this.tex.width/2,this.tex.height/2,diameter,diameter);
		diameter *= 0.5;
		this.tex.fill(255,100);
		this.tex.ellipse(this.tex.width*0.55,this.tex.height*0.4,diameter,diameter);
	}

	
	display()
	{
		let angleY = atan2(this.currentTarget.x - this.pos.x, this.currentTarget.z - this.pos.z);
		let angleX = atan2(this.currentTarget.z - this.pos.z, this.currentTarget.y - this.pos.y);
		push();
		translate(this.pos);
		rotateY(-angleY);
		rotateX(angleX + PI/2);
		
		this.drawTex();
		sh.setUniform("u_tex",this.tex);
		sphere(this.radius);
		pop();
	}
}



// Class for a plane that extends to infinity.
class IntersectPlane
{
  constructor(n1, n2, n3, p1, p2, p3) {
    this.normal = createVector(n1, n2, n3); // The normal vector of the plane
    this.point = createVector(p1, p2, p3); // A point on the plane
    this.d = this.point.dot(this.normal);
  }

  getLambda(Q, v) {
    return (-this.d - this.normal.dot(Q)) / this.normal.dot(v);
  }
}


var vert = `

		precision highp float;

    // attributes, in
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoord;

    // attributes, out
    varying vec3 var_vertPos;
    varying vec3 var_vertNormal;
    varying vec2 var_vertTexCoord;
		varying vec4 var_centerGlPosition;//原点
    
    // matrices
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;

    void main() {
      vec3 pos = aPosition;  
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);

      // set out value
      var_vertPos      = pos;
      var_vertNormal   =  aNormal;
      var_vertTexCoord = aTexCoord;
			var_centerGlPosition = uProjectionMatrix * uModelViewMatrix * vec4(0., 0., 0.,1.0);
    }
`;


var frag = `

precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 u_lightDir;
uniform vec3 u_col;
uniform mat3 uNormalMatrix;
uniform sampler2D u_tex;

//attributes, in
varying vec4 var_centerGlPosition;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;



float random (in vec2 st) {
   	highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(st.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

float noise(vec2 st) {
    vec2 i = vec2(0.);
		i = floor(st);
    vec2 f = vec2(0.);
		f = fract(st);
    vec2 u =  vec2(0.);
		u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

float grid(vec2 uv){
	uv *= 10.;
  uv = fract(uv);
  float v = uv.x >= 0. && uv.x < 0.1 || uv.y >= 0. && uv.y < 0.1 ? 1. : 0.;
  return v;
}

float gridGra(in vec2 uv , float gridNum){
    float scale = gridNum;
    uv *= scale;
    uv = fract(uv);
    float o = abs(uv.y + -0.5)*2.;
		o *= abs(uv.x + -0.5)*2.;
    return o;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
		st.x *= u_resolution.x/u_resolution.y;

		//centerPos
		vec2 centerPos = var_centerGlPosition.xy/var_centerGlPosition.w;//スクリーン変換
		centerPos = (centerPos + 1.0)*.5*1.;//gl_FragCoordと座標を合わせる pixelDensityによって係数が変化する
		centerPos.x *= u_resolution.x/u_resolution.y;//gl_FragCoordと座標を合わせる
	
		//dot
		vec3 vertNormal = normalize(uNormalMatrix * var_vertNormal);
    float dot = dot(vertNormal,-normalize(u_lightDir));
    dot = (dot *.5) + .5;
		
		//texture
		vec4 smpColor0 = texture2D(u_tex, var_vertTexCoord);

		//noise
    float noise1 = noise((st-centerPos)*700.);
		float noise2 = noise((st-centerPos)*1000.);

		//combine
		float tone = step(noise1,dot*1.2);
		vec3 col = smpColor0.xyz * tone + (smpColor0.xyz-0.25) * (1.-tone);
		col += noise2*.15;

		gl_FragColor = vec4(col,1.0);
}

`;
