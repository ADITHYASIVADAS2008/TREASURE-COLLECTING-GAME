var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,boy2Img,cashImg,diamondsImg,jwelleryImg,swordImg,
    endImg;
var treasureCollection = 0;
var DiamondsCollected = 0;
var JwelleryCollected = 0;
var CashCollected = 0;

var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver;

//Game States
var SERVE = 2;
var PLAY=1;
var END=0;
var gameState=SERVE;

function preload()
{
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  boy2Img  = loadImage("Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup()
{
  createCanvas(400,600);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;
  
  
  //creating boy running
  boy = createSprite(70,580,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  boy.visible=true;
  
  gameOver = createSprite(200,300);
  gameOver.addImage("gameOver",endImg);
  gameOver.scale = 0.5;
  gameOver.visible=false;
  
  boy2 = createSprite(70,580,20,20);
  boy2.addAnimation("SahilRunning",boy2Img);
  boy2.scale=0.08;
  boy2.visible=false;
  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

}

function draw() 
{  
   if(gameState===PLAY)
   {
     background(0);
     path.velocityY = 4;
     boy.x = World.mouseX;
     gameOver.visible=false;
     boy.visible=true;
     boy2.visible=false;
  
     edges= createEdgeSprites();
     boy.collide(edges);
  
    //code to reset the background
     if(path.y > 400 )
     {
       path.y = height/2;
      }
     
     createCash();
     createDiamonds();
     createJwellery();
     createSword();
     
     if (cashG.isTouching(boy))
     {
       cashG.destroyEach();
       treasureCollection=treasureCollection+20;
       CashCollected = CashCollected+20
     }
     
     else if (diamondsG.isTouching(boy))
     {
       diamondsG.destroyEach();
       treasureCollection=treasureCollection+100;
       DiamondsCollected = DiamondsCollected+100
     }
     
     else if(jwelleryG.isTouching(boy)) 
     {
       jwelleryG.destroyEach();
       treasureCollection=treasureCollection+50;
       JwelleryCollected = JwelleryCollected+50
     }
     
     else if(swordGroup.isTouching(boy)) 
     {
       gameState = END;
      }
   }
  
  drawSprites();
  
  if(gameState === SERVE)
  {
    boy2.visible=true;
    boy.visible=false;
    path.velocityY = 0;
    gameOver.visible=false;
    
    
    
    textSize(20);
    fill("red");  
    text("RULES",160,200);
    
    textSize(20);
    fill("skyblue");
    text("please press'space'to start ",80,225);
    
    textSize(20);
    fill("BLUE");
    text("   'THE INFINITE RUNNING GAME' ",25,255);
    
    textSize(20);
    fill("YELLOW");
    text(" WORTH  ",25,290);
  
  
    textSize(13);
    fill("YELLOW");
    text(" CASH = 20  ",25,310);
  

    textSize(13);
    fill("YELLOW");
    text(" JWELLERY = 50  ",25,330);
  
    textSize(13);
    fill("YELLOW");
    text(" DIAMONDS = 100  ",25,350);
  
    textSize(13);
    fill("blue");
    text("SWORD OF EVIL WILL CAUSE YOUR DEATH",25,370);
  
    textSize(13);
    fill("pink");
    text(" SO BE CAREFULL  ",5,425);
    
    textSize(13);
    fill("pink");
    text(" AND DON'T EVER TOUCH THE SWORD  ",5,455);
  }
 
  
  if(gameState === END)
  {
    gameOver.visible=true;
    boy.visible=false;
    boy2.visible=false;
    //print(gameState);
    swordGroup.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    cashG.destroyEach();
    path.velocityY = 0;
    //swordGroup.setLifetimeEach(-1);
    //gameState = END;
    swordGroup.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    cashG.setVelocityYEach(0);
    
    textSize(20);
    fill("blue");
    text("bad luck",100,200);
    
    textSize(20);
    fill("yellow");
    text("YOU SHOULD HAVE BEEN CAREFULL",30,100);
    
    textSize(20);
    fill("skyblue");
    text("BETTER LUCK NEXT TIME ",100,360);
    
    textSize(20);
    fill("PINK");
    text("PRESS 'R' TO GO TO RULES  ",3,480);   
    
    textSize(20);
    fill("skyblue");
    text("AND THEN PRESS'SPACE'TO START THE GAME AGAIN  ",3,510); 
    
    textSize(20);
    fill("skyblue");
    text("THE INFINITE RUNNING GAME AGAIN   ",3,550); 
    
    textSize(14);
    fill("green");
    text("TOLD YOU DON'T EVER TOUCH THE SWORD ",5,427);
    }
  
  textSize(20);
  fill("blue");
  text("TotalTreasure 💰 : "+ treasureCollection,120,30);
  
  textSize(14);
  fill("orange");
  text("DiamondsCollected 💎: "+ DiamondsCollected,120,50);
  
  textSize(14);
  fill("yellow");
  text("JwelleryCollected 💍👑 : "+ JwelleryCollected,3,70);
  
  textSize(14);
  fill("skyblue");
  text("CashCollected 💵💴💶: "+ CashCollected,198,70);
  
  
  if (keyDown("space"))
  {
    resetS();
  }
  
  if (keyDown("r"))
  {
    resetE();
  }
}

function createCash() 
{
  if (World.frameCount % 200 == 0)
  {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 220;
    cashG.add(cash);
  }
}

function createDiamonds()
{
  if (World.frameCount % 320 == 0)
  {
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 220;
    diamondsG.add(diamonds);
  }
}

function createJwellery()
{
  if (World.frameCount % 410 == 0)
  {
    var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 220;
    jwelleryG.add(jwellery);
  }
}

function createSword()
{
  if (World.frameCount % 530 == 0)
  {
    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 3;
    sword.lifetime = 220;
    swordGroup.add(sword);
  }
}

function resetS()
{
  if(gameState === SERVE )
  {
    treasureCollection = 0;
    DiamondsCollected = 0;
     JwelleryCollected = 0;
    CashCollected = 0;
    gameState = PLAY;
  }
}

function resetE()
{
  if(gameState === END )
  {
    //treasureCollection = 0;
    gameState = SERVE;
  }
}


