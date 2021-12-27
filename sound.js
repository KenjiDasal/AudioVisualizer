var x, y, p, alpha, color, fft, red, green, blue;;
let particles = [];
let angle = 0;
let angle2 = 0;
let angle3 = 0;
let amp;

let eq;

song = [];
let song_num = 1;

let img = [];
let image_num = 1;

let toggle1 = 0;
let toggle2 = 0;
let toggle3 = 0;
let toggle4 = 0;

let params = {
  vol: 100,
  volMin: 0,
  volMax: 100,

}

let gui;

function preload() {
    /*----------  SONGS  ----------*/
    song1 = loadSound('playlist/01.mp3');
    song2 = loadSound('playlist/02.mp3');
    song3 = loadSound('playlist/03.mp3');
    song4 = loadSound('playlist/04.mp3');

    /*----------  IMAGES  ----------*/
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
  fft = new p5.FFT(); 
  gui = createGui('Music settings');
  gui.addObject(params);

  Button1 = createButton('#1 - Enemy - Imagine Dragon ft. JID');
  Button2 = createButton('#2 - Playground - Bea Miller');
  Button3 = createButton('#3 - Misfit Toys - Pusha T & Mako');
  Button4 = createButton('#4 - Burn it all down - PVRIS ft. Denzel Curry');
  
}

function draw() {
    background(0);
    fft.analyze(); // analyzes the frequency of hte music and creates an array based on the frequency
    volume = params.vol/100 //im using the params to calculate the volume by dividing it by 100 and getting a decimal needed for the setVolume later
    var amp = fft.getEnergy(100, 250); //I set the amp to only show frequency between 100 and 250 this will be helpful making effects
    var bass = fft.getEnergy("bass"); //for Bass, Treble and Mid I used the same as amp but is looking for specific sounds -(Sadly this didnt help me on my work on adding effects)
    var treble = fft.getEnergy("treble"); 
    var mid = fft.getEnergy("mid");


     /*----------  BACKGROUND  ----------*/
     if (amp > 200 && image_num == 1 || amp > 200 && image_num == 3 || amp > 200 && image_num == 5 || amp > 200 && image_num == 7) {
        image_num++;
    }
    //this detects the amp and check for the image number if the amp goes above the required amp then the image_num goes up by 1 and changing the image for the song.

    if(amp <= 200){
        if (image_num ==2 || image_num == 4 || image_num == 6 || image_num == 8) {
          image_num --;
          console.log(image_num);
         }
    }
    //this is the oposite and it goes back to the original image for the song.
    
    push();
    if (amp > 200){
        rotate(random(-0.5, 0.5)); //also checks for the amp and it shakes the image by -0.5 to 0.5 when amp is greater
        console.log('shake');//used for detecting in the console
    }
    image(img[image_num], 0, 0, width + 100, height + 100); //this just shows the image based on (image_num, x, y, width, height) 
    pop();
    
    /*----------  VOLUME  ----------*/
    song1.setVolume(volume); //this sets the volume and changes it when the silder changes
    song2.setVolume(volume);
    song3.setVolume(volume);
    song4.setVolume(volume);

    // filter = new p5.BandPass();
    // song1.disconnect();
    // song1.connect(filter);
    

      /*----------  CONDITIONS  ----------*/  
      alpha = map(amp, 0, 255, 180, 150) //this is the opacity for the filter on top of the image to give the visualisers more light -{it changes based on the amp}
      fill(0, alpha)//Black filter and opacity set based on the map of the alpha
      noStroke();
      rect(0, 0, width, height);


    /*----------  STROKE COLOR  ----------*/
    if (image_num == 1 && amp < 200){ //these acts like the images but is changing the color of the stroke
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

   
    translate(width/2, height/2); //This translates (0, 0) of the screen to half of the given widht and height
    
    wave = fft.waveform(); //this returns an array of amplitude values (between -1.0 and +1.0) and represent a snapshot of amplitude readings in a single buffer.

    for ( t = -1; t <= 1; t += 2) { //I inputed any loops and the shape of the visualisers in here
    

    /*----------  MID  ----------*/
    beginShape();
    for( i = 0; i < 180; i += 0.5) {
         index = floor(map(i, 0, 180, 0, wave.length - 1)) // the indexes are calculating the floor value of the map in order to arrange the wave to form a circle for the upcoming equation
        //  floor(map(value, start1, stop1, start2, stop2))

        var r1Min = map(wave[index], -1, 1, 50, mid/2); // this is a range to make the Mid Visualiser have more fluid and more reactive behaviour than the other two
        var r1Max = map(wave[index], -1, 1, mid, 0);

        var r2Min = map(wave[index] / 2, -1, 1, mid, 50);
        var r2Max = map(wave[index], -1, 2, 0, mid/2);    

        var r1 = map(wave[index], -1, 1, r1Min+50, r1Max)// this is another maps that contains the ranges and will be added to the end
        var r2 = map(wave[index], -1, 1, r2Min, r2Max+50)

        r = r1 + r2

         x = r * -sin(i) * t
         y = r * cos(i)
        vertex(x, y)
    }
    endShape();

    /*----------  BASS  ----------*/
    // beginShape();
    // for( i = 0; i <= 180; i ++) {
    //      index = floor(map(i, 0, 180, 0, wave.length - 1))

    //      r = map(wave[index], -1, 3, bass, bass+75)

    //      x = r * sin(i) * t
    //      y = r * cos(i)
    //     vertex(x, y)
    // }
    // endShape();

    push();
    beginShape();
    for (i = 0; i <= 180 ; i++) {
      index = floor(map(i, 0, 180, 0, wave.length - 1)) //this is a version of the first but this is less responsive than the other two
      var r = map(wave[index], 0, 1, bass, bass); //only having to end with the base and wont have the same behaviour as the others
      var x = r*sin(i)*t; // not minus sin
      var y = r*cos(i);
      strokeWeight(1);

      if (image_num == 1 && amp < 200){ //this is here due to the nature of the opacity in stroke or fill 
        stroke(142, 184, 255, 70); // this only adds the opacity of the lines
      } else if (image_num == 2){
        stroke(255, 0, 255, 70);
      }
    
      if (image_num == 3 && amp < 200){
        stroke(169, 47, 64, 70);
      } else if (image_num == 4){
        stroke(46, 56, 242, 70);
      }

      if (image_num == 5 && amp < 200){
        stroke(255, 255, 255, 70);
      } else if (image_num == 6){
        stroke(57, 255, 20, 70);
      }

      if (image_num == 7 && amp < 200){
        stroke(0, 28, 112, 70);
      } else if (image_num == 8){
        stroke(107, 0, 189, 70);
      }

      line(0,0,x,y); //I used lines to show the bass of the music
    }
    endShape();
    pop();
    

    /*----------  TREBLE  ----------*/
    // beginShape();
    // for( i = 0; i <= 180; i ++) {
    //     index = floor(map(i, 0, 180, 0, wave.length - 1))

    //     r1 = map(wave[index], -1, 1, treble/2, 0)
    //     r2 = map(wave[index], -1, 1, 0, treble+50)

    //     r = r1 + r2        

    //     x = r * sin(i) * t
    //     y = r * cos(i)
    //     vertex(x, y)
    // }
    // endShape();

    

    let spectrum = fft.analyze(); // option of fft - returnes array of amplitude values (0 to 255) {this acts like the amp but ill be using it in a equation for the visualiser}

    push();
      beginShape();
      for (i = 0; i < 180; i++) { // 180 is number of dots going around
        var r = map(spectrum[i], 0, 180 , 150+treble, 200+treble);
        var x = r * -sin(i) * t;
        var y = r * cos(i);
        strokeWeight(4);
        point(x, y); //this will onlyp displays dots
      }
      endShape();
    pop();

    /*---------- ROTORS  ----------*/

    beginShape(); // the rotors is just here to add some rotating factors in my projects
    
    push();
    rotate(angle);
    strokeWeight(5);
    arc(0, 0, 25, 25, 100, -50);
    if(amp > 200){//when the amp goes over 200 the speed of the rotors increases but slows down when bellow
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
    
    /*---------- PARTICLES  ----------*/
    
    p = new Particle(); //for my particle system im using vector2d to project the particles in a random point in a circle
    particles.push(p)

    for (var i = 0; i < particles.length; i++){
        particles[i].update(amp > 200); // this notifies the particle system to update if amp is over 200
        particles[i].show()
    }


    /*---------- BUTTONS  ----------*/
    Button1.position(50, windowHeight-50); // position of the button
    Button1.mousePressed(Pressed1); //when the button is pressed it calls the Pressed1() function

    Button2.position(220, windowHeight-50);
    Button2.mousePressed(Pressed2);

    Button3.position(357, windowHeight-50);
    Button3.mousePressed(Pressed3);

    Button4.position(517, windowHeight-50);
    Button4.mousePressed(Pressed4);
    

}


  function Pressed1(){
    if (toggle1 = 1) { // im using numbers instead of boolean values due to it being more faster and dont require the button to be double clicked
      song = song1; //this picks the song
      image_num = 1;//this replaces the main image
      console.log(image_num)
      if(song3.isPlaying()){//this stops other songs
        song3.stop();
      }
      if(song4.isPlaying()){
        song4.stop();
      }
      if(song2.isPlaying()){
        song2.stop();
      }
      if(!song.isPlaying()){//this detects if the song is not playing and it plays it
        song.play();
        console.log('isPlaying')
      }else{// it will pause the song if the song is playing when clicked again
        song.pause();
        console.log('isPaused')
      }
      toggle1 = 0;
    } else {
      toggle1 = 1;
    }

  }
  function Pressed2(){
    if (toggle2 = 1) {
      console.log('pressed');
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
      console.log(song, 'isPlaying');
    }else{
      song.pause();
      console.log('isPaused')
    }
      toggle2 = 0;
    } else {
      toggle2 = 1;
    }
  }
  function Pressed3(){
    if (toggle3 = 1) {
      console.log('pressed');
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
      toggle3 = 0;
    } else {
      toggle3 = 1;
    }
  }
  function Pressed4(){
    if (toggle4 = 1) {
      console.log('pressed');
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
      toggle4 = 0;
    } else {
      toggle4 = 1;
    }
  }

  
  
  
function keyPressed() {
    if(keyCode === 49){
     Pressed1();
    }
    if(keyCode === 50){
      Pressed2();
    }
  
    if(keyCode === 51){
      Pressed3();
    }
    if(keyCode === 52){
     Pressed4();
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
