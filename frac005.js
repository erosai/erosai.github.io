var gl,noctaves;
let xoff = 10; 
const capturer = new CCapture({
    framerate: 30 ,
    format: "webm",
    name:"Calm you breath",
    quality : 100 ,
    verbose : true ,
});

let cnv ;
let noise = 0 ; 

function setup() {
    
    cnv = createCanvas(864, 1080,WEBGL);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
	  gl=this.canvas.getContext('webgl');
	  gl.disable(gl.DEPTH_TEST);
	noctaves=24;
	test=new p5.Shader(this._renderer,vert,frag);//shaders are loaded
  shader(test);//shaders are applied	
}
function draw() {  
  
  
  if (frameCount === 1) capturer.start();
  xoff += 0.001 ;
	test.setUniform("iResolution", [width,height]);//pass some values to the shader
  test.setUniform("iTime", 10000 + sin(millis()*0.001)  );
	test.setUniform('iMouse',[(100*millis()*0.00001)+100,(100*millis()*0.00001)+100 ]);
	test.setUniform("noctaves",noctaves);
  //test.setUniform("noise", millis()*0.0001);
	shader(test);
	box(width/2);
  
  
  capturer.capture(cnv.canvas);
    if(frameCount === 300){
     noLoop();
     capturer.stop();
     capturer.save();
    }
}



var frag=`


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform int noctaves;

float mousefactor;
float random (in vec2 _st) {
    return fract(cos(dot(_st.xy,
                         vec2(11.9898,78.233)))*
        43758.54353123 + iTime);
}
float noise( in vec2 x )
{
	return sin(2.5*x.x)*cos(1.5*x.y);
}

const mat2 rot = mat2( 0.80,  0.60, -0.60,  0.80 );
float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(50.0);
    for (int i = 0; i < 10; ++i) {//noControl
		if(i>=noctaves)break;
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
vec2 mouse=iMouse/iResolution;
    vec2 st = 4.3*(gl_FragCoord.xy/iResolution.xy-.5);
		//st.x*=iResolution.x/iResolution.y*sin(iTime);
    vec3 color = vec3(0.0);
    vec2 q = vec2(0.) *0.00001;
    q.x = fbm( st + sin(0.02*iTime));
    q.y = fbm( st + sin(1.0-0.15*iTime));
    vec2 r = vec2(0.);
    r.x = fbm( st + sin(2.0*mouse.x+0.4)*q + vec2(3.7,2.2)+sin(st.x+0.035*iTime) );
    r.y = fbm( st + (2.0*mouse.y+.5)*q + vec2(10.3,2.8)+ sin(st.y+.2*iTime));
    float f = fbm(0.4*st+6.0*r);
    color = smoothstep(vec3(4.101961,1.19608,.0666667),vec3(4.666667,1.666667,0.98039),color);
    color = mix(color,vec3(4.856,.5*(1.0+sin(2.5+.2*sin(iTime))),0.164706*sin(iTime)),r.x+length(q));
    color = mix(color,vec3(3.5*(1.0-sin(.1*iTime)),1.3+.32*(1.0+sin(0.5+.3*iTime)),1.0),length(r+q));
		color*=(3.24*f*f*f+3.8*f*f+2.9*f);
		color*=vec3(0.14+r+sin(iTime),0.7+q.y);
		color=pow(color, vec3(1.4));
    gl_FragColor = vec4(color,2.9);
}

`
var vert=`
//standard vertex shader
#ifdef GL_ES
      precision highp float;
    #endif
		#extension GL_OES_standard_derivatives : disable
    // attributes, in
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoord;
    attribute vec4 aVertexColor;

    // attributes, out
    varying vec3 var_vertPos;
    varying vec4 var_vertCol;
    varying vec3 var_vertNormal;
    varying vec2 var_vertTexCoord;
    
    // matrices
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);

      // just passing things through
      var_vertPos      = tan(aPosition);
      var_vertCol      = aVertexColor;
      var_vertNormal   = aNormal;
      var_vertTexCoord = aTexCoord;
    }
`;