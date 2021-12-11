var x, y, p, alpha, color, fft, red, green, blue;;
let particles = [];
let angle = 0;
let angle2 = 0;
let angle3 = 0;
let amp;

song = [];
let song_num = 1;

let img = [];
let image_num = 1;

function preload() {

    song1 = loadSound('playlist/01.mp3');
    song2 = loadSound('playlist/02.mp3');


    img[1] = loadImage('images/arcane1.jpg');
    img[2] = loadImage('images/arcane2.jpg');
    img[3] = loadImage('images/vi.jpg');
    img[4] = loadImage('images/vi2.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  background(0);
  fft = new p5.FFT()
}

function draw() {
    background(0);
    fft.analyze();
    var amp = fft.getEnergy(100, 250);
    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy(100, 150);
    var mid = fft.getEnergy("mid");
     /*----------  BACKGROUND  ----------*/
     if (amp > 200 && image_num == 1 || amp > 200 && image_num == 3) {
        image_num++;
    }
    if(amp <= 200){
        if (image_num ==2 || image_num == 4 || image_num == 5) {
          image_num --;
          console.log(image_num);
         }
    }

    

    push();
    image(img[image_num], 0, 0, width + 100, height + 100);
    if (amp > 200){
        rotate(random(-0.5, 0.5));
    }
    pop();


    
    alpha = map(amp, 0, 255, 180, 150)
    fill(0, alpha)
    noStroke();
    rect(0, 0, width, height);


    /*----------  STROKE COLOR  ----------*/
    if (image_num == 1 && amp < 200){
        stroke(142, 184, 255);
      } else if (image_num == 2){
        stroke(255, 0, 255);
      }
    
      if (image_num == 3 && amp < 200){
        stroke(169, 47, 64);
      } else if (image_num == 4){
        stroke(46, 56, 242);
      }
    strokeWeight(3);
    noFill();

   
    translate(width/2, height/2);
    
    wave = fft.waveform();

    for ( t = -1; t <= 1; t += 2) {
    

    /*----------  NORMAL  ----------*/
    beginShape();
    for( i = 0; i <= 180; i ++) {
         index = floor(map(i, 0, 180, 0, wave.length - 1))

        var r1Min = map(wave[index], -1, 1, 50 ,mid);
        var r1Max = map(wave[index], -1, 1, mid, 0);

        var r2Min = map(wave[index] / 2, -1, 1, mid, 50);
        var r2Max = map(wave[index], -1, 1, 0, mid);    

        var r1 = map(wave[index], -1, 1, r1Min+50, r1Max)
        var r2 = map(wave[index], -1, 1, r2Min, r2Max+50)

        r = r1*2 + r2

         x = r * sin(i) * t
         y = r * cos(i)
        vertex(x, y)
    }
    endShape();

    /*----------  BASS  ----------*/
    beginShape();
    for( i = 0; i <= 180; i ++) {
         index = floor(map(i, 0, 180, 0, wave.length - 1))

         r = map(wave[index], -1, 1, bass*2, bass+150)

         x = r * sin(i) * t
         y = r * cos(i)
        vertex(x, y)
    }
    endShape();

    /*----------  TREBLE  ----------*/
    beginShape();
    for( i = 0; i <= 180; i ++) {
        index = floor(map(i, 0, 180, 0, wave.length - 1))

        r = map(wave[index], -1, 1, treble*3, treble+75)

        x = r * sin(i) * t
        y = r * cos(i)
        vertex(x, y)
    }
    endShape();

    /*---------- ROTORS  ----------*/

    beginShape();
    
    push();
    rotate(angle);
    strokeWeight(10);
    arc(0, 0, 25, 25, 100, -50);
    if(amp > 200){
        if(mid > 100){
            angle += 5;
        }
        }
    angle+=1;
    pop();
    endShape();

    push();
    strokeWeight(5);
    rotate(angle2);
    strokeWeight(5);
    arc(0, 0, 50, 50, 100, -50);
    if(amp > 200){
    if(mid > 100){
        angle2 -= 3;
    }
    }
    angle2 -=1;
    pop();
    endShape();

    beginShape();
    push();
    rotate(angle3);
    strokeWeight(15);
    arc(0, 0, 75, 75, -150, 0);
    if(amp > 200){
        if(mid > 100){
            angle3 += 4;
        }
        }
    angle3 +=1;
    pop();
    endShape();
    }
    
    
    

    
    
    

    p = new Particle()
    particles.push(p)

    for (var i = 0; i < particles.length; i++){
        particles[i].update(amp > 200);
        particles[i].show()
    }
}

function keyPressed() {
    if(keyCode === 49){
      song = song1;
      image_num = 1;
      console.log(image_num)
      if(song2.isPlaying()){
        song2.stop();
      }
      if(!song.isPlaying()){
      song.play();
      console.log('isPlaying')
    }else{
      song.pause();
      console.log('isPaused')
    }
    }
    if(keyCode === 50){
      song = song2;
      image_num = 3;
      console.log(image_num)
      if(song1.isPlaying()){
        song1.stop();
      }
      if(!song.isPlaying()){
      song.play();
      console.log('isPlaying')
      console.log(song)
    }else{
      song.pause();
      console.log('isPaused')
    }
    }
  
    if(keyCode === ENTER){
      if(!song.isPlaying()){
        song.play();
        console.log('isPlaying')
      }else{
        song.pause();
        console.log('isPaused')
      }
    }
  }




  class Particle{
    constructor(){
        this.pos = p5.Vector.random2D().mult(125);
        this.speed = createVector(0,0);
        this.start = this.pos.copy().mult(random(0.0001, 0.00001));
        this.w = random(3,5);
    }

    update(cond){
        this.speed.add(this.start)
        this.pos.add(this.speed)

        if (image_num == 1){
            fill(142, 184, 255);
          }
          if (image_num == 3){
            fill(169, 47, 64);
          } 
        
        this.size = 4;
        if(cond){
            this.pos.add(this.speed)
            this.pos.add(this.speed)
            this.pos.add(this.speed)
            this.size = 8;

            if (image_num == 2){
                fill(255, 0, 255);
              }
            
            if (image_num == 4){
                fill(46, 56, 242);
              }
        }
    }

    show(){
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}