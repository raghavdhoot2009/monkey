var bananaimg,FoodGroup,banana;
var img;
var obstaclesGroup,obstacleimg;
var jungleImg;
var player,player_running;
var gameover;
var stone;
var score = 0;

function preload () {
jungleImg=loadImage("jungle2.jpg");
  
player_running =
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",
  "Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png",     "Monkey_08.png","Monkey_09.png","Monkey_10.png"); 

  //player=loadAnimation('Monkey.png');
  
  bananaimg=loadImage("Banana.png");
  obstacleimg=loadImage("stone.png");
}


function setup() {
  createCanvas(800,400);
  jungle = createSprite (0,0,800,400);
  jungle.addImage(jungleImg);
  jungle.scale=1.5;
  jungle.x=jungle.width/2;
  jungle.velocityX=-4; 
  
 
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
    
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}


function draw() {
background(255);
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(jungle.x<100){
    jungle.x=jungle.width/2;
  }
  
      if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
  
  switch(score){
  case 10:player.scale=0.12;
          break;
  case 20:player.scale=0.14;
          break;
  case 30:player.scale=0.16;
          break;  
  case 40:player.scale=0.18;    
          break;
  default: break;        
} 
   if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
     // score=score-2;
    }
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
   
  
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleimg);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



  