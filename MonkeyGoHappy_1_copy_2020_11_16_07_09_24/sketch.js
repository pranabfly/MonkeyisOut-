var PLAY=1
var gamestate=1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var fcatchSound ;
var bSound;
var scimage , sc;
var score;
var gameover , gameImage;
var res,resImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameImage = loadImage("go.png")
  resImage = loadImage("rb.jpg")
  
  fcatchSound = loadSound("AUTOPILOT DISENGAGE.mp3")
  scImage=loadImage("777.jpg")
 bSound=loadSound("Boundary.mp3")
}



function setup() {
   var survivalTime=0;
  sc=createSprite(300,200,20,20)
  sc.addImage(scImage)
  sc.velocityX=-0.5;
  sc.scale=0.2;
   
  score = 0;
  
  
  monkey=createSprite(100,300,30,30)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1;
 // monkey.velocityX=2;
  monkey.debug=true;
 
 ground = createSprite(400,350,900,10);
  //ground.velocityX=-4;
  //ground.x=ground.width/2;
  console.log(ground.x)
  obstaclesGroup=createGroup();
  FoodGroup=createGroup();
  
  gameover = createSprite(200,200,40,40)
  gameover.addImage(gameImage)
  gameover.scale=0.2;
gameover.visible=false;
  
  res = createSprite(90,110,40,40)
  res.addImage(resImage)
  res.scale=0.1;
  res.visible=false;

  
}


function draw() {
  background(250)
  textSize(20);
  text("Touch the plane at the beginning",10,50)
  
  spawnObstacles();
  Food();
  //fcatchSound.play()
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
 if(monkey.collide(sc)){
   bSound.play()
   sc.velocityY=-33;
 }
  if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
    Monkey.velocityY=-33; 
   
    
    
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 200,80)


  drawSprites()
 stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
 

}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function Food(){
   if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
   
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
   
    FoodGroup.add(banana);
  }

}

//nction reset(){
  
  
  
/
