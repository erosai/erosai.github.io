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
        redraw();
    }
    if(count % 3 === 1){
        image(thaci02 , width/4 , height/4, width/2 , height/2);
        redraw();
    }
    if(count % 3 === 2){
        image(thaci03 , width/4 , height/4, width/2 , height/2);
        redraw();
        for(var i = 0 ; i < 100 ; i +=10 ){
            var rnd = random(10,40);
            var rend = random (0 , height);
            var rond = random (0 , width ); 
            textSize(rnd);
            push();
            textStyle('z-index' , '-2');
            fill(rnd * 3, rnd* 4 , rnd* 5);
            translate(rond - 10  , rend - 10);
            text('PRONTO ! ' , rnd , rnd );
            pop();
        }
    }
    
}

function mousePressed(){
    count++ ; 
    
}
