var path,pathImg,redCarImg,redCar,yellowCarImg,yellowCar;
var blueCarImg,blueCar,brownCar,brownCarImg,edges,crashSound,coins,coinsImg;
var coins2Img,coins2,coins3,coins3Img,coinSound,hornSound,gameOverImg,gameOver;
var score = 0;
var RestartImg,Restart;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){

    pathImg = loadImage("Road.png");
    redCarImg = loadImage("redCar.png");
    yellowCarImg = loadImage("yellowCar.png");
    blueCarImg = loadImage("blueCar.png");
    brownCarImg = loadImage("brownCar.png");
    coinsImg = loadImage("coins.png")
    coins2Img = loadImage("coins2.png");
    coins3Img = loadImage("coins3.png");
    coinSound = loadSound("coinsCollected.wav")
    crashSound = loadSound("crash.mp3");
    hornSound = loadSound("carHorn.wav");
    gameOverImg = loadImage("gameover.png");
    RestartImg = loadImage("restart.png");
}

function setup() {

    createCanvas(1000,600);
    
    path=createSprite(500,200,50,50);
    path.addImage(pathImg);
    path.velocityY = 10;

    gameOver = createSprite(500,250);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;

 
    
    redCar = createSprite(200,450);
    redCar.addImage(redCarImg);
    redCar.scale = 0.6;
    gameOver.depth = redCar.depth;
    gameOver.depth += 1;

    Restart = createSprite(500,320);
    Restart.addImage(RestartImg);
    Restart.scale = 0.3;
    Restart.visible = false;

       
    //creating groups
    yellowGroup = createGroup();
    blueGroup = createGroup();
    brownGroup = createGroup();
    coinsGroup = createGroup();
    coins2Group = createGroup();
    coins3Group = createGroup();

  //blueCar.setCollider("circle",12,12,500);

}

   function draw() {
   // background(0);
   if(gameState === PLAY){

   redCar.debug = true
   
    path.velocityY = (5 + 2*score/6);
    

    if(path.y > 300 ){
        path.y = height/6;
      }
      
      redCar.x = World.mouseX;

      var select_oppPlayer = Math.round(random(1,3));
  
      if (World.frameCount % 110 == 0) {
        if (select_oppPlayer == 1) {
          yellowF();
        } else if (select_oppPlayer == 2) {
          blueF();
        } else {
          brownF();
        }
      }

      var select_coin = Math.round(random(1,3));

      if(World.frameCount % 40 === 0){
        if(select_coin == 1){
          spawnCoins()
        } else if(select_coin == 2){
          spawnCoins2();
        }else if(select_coin == 3){
          spawnCoins3()
        }
      }
      
      if(redCar.isTouching(coinsGroup)){
        coinsGroup.destroyEach();
        score = score+1
        coinSound.play();
      }
     
      else if(redCar.isTouching(coins2Group)){
        coins2Group.destroyEach();
        score = score+1;
        coinSound.play();
      }

      else if(redCar.isTouching(coins3Group)){
        coins3Group.destroyEach();
        score = score+1;
        coinSound.play()
      }

      if(keyDown("space")){
        hornSound.play()
      }

      if(redCar.isTouching(yellowGroup)){
        //gameOver.visible = true
        gameState = END;
       //yellowGroup.setVelocityYEach(0);
       // redCar.velocity = 0;
        crashSound.play();
      }

       if(redCar.isTouching(blueGroup)){
       //  gameOver.visible = true
        gameState = END;
        //blueGroup.setVelocityYEach(0);
       // redCar.velocity = 0;
        crashSound.play();
      }
       if (redCar.isTouching(brownGroup)){
        // gameOver.visible = true;
          gameState = END;
         // brownGroup.setVelocityYEach(0);
        //  redCar.velocity = 0;
          crashSound.play();
      }
  
    }
    else if (gameState === END) {
    
      gameOver.visible = true;
     Restart.visible = true;
     
     blueGroup.setVelocityEach(0);
     brownGroup.setVelocityEach(0);
     yellowGroup.setVelocityEach(0);
     redCar.velocity = 0;
      
    
    }
      
    
     if(mousePressedOver(Restart)) {
      reset();
     }
     

    drawSprites();
    textSize(20);
   fill(255);
   text("Coins Collected:"+ score,200,30);
    }

    function reset(){
  
      gameState = PLAY;
      gameOver.visible = false;
      Restart.visible = false;
      yellowGroup.destroyEach();
      blueGroup.destroyEach();
      brownGroup.destroyEach();
      score = 0;
    
      }

  function yellowF(){
  yellowCar = createSprite(random(50,900),40,10,10);
  yellowCar.addImage(yellowCarImg);
  yellowCar.scale = 0.6;
  yellowCar.velocityY = (6 + 2*score/12);
  yellowCar.lifetime = 120;
  yellowGroup.add(yellowCar);
  yellowCar.debug = true;
  gameOver.depth = yellowCar.depth;
    gameOver.depth += 1;
   Restart.depth = yellowCar.depth;
    Restart.depth += 1;
  }

  function blueF(){
    blueCar = createSprite(random(50,900),40,10,10);
  blueCar.addImage(blueCarImg);
  blueCar.scale = 0.5;
  blueCar.velocityY =(6 + 2*score/12);
  blueCar.lifetime = 120;
  blueGroup.add(blueCar)
  blueCar.debug = true;
  gameOver.depth = blueCar.depth;
    gameOver.depth += 1;
    Restart.depth = blueCar.depth;
    Restart.depth += 1;
  
  }

  function brownF(){
    brownCar = createSprite(random(50,900),40,10,10);
    brownCar.addImage(brownCarImg);
    brownCar.scale = 0.7;
    brownCar.velocityY = (6 + 2*score/12);
    brownCar.lifetime = 120;
    brownGroup.add(brownCar)
    brownCar.debug = true;
    gameOver.depth = brownCar.depth;
    gameOver.depth += 1;
    Restart.depth = brownCar.depth;
    Restart.depth += 1;
  }

  function spawnCoins(){
    coins = createSprite(random(50,900),40,10,10);
    coins.addImage(coinsImg)
    coins.scale = 0.1
    coins.velocityY = (6 + 2*score/12);
    coins.lifetime = 110
    coinsGroup.add(coins);
    gameOver.depth = coins.depth;
    gameOver.depth += 1;
    Restart.depth = coins.depth;
    Restart.depth += 1;
  }

  function spawnCoins2(){
    coins2 = createSprite(random(50,900),40,10,10);
    coins2.addImage(coinsImg)
    coins2.scale = 0.1;
    coins2.velocityY = (6 + 2*score/5);
    coins2.lifetime = 110
    coins2Group.add(coins2);
    gameOver.depth = coins2.depth;
    gameOver.depth += 1;
    Restart.depth = coins2.depth;
    Restart.depth += 1;
  }

  function spawnCoins3(){
    coins3 = createSprite(random(50,900),40,10,10);
    coins3.addImage(coinsImg)
    coins3.scale = 0.1;
    coins3.velocityY = (6 + 2*score/5);
    coins3.lifetime = 110
    coins3Group.add(coins3);
    gameOver.depth = coins3.depth;
    gameOver.depth += 1;
    Restart.depth = coins3.depth;
    Restart.depth += 1;
  }

  