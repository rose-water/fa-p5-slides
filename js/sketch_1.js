// NOTE: Not my code!
// Code author: Val Head
// https://codepen.io/valhead/pen/NABYow?editors=0010
var offsetAngle = 0;
var particle;
var particles = [];
var ctx;

function setup() {
  ctx = createCanvas(windowWidth, windowHeight);  
  colorMode(HSB, 100);
  blendMode(ADD);
  noStroke();
  background(0,0,0);  
  // ctx.parent('example-1');
}

function draw() {
  // push();
  // translate(mouseX/2, mouseY);
  clear();
  background(0,0,0);  
  offsetAngle += 0.05;
  
  if (mouseX > 0 && mouseY > 0) {
    makeParticles(2, mouseX, mouseY);
  } else {
    makeParticles(2, width/2, height/2)
  }

  for (i=0; i<particles.length; i++) {
    var p = particles[i];
    p.render();
    p.update();
  }
  
	while(particles.length > 1000) {
    particles.shift();
  }
  // pop();
}

function makeParticles(pcount, mx, my) {
  // print("make particles " + pcount);
  for(var i=0; i<pcount;i++) {
    var p = new Particle(mx, my, random(35,95));
    
    var angle = PI + random(-PI,PI);
    var speed = random(4,8);
    
    p.velX = sin(angle)*speed;
    p.velY = cos(angle)*speed;
    
    p.size = random(8,18);
    
    particles.push(p);
  }
}

function Particle(x, y, h) {
  this.posX = x; 
	this.posY = y; 
	this.velX = 0; 
	this.velY = 0; 
	this.shrink = .95; 
	this.size = 1; 	
	this.drag = 0.9; 
	this.gravity = 0.2; 
  this.hue = h;
  
  this.update = function() {
    this.velX *= this.drag; 
    this.velY *= this.drag;
    
    this.velY += this.gravity; 
    
    this.posX += this.velX;
    this.posY += this.velY; 
    
    this.size *= this.shrink;
    this.alpha -= this.fade; 	 
  };
  
  this.render = function() {
    fill(this.hue, 100, 100);
    ellipse(this.posX, this.posY, this.size);
	};
	
  
}