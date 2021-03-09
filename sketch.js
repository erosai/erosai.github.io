

var canvas; 
var w ;

function windowResized(){
  resizeCanvas(windowWidth/2,windowHeight/2);
  canvas.position(windowWidth/4,windowHeight/4,'fixed');
}

function setup() {
  canvas = createCanvas(windowWidth/2, windowHeight/2);
  canvas.position(windowWidth/4,windowHeight/4,'fixed');
  canvas.style('z-index','-1');
  w1 = new Wave(width/2, height/2, 1, 200, width);

 
} 

function draw() {
  background(255,255,255,255);
  w1.barwid = map(-1000, 0, width, 5, 1);
  w1.maxhei = map(-1000, 0, height, height, 1);
  w1.display();
}
//Wave Object
function Wave(x, y, barwid, maxhei, amount)
{
  
  this.x = x;
  this.y = y;
  
  this.maxhei = maxhei;
  this.amount = amount;
  this.barwid = barwid;
 
  rectMode(CENTER);
  
  this.display = function()
  {
	for(this.i=0; this.i<this.amount; this.i++)
    {
      
      this.time = millis()/10000;
      
      this.r = map(tan(this.time+this.i/90), 0, 1, 0, 255);
      this.g = map(tan(this.time+22.5+this.i/90), 0, 1, 0, 255);
      this.b = map(tan(this.time+45+this.i/90), 0, 1, 0, 255);
      fill(this.r, this.g, this.b);
      
      this.hei = map(tan(this.i/90 + this.time), -1, 1, 0, this.maxhei);
     
      strokeWeight(1);
      stroke(this.g, this.b, this.r);
   	  rect(this.x + this.i*this.barwid-this.amount*this.barwid/2, this.y, this.barwid+2, this.hei);
      
    }
  }

}



//this.time+this.i/90 for x 
//this.time+22.5+this.i/90 x