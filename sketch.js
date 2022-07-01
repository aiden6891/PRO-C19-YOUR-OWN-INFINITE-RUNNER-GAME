var spaceImg, space;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var astronaut, astronautImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  spaceImg = loadImage("space.jpg");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  astronautImg = loadImage("astronaut.jpg");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  space = createSprite(300,300);
  space.addImage("space",spaceImg);
  space.velocityY = 1;
  astronaut = createSprite(200,200,50,50);
  astronaut.addImage("astronaut", astronautImg)
  astronaut.scale= 0.3

  doorsGroup= new Group();
  climbersGroup= new Group();
  invisibleBlockGroup= new Group();
}

function draw() {
  background(200);
 if(gameState === "play"){


  if(keyDown("left_arrow")){
    astronaut.x = astronaut.x - 3
  }
  if(keyDown("right_arrow")){
    astronaut.x = astronaut.x + 3
  }
  if(keyDown("space")){
    astronaut.velocityY= -10
  }
  astronaut.velocityY = astronaut.velocityY + 0.8
 

  
  if(space.y > 400){
      space.y = 300
    }
 spawnDoors();

if(climbersGroup.isTouching(astronaut)){
    astronaut.velocityY = 0
}
if(invisibleBlockGroup.isTouching(astronaut)|| astronaut.y > 600){
    astronaut.destroy();
   gameState = "end"

}

drawSprites();

}
if(gameState === "end"){
  stroke("yellow")
  fill("white")
  textSize(30);
  text("GAME OVER", 230, 250)
}



}

function spawnDoors(){
if(frameCount%240 === 0){
  var door = createSprite(200,-50);
  door.addImage(doorImg)
  door.velocityY = 1;

  var climber = createSprite(200,10);
  climber.addImage(climberImg)
  climber.velocityY = 1;


  var invisibleBlock = createSprite(200, 15);
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2;
  invisibleBlock.velocityY = 1;

  door.x = Math.round(random(120,400));
  climber.x = door.x
  invisibleBlock.x = door.x

  door.lifetime = 800;
  climber.lifetime = 800;
  invisibleBlock.lifetime = 800;
  
  doorsGroup.add(door)
  climbersGroup.add(climber)
  invisibleBlockGroup.add(invisibleBlock)

  invisibleBlock.debug = true;

  astronaut.depth = door.depth;
  astronaut.depth += 1


 




}

}
