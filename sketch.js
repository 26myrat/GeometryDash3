var geoManImg, spikeImg, tallRectImg, mediumRectImg, smallRectImg, groundImg
var geoMan, ground, invisibleGround, obstaclesGroup
var gameState, score

function preload() {
  geoManImg = loadImage("Images/GeoMan.png")
  spikeImg = loadImage("Images/spike.png")
  tallRectImg = loadImage("Images/tallRect.jpg")
  mediumRectImg = loadImage("Images/mediumRect.jpg")
  smallRectImg = loadImage("Images/smallRect.jpg")
  groundImg = loadImage("Images/bg.jpg")
}

function setup() {
  createCanvas(1400,800);

  ground = createSprite(700, 400, 1400, 800)
  ground.addImage(groundImg)
  ground.scale = 2.5
  ground.velocityX = -3

  invisibleGround = createSprite(700, 730, 1400, 20)

  geoMan = createSprite(50, 700, 10, 10);
  geoMan.setCollider("rectangle", 0,0, 200,200)
  geoMan.addImage(geoManImg)
  geoMan.scale = 0.25

  score = 0

  obstaclesGroup = new Group()

  gameState = "play"
}


function draw() {
  background(30,260,105);  

  if (gameState === "play") {

  if (frameCount%3 === 0) {
   score = score +1
  }
  if(ground.x < ground.width/2) {
    ground.x = 700
  }
  if (keyWentDown("space")) {
    geoMan.velocityY = -10
  }
  geoMan.velocityY = geoMan.velocityY +0.5

  if(frameCount%90 === 0) {
    spawnObstacles();
  }
  if(obstaclesGroup.isTouching(geoMan)) {
    gameState = "end"
  }
  }
  else if(gameState === "end") {
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach(0)
    geoMan.velocityY = 0
  }
  geoMan.collide(invisibleGround)
  
  drawSprites();

  textSize(24)
  fill("black")
  text("Score: " + score,700, 200)
  
}
function spawnObstacles() {
  var obstacles = createSprite(1400, 700)
  obstacles.scale = 0.5
  obstacles.setCollider("rectangle", 0, 0, 100, 100)
  obstacles.velocityX = -3
  var rand = Math.round(random(1,4))
  switch(rand) {
    case 1: obstacles.addImage(smallRectImg)
    break;
    case 2: obstacles.addImage(mediumRectImg)
    break;
    case 3: obstacles.addImage(tallRectImg)
    break;
    case 4: obstacles.addImage(spikeImg)

  }
  obstaclesGroup.add(obstacles)
}