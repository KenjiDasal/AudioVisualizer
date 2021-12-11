let song, song1, song2, song3, song4;
let img = [];
let amp = 0;
let image_num = 1;

function preload(){
  song1 = loadSound('playlist/01.mp3');
  song2 = loadSound('playlist/02.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    console.log('song number is ', song);
}



function draw() {
    background(127)
    strokeWeight(10)
    if (amp > 200 && image_num == 1 || amp > 200 && image_num == 3) {
      image_num++;
  }
  if(amp <= 200){
      if (image_num ==2 || image_num == 4 || image_num == 5) {
        image_num --;
        console.log(image_num);
       }
  }

  if (image_num == 1 && amp < 200){
    stroke(0, 0, 255);
    console.log('original')
  } else if (image_num == 2){
    stroke(255, 0, 255);
    console.log('changed')
  }

  if (image_num == 3 && amp < 200){
    stroke(255, 0, 0);
    console.log('original');
  } else if (image_num == 4){
    stroke(255, 255, 0);
    console.log('changed');
  }

  rect(0, 0, 100, 100)
  
  
}

function keyPressed() {
  if(keyCode === 49){
    song = song1;
    image_num = 1;
    console.log(image_num)
    if(song.isPlaying()){
      song.stop();
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
    if(song.isPlaying()){
      song.stop();
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
    amp = 210;
    console.log(amp);
  } 
  if(keyCode === 53){
    amp = 0;
    console.log(amp);
  }
}
  