var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girl_running, girl_collided;
var obstaclesGroup, obstacle1;
var score=0;
var gameOver, restart;
var invisibleGround;



function preload(){
  girl_running =   loadAnimation("scared girl.jpg");
  girl_collided = loadAnimation("Dead girl.jpg");
  
  obstacle1 = loadImage("rock.jpg");
  groundImage = loadImage("Invis ground.png");
  
  gameOverImg = loadImage("Game over.jpg");
  restartImg = loadImage("Restart.jpg");
}

function setup() {
  createCanvas(700, 600);
  
  girl = createSprite(50,height-30,20,50);
  
  girl.loadImage( "scared girl.jpg");
  girl.scale = 3.5;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  girl.debug = true;
  background("background.jpg");
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space")||touches.length > 0 && girl.y >= 159) {
      girl.velocityY = -12;
      touches= []
    }
  
    girl.velocityY = girl.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    girl.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(girl)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
  
    ground.velocityX = 0;
    girl.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)|| touches.length> 0) {
      reset();
      touches= []
    }
  }
  
  
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(width,height-60,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
  
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;

      default: break;
    }
    
            
    obstacle.scale = 1.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
   
  score = 0;
  
}