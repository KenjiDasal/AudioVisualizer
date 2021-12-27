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