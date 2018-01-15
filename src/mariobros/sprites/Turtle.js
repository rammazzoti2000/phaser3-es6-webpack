import Enemy from './Enemy';

export default class Turtle extends Enemy {
  constructor(config) {
    super(config);
    this.flipX = true;
    this.anims.play('turtle');
    this.body.height = 32;
    this.sliding = false;
    this.type = "turtle";
   // return this;
  }

  update() {
    if(!this.activated()){
      return;
    }

  
    if(this.sliding) {
      this.scene.physics.world.collide(this, this.scene.groundLayer, this.scene.callback);
      this.scene.physics.world.overlap(this, this.scene.updateLoop, this.slidekill);
    }
    else {
      this.scene.physics.world.collide(this, this.scene.groundLayer);     
    }
 
    this.scene.physics.world.overlap(this, this.scene.mario, this.marioHit);

    if (this.body.velocity.x === 0) {
      this.direction = -this.direction;
      this.body.velocity.x = this.direction;
      this.flipX = this.direction < 0;
    }

  }

  slidekill(turtle, victim){
    if(typeof victim.starKilled !== "undefined"){
      victim.starKilled();
    }
  }

  marioHit(enemy, mario) {
    // direction
    // den av overlap x or overlap y som är störst
    //let verticalHit = Math.abs(enemy.x-mario.x)<Math.abs(enemy.y-mario.y);
    
   // console.log("vertical",verticalHit);
    if(mario.star.active){
      enemy.hurtMario(enemy, mario);
      return;
    } 


    if (enemy.verticalHit(enemy,mario)){
      if(!enemy.sliding || (enemy.sliding && enemy.body.velocity.x===0)) {
        //enemy.body.height = 16;
        enemy.direction = 150;
        enemy.body.velocity.x = 150;
        enemy.sliding = true;
        enemy.play("turtleShell");
      }
      else {
        enemy.direction = 0;
        enemy.body.velocity.x = 0;
        enemy.sliding = true;
        enemy.play("turtleShell");
      }
      mario.enemyBounce();
    }
    else {
      if(enemy.sliding && enemy.body.velocity.x === 0){
        enemy.direction = 150;
        enemy.body.velocity.x = 150;
      }
      else {
        enemy.hurtMario(enemy, mario);
      }
    }


  }
}
