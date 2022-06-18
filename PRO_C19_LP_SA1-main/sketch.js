var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200);
  ghost.addImage("ghost-jumping.png",ghostImg)
  ghost.scale=0.5


  //find the correct code
  //doorsGroup=new
  //doorsGroup=new doorsGroup
  invisibleBlockGroup=new Group()
  climbersGroup=new Group()
  doorsGroup=new Group()
  //doors=new doorsGroup()



}

function draw() {
  background(200);
  
if(gameState=="play"){
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
    ghost.velocityY=-5
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x-=1
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x+=1
    }
    ghost.velocityY = ghost.velocityY+0.8
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy()
     gameState="end"
    }
    spawndoors()
  }

    drawSprites()

    if(gameState =="end"){
  stroke("yellow");
  fill("yellow")
  textSize(30)
  text("Game Over",200,200)
    }
    
}
function spawndoors() {
  
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    //make the ghost and door depth same and then inc the ghosts depth
    ghost.depth=door.depth
   ghost.depth+=1
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    //add each door to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
