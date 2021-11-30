var x, y, p, alpha, color;
let particles = [];
let angle = 0;
let angle2 = 0;
let angle3 = 0;
let img;
let song;
let fft;

function preload() {
    img = loadImage('arcane1.jpg');
    img = loadImage('arcane2.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  song = loadSound('02.mp3');
  img = loadImage('arcane1.jpg');
  background(0);
  fft = new p5.FFT()

  img.filter(BLUR, 4);
}

function draw() {
    background(0);
    fft.analyze();
    amp = fft.getEnergy(20, 200);


    push();
    image(img, 0, 0, width + 100, height + 100);
    if (amp > 200){
        rotate(random(-0.5, 0.5));
    }
    
    pop();


    
    alpha = map(amp, 0, 255, 180, 150)
    fill(0, alpha)
    noStroke();
    rect(0, 0, width, height);


    stroke(142, 184, 255);
    strokeWeight(3);
    noFill();
    img = loadImage('arcane1.jpg');

    translate(width/2, height/2);
    
    wave = fft.waveform();

    for ( t = -1; t <= 1; t += 2) {
    if (amp > 200) {
        img = loadImage('arcane2.jpg');
        stroke(255, 120, 254);
        
    }
    beginShape();
    for( i = 0; i <= 180; i ++) {
         index = floor(map(i, 0, 180, 0, wave.length - 1))

        var r1Min = map(wave[index], -1, 1, 50 ,100);
        var r1Max = map(wave[index], -1, 1, 100, 0);

        var r2Min = map(wave[index] / 2, -1, 1, 100, 50);
        var r2Max = map(wave[index], -1, 1, 0, 100);

        var r1 = map(wave[index], -1, 1, r1Min+75, r1Max)
        var r2 = map(wave[index], -1, 1, r2Min, r2Max+350)

        r = r1 + r2

         x = r * sin(i) * t
         y = r * cos(i)
        vertex(x, y)
    }
    endShape();

    beginShape();
    for( i = 0; i <= 180; i ++) {
         index = floor(map(i, 0, 180, 0, wave.length - 1))

         r = map(wave[index], -1, 1, amp*2, amp+350)

         x = r * sin(i) * t
         y = r * cos(i)
        vertex(x, y)
    }
    endShape();
    }

    beginShape();
    
    push();
    rotate(angle);
    strokeWeight(10);
    arc(0, 0, 250, 250, 100, -50);
    if(amp > 200){
        angle += 5;
    }
    angle+=1;
    pop();
    endShape();

    push();
    strokeWeight(5);
    rotate(angle2);
    strokeWeight(5);
    arc(0, 0, 500, 500, 0, 100);
    if(amp > 200){
        angle2 -= 3;
    }
    angle2 -=1;
    pop();
    endShape();

    beginShape();
    push();
    rotate(angle3);
    strokeWeight(25);
    arc(0, 0, 600, 600, -150, 0);
    if(amp > 200){
        angle3 += 4;
    }
    angle3 +=1;
    pop();
    endShape();
    
    
    

    p = new Particle()
    particles.push(p)

    for (var i = 0; i < particles.length; i++){
        particles[i].update(amp > 200);
        particles[i].show()
    }
}

function keyPressed() {
    if(keyCode === ENTER){
      if (song.isPlaying()) {
          song.pause();
          } else {
          song.play();
          }
      }
  }




  class Particle{
    constructor(){
        this.pos = p5.Vector.random2D().mult(250);
        this.vel = createVector(0,0);
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

        this.w = random(3,5);
    }

    update(cond){
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if(cond){
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)

        }
    }

    show(){
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
    }
}