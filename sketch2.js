var snake ; 
var scl = 50 ; 

var food ; 

var canvas ;


let img;
function preload() {
    img = loadImage('thaci.png');
    pes = loadImage('500.jpg');
}
function setup() {
  canvas = createCanvas(600, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
  frameRate(5);
  snake = new Snake();
  pickLocation();

}
function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);

}

function draw(){
  background(0,0,51,220);
  snake.update(); 
  snake.show(); 
  snake.death();
  image(pes, food.x, food.y, scl, scl/2);
  if(snake.eat(food)){
      pickLocation();
  }
  snake.showTotal(); 
}
function keyPressed(){
    if (keyCode === UP_ARROW){
        snake.dir(0,-1);
        snake.up(); 
    }
    else if (keyCode === DOWN_ARROW){
        snake.dir(0,1);
    }
    else if (keyCode === RIGHT_ARROW){
        snake.dir(1,0);
    }
    else if (keyCode === LEFT_ARROW){
            snake.dir(-1,0);  
             
    }
        
}

function Snake() {

    this.total = 0;
    this.tail = [] ; 
    this.dir = function(x,y){
        this.xspeed = x ; 
        this.yspeed = y ; 
    }
    this.x = 0 ; 
    this.y = 0 ; 
    this.xspeed = 1; 
    this.yspeed = 0; 
    
    this.update = function() {

        for (var i = 0; i <this.tail.length-1; i ++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.total-1] = createVector(this.x,this.y);
        for (var i = 0 ; i < this.total-1 ; i++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.total-1] = createVector(this.x , this.y);

        this.x = this.x + this.xspeed*scl;
        this.y = this.y + this.yspeed*scl; 

        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0 , height-scl);

       
    }
    this.eat = function(pos){
        var d = dist(this.x, this.y , pos.x, pos.y);
            if(d < 1){
                this.total ++ ; 
                return true ; 
            } else {
                return false 
            }
        }
    this.up = function(){
        this.rotate(radians(frameCount * 2  % 360));
    }

   this.show = function() {
    for(var i = 0 ; i < this.total; i++){
        image(img, this.tail[i].x, this.tail[i].y, scl, scl);
    }
    image(img, this.x, this.y, scl, scl);
   }
   this.death = function(){
       for(var i = 0 ; i < this.tail.length;i++){
           var pos = this.tail[i];
           var d = dist(this.x, this.y, pos.x , pos.y);
           if(d < 1){
               this.total = 0 ;
               this.tail = [] ;
           }
       }
       
   }
   this.showTotal = function(){
    var totali = this.total*500;
    textSize(32);
    text(totali, 10, 30);
    fill(255, 255, 255);
    text(totali, 10, 60);
    fill(0, 102, 153, 51);
    text(totali, 10, 90);
    fill(0, 102, 153, 51);
    let r = random(0,500)
    if(totali >= 100){    
    text('PRONTO!', r, r);
    
    }
   }

}
