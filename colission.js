const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;


// ---------------------------
// CARGA DE IMÁGENES
// ---------------------------

const ballImg = new Image();
ballImg.src = "img/ball.png";

const backgroundImg = new Image();
backgroundImg.src = "img/wallpaper.webp";


// ---------------------------

let objects = [];
let totalObjects = 20;
let contador = 0;


// ---------------------------
// CLASE OBJETO
// ---------------------------

class FallingObject{

constructor(x,y,size,speed){

this.posX = x;
this.posY = y;

this.size = size;

this.baseSpeed = speed;
this.speed = speed;

}

draw(){

ctx.drawImage(ballImg,this.posX,this.posY,this.size,this.size);

}

update(){

this.posY += this.speed;

if(this.posY > window_height){
this.reset();
}

this.draw();

}

reset(){

this.posY = -this.size;
this.posX = Math.random()*(window_width-this.size);

}

clicked(mx,my){

return (
mx > this.posX &&
mx < this.posX + this.size &&
my > this.posY &&
my < this.posY + this.size
);

}

}


// ---------------------------
// GENERAR OBJETOS
// ---------------------------

function generateObjects(){

for(let i=0;i<totalObjects;i++){

// tamaño aleatorio +20%
let size = (Math.random()*40 + 30) * 1.7;

let x = Math.random()*(window_width-size);
let y = Math.random()*-window_height;

let speed = Math.random()*2 + 1;

objects.push(new FallingObject(x,y,size,speed));

}

}


// ---------------------------
// DETECCIÓN DE CLICK
// ---------------------------

canvas.addEventListener("click",function(event){

const rect = canvas.getBoundingClientRect();

const mouseX = event.clientX - rect.left;
const mouseY = event.clientY - rect.top;

objects.forEach(obj=>{

if(obj.clicked(mouseX,mouseY)){

contador++;
obj.reset();

}

});

});


// ---------------------------
// AUMENTO DE VELOCIDAD
// ---------------------------

function updateSpeed(){

let multiplier = 1;

if(contador > 15){

multiplier = 2.2;

}else if(contador > 10){

multiplier = 1.5;

}

objects.forEach(obj=>{
obj.speed = obj.baseSpeed * multiplier;
});

}


// ---------------------------
// CONTADOR
// ---------------------------

function drawScore(){

let text = "Objetos eliminados: " + contador;

ctx.font = "bold 40px Arial";
ctx.textAlign = "right";
ctx.textBaseline = "top";

// sombra
ctx.shadowColor = "rgba(0,0,0,0.8)";
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 3;
ctx.shadowOffsetY = 3;

// relleno
ctx.fillStyle = "#ffffff";
ctx.fillText(text, window_width - 30, 30);

// borde
ctx.lineWidth = 3;
ctx.strokeStyle = "#000000";
ctx.strokeText(text, window_width - 30, 30);

// reset sombra para no afectar otros dibujos
ctx.shadowBlur = 0;

}


// ---------------------------
// FONDO + OVERLAY GRADIENTE
// ---------------------------

function drawBackground(){

// imagen wallpaper
ctx.drawImage(backgroundImg,0,0,window_width,window_height);

// overlay oscuro (fade)
let gradient = ctx.createLinearGradient(0,0,0,window_height);

gradient.addColorStop(0,"rgba(0,0,0,0.7)");
gradient.addColorStop(0.5,"rgba(0,0,0,0.4)");
gradient.addColorStop(1,"rgba(0,0,0,0.7)");

ctx.fillStyle = gradient;
ctx.fillRect(0,0,window_width,window_height);

}


// ---------------------------
// ANIMACIÓN
// ---------------------------

function animate(){

drawBackground();

updateSpeed();

objects.forEach(obj=>{
obj.update();
});

drawScore();

requestAnimationFrame(animate);

}


// ---------------------------

generateObjects();
animate();  