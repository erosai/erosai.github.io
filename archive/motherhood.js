let angle = 0 ; 
let oldX = width/2 ; 
let oldY = height / 2;



function setup(){
    pixelDensity(2.0);
    createCanvas(864, 1080, WEBGL);
    background(0);
}

function draw(){

    translate(width/2,height/2);
    spiral();

}

function spiral(){
    
    for(let i= 0 ; i<size ; i++){
        newAngle = (angle/10) * i ;
        x = (widht/2) + (spiralWidth * newAngle) * Math.sin(newAngle);
        y = (height/2) + (spiralWidht * newAngle) * Math.cos(newAngle);


        line(oldX,oldY , x , y );
        oldX = x ; 
        oldY = y ; 
    }
 
}