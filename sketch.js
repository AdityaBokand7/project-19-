var PLAY = 1;
var END = 0;
var gameState = PLAY;
var player, player_running, player_collided;
var ground,invisibleGround, groundImage;
var gameOver;
var restart;
var bananasGroup, bananasImage;
var stonesGroup,stonesImage
var gameOver,gameOverImg;
var restart,restartImg;
var count;
var score;


function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  player_collided = loadImage("Monkey_01.png");
  
  groundImage = loadImage("jungle.jpg");
  
  bananasImage = loadImage("banana.png");
  
  obstacles = loadImage("stone.png");
 
  
  gameOverImg = loadImage("gameOver.jpg");
  restartImg = loadImage("restart.png")
}

function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -7
  
  invisibleGround = createSprite(200,345,400,10);
  invisibleGround.visible = false;
  
  player = createSprite(50,175,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.15;
  
  gameOver = createSprite(230,150,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.3;
  gameOver.visible = false;
  
  restart = createSprite(230,230,20,20);
  restart.addImage (restartImg); 
  restart.scale = 0.2;
  restart.visible = false;
  
  bananasGroup = new Group();
  stonesGroup = new Group();
  
  score = 0;
  count = 0;
}

function draw() {
  background(180);

  if(gameState===PLAY){
   
  if(keyDown("space")) {
  player.velocityY = -10;
  }
  
  player.velocityY = player.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
   spawnStones();
   spawnBananas();
    
  if(bananasGroup.isTouching(player)){   
      score = score + 1;
    
    bananasGroup.destroyEach();
        
    switch(score) {
      case 10:player.scale = 0.17;
              break;
      case 20: player.scale = 0.19;
              break;
      case 30: player.scale = 0.21;
              break;
      case 40: player.scale = 0.23
              break;
      
           default: break;
    
    }

    }
  
if(player.isTouching(stonesGroup)){
         
      if(count===0){
          
      stonesGroup.destroyEach();
      player.scale = 0.10;
      count = 1;
        
        } 
      else   if (count===1){
      gameState = END;
      
    }
}   
  }
  
  else if (gameState===END){
   gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    player.velocityY = 0;
    stonesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    
    
    
    bananasGroup.setLifetimeEach(-1);
    stonesGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(restart)){
  reset();
  }
  
  }
  
  player .collide(invisibleGround);
  drawSprites(); 
  
textSize(25)
text("SCORE:"+score,150,50);

}
function reset(){
  gameState = PLAY;
  
   ground.x = ground.width /2;
  ground.velocityX = -7
  
  gameOver.visible = false;
  restart.visible = false;
  
  stonesGroup.destroyEach();
  bananasGroup.destroyEach();
  
  player.changeAnimation("running",player_running);
  
  score = 0;
  count=0;
}

function spawnBananas() {
  if (frameCount % 120 === 0) {
    var banana = createSprite(600,200,40,10);
    banana.y = Math.round(random(120,150));
    banana.addImage(bananasImage);
    banana.scale = 0.05;
    banana.velocityX = -8;
      
    banana.lifetime = 200;
    bananasGroup.add(banana);
    }
  
  }
  


function spawnStones() {
  if(frameCount % 120 === 0) {
    var stone = createSprite(400,320,10,10);
    stone.addImage(obstacles)
    stone.scale = 0.15;
    stone.velocityX =-6 
    stone.lifetime = 300;
    
    stonesGroup.add(stone);
  }
}
