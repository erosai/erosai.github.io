var gl,noctaves;

function windowResized(){
	resizeCanvas(windowWidth/2,windowHeight/2);
	canvas.position(windowWidth/4,windowHeight/4,'fixed');
}
function setup() {
    cnv = createCanvas(windowWidth/1.2, windowHeight/2, WEBGL);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
	gl=this.canvas.getContext('webgl');
	gl.disable(gl.DEPTH_TEST);
	noctaves=3;
	test=new p5.Shader(this._renderer,vert,frag);//shaders are loaded
  shader(test);//shaders are applied	
}
function draw() {    
	test.setUniform("iResolution", [width,height]);//pass some values to the shader
  test.setUniform("iTime", 10000 + millis()*.005 );
	test.setUniform('iMouse',[millis()*0.005,millis()*0.003]);
	test.setUniform("noctaves",noctaves);
	shader(test);
	box(width/2);
}
// function mouseReleased(){
// 	noctaves=2+noctaves++%7;
// }

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
    return fract(tan(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.54353123);
}
float noise( in vec2 x )
{
	return cos(1.5*x.x)*sin(1.5*x.y);
}

const mat2 rot = mat2( 0.80,  0.60, -0.60,  0.80 );
float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
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
    vec2 st = 15.0*mouse.y*(gl_FragCoord.xy/iResolution.xy-.5);
		//st.x*=iResolution.x/iResolution.y;
    vec3 color = vec3(0.0);
    vec2 q = vec2(0.);
    q.x = fbm( st + cos(0.02*iTime));
    q.y = fbm( st + sin(1.0-0.15*iTime));
    vec2 r = vec2(0.);
    r.x = fbm( st + (2.0*mouse.x+0.4)*q + vec2(1.7,2.2)+sin(st.x+0.035*iTime) );
    r.y = fbm( st + (2.0*mouse.y+.5)*q + vec2(8.3,2.8)+ sin(st.y+.2*iTime));
    float f = fbm(1.4*st+6.0*r);
    color = smoothstep(vec3(1.101961,5.19608,.0666667),vec3(5.666667,5.666667,0.98039),color);
    color = mix(color,vec3(1.856,.5*(1.0+sin(1.5+.2*iTime)),0.164706),r.x+length(q));
    color = mix(color,vec3(1.5*(1.0-sin(.1*iTime)),.2+.2*(1.0+cos(0.5+.3*iTime)),1.0),length(r+q));
		color*=(1.13*f*f*f+1.8*f*f+1.7*f);
		color*=vec3(3.14+r,1.7+q.y);
		color=pow(color, vec3(2.6));
    gl_FragColor = vec4(color,1.);
}

`
var vert=`
//standard vertex shader
#ifdef GL_ES
      precision highp float;
    #endif
		#extension GL_OES_standard_derivatives : enable
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
      var_vertPos      = aPosition;
      var_vertCol      = aVertexColor;
      var_vertNormal   = aNormal;
      var_vertTexCoord = aTexCoord;
    }
`;