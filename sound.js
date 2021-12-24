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
    song3 = loadSound('playlist/03.mp3');
    song4 = loadSound('playlist/04.mp3');


    img[1] = loadImage('images/arcane1.jpg');
    img[2] = loadImage('images/arcane2.jpg');
    img[3] = loadImage('images/vi.jpg');
    img[4] = loadImage('images/vi2.jpg');
    img[5] = loadImage('images/ekko2.jpg');
    img[6] = loadImage('images/ekko.jpg');
    img[7] = loadImage('images/caitlyn2.jpg');
    img[8] = loadImage('images/caitlyn.jpg');
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
     if (amp > 200 && image_num == 1 || amp > 200 && image_num == 3 || amp > 200 && image_num == 5 || amp > 200 && image_num == 7) {
        image_num++;
    }
    if(amp <= 200){
        if (image_num ==2 || image_num == 4 || image_num == 6 || image_num == 8) {
          image_num --;
          console.log(image_num);
         }
    }

    
    push();
    if (amp > 200){
        rotate(random(-0.5, 0.5));
        console.log('shake');
    }
    image(img[image_num], 0, 0, width + 100, height + 100);
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

      if (image_num == 5 && amp < 200){
        stroke(255, 255, 255);
      } else if (image_num == 6){
        stroke(57, 255, 20);
      }

      if (image_num == 7 && amp < 200){
        stroke(0, 28, 112);
      } else if (image_num == 8){
        stroke(107, 0, 189);
      }
    strokeWeight(3);
    noFill();

   
    translate(width/2, height/2);
    
    wave = fft.waveform();

    for ( t = -1; t <= 1; t += 2) {
    

    /*----------  MID  ----------*/
    beginShape();
    for( i = 0; i <= 180; i ++) {
         index = floor(map(i, 0, 180, 0, wave.length - 1))

        var r1Min = map(wave[index], -1, 1, 50, mid/2);
        var r1Max = map(wave[index], -1, 1, mid, 0);

        var r2Min = map(wave[index] / 2, -1, 1, mid, 50);
        var r2Max = map(wave[index], -1, 1, 0, mid/2);    

        var r1 = map(wave[index], -1, 1, r1Min+50, r1Max)
        var r2 = map(wave[index], -1, 1, r2Min, r2Max+50)

        r = r1 + r2

         x = r * sin(i) * t
         y = r * cos(i)
        vertex(x, y)
    }
    endShape();

    /*----------  BASS  ----------*/
    beginShape();
    for( i = 0; i <= 180; i ++) {
         index = floor(map(i, 0, 180, 0, wave.length - 1))

         r = map(wave[index], -1, 3, bass, bass+75)

         x = r * sin(i) * t
         y = r * cos(i)
        vertex(x, y)
    }
    endShape();

    /*----------  TREBLE  ----------*/
    beginShape();
    for( i = 0; i <= 180; i ++) {
        index = floor(map(i, 0, 180, 0, wave.length - 1))

        r1 = map(wave[index], -1, 1, treble/2, 0)
        r2 = map(wave[index], -1, 1, 0, treble+50)

        r = r1 + r2        

        x = r * sin(i) * t
        y = r * cos(i)
        vertex(x, y)
    }
    endShape();

    /*---------- ROTORS  ----------*/

    beginShape();
    
    push();
    rotate(angle);
    strokeWeight(5);
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
    strokeWeight(2);
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
    strokeWeight(10);
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
      if(song3.isPlaying()){
        song3.stop();
      }
      if(song2.isPlaying()){
        song2.stop();
      }
      if(song4.isPlaying()){
        song4.stop();
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
      if(song3.isPlaying()){
        song3.stop();
      }
      if(song4.isPlaying()){
        song4.stop();
      }
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
  
    if(keyCode === 51){
      song = song3;
      image_num = 5;
      console.log(image_num)
      if(song4.isPlaying()){
        song4.stop();
      }
      if(song2.isPlaying()){
        song2.stop();
      }
      if(song1.isPlaying()){
        song1.stop();
      }
      if(!song.isPlaying()){
      song.play();
      console.log('isPlaying')
    }else{
      song.pause();
      console.log('isPaused')
    }
    }
    if(keyCode === 52){
      song = song4;
      image_num = 7;
      console.log(image_num)
      if(song3.isPlaying()){
        song3.stop();
      }
      if(song2.isPlaying()){
        song2.stop();
      }
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
        this.pos = p5.Vector.random2D().mult(50);
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

          if (image_num == 5){
            fill(255, 255, 255);
          } 

          if (image_num == 7){
            fill(0, 28, 112);
          } 
        
        this.size = 3;
        if(cond){
            this.pos.add(this.speed)
            this.pos.add(this.speed)
            this.pos.add(this.speed)
            this.size = 6;

            if (image_num == 2){
                fill(255, 0, 255);
              }
            
            if (image_num == 4){
                fill(46, 56, 242);
              }

            if (image_num == 6){
              fill(57, 255, 20);
            }

            if (image_num == 8){
              fill(107, 0, 189);
            }
        }
    }

    show(){
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}