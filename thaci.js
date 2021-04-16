var cnv ;
var count = 0 ; 

function preload() {
    thaci01 = loadImage('/assets/thaci01.png');
    thaci02 = loadImage('/assets/thaci02.png');
    thaci03 = loadImage('/assets/thaci03.png');
}

function setup(){

    cnv = createCanvas(windowWidth/2, windowHeight/2);
    cnv.position(windowWidth/4,windowHeight/4);
    frameRate(10);
}

function draw(){
    background(255);
    textSize(32);
    // if(count === 0 ){
    // text("Press mouse to put mask on",30 ,30);
    
    // }
    
    if(count % 3 === 0){
        image(thaci01 , width/4 , height/4, width/2 , height/2);
      
    }
    if(count % 3 === 1){
        image(thaci02 , width/4 , height/4, width/2 , height/2);
        
    }
    if(count % 3 === 2){
        
        
        for(var i = 0 ; i < width ; i +=width/8 ){
            for(var j = 20 ; j < height ; j += height/8){
            var rnd = random(10,40);
            var rend = random (0 , height);
            var rond = random (0 , width ); 
            textSize(width/40);
            push();
         
            fill(rnd *2  + (100 * noise(millis())), rnd * 2 +(100 * noise(millis())) , rnd * 3 +(100 * noise(millis())));
            translate(i , j);
            text('PRONTO ! ' , 10 , 10 );
            pop();
         }
        }
        image(thaci03 , width/4 , height/4, width/2 , height/2);
    }
    
}

function mousePressed(){
    count++ ; 
    
}
