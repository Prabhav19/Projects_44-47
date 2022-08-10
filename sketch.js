var background1,background1Img
var player, player1Img, player2Img
var zombie, zombieImg
var heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img
var bullets = 200
var gameState = "fight"
var score = 0
var life = 3


function preload() {
  background1Img = loadImage("spooky-07.jpg")
  player1Img = loadImage("Standing.png")
  player2Img = loadImage("Shooting.png")
  zombieImg = loadImage("Zombie.png")
  heart1Img = loadImage("heart_1.png")
  heart2Img = loadImage("heart_2.png")
  heart3Img = loadImage("heart_3.png")
  bulletImg = loadImage("bullet.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  background1 = createSprite(displayWidth/2-50,displayHeight/2-50,200,200)
  background1.addImage(background1Img)
  background1.scale = 0.9 

  player = createSprite(displayWidth/3-20,displayHeight/5+400,50,50)
  player.addImage(player1Img)
  player.scale = 0.5

  player.debug = true
  player.setCollider("rectangle" ,0,0,300,500)

  zombieGroup = new Group()
  
  bulletGroup = new Group()

  heart1 = createSprite(displayWidth-150,50,20,20)
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-150,50,20,20)
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,50,20,20)
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.4
}


function draw() {
  background(0);
  
  if(gameState === "fight"){
    if(life === 3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
    if(life === 2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
    if(life === 1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }
    if(life === 0){
    gameState = "lost"
  }
    if(score === 100){
    gameState = "won"
  }


  if(keyDown(UP_ARROW)||touches.length > 0){
    player.y = player.y - 30
  }

  if(keyDown(DOWN_ARROW)||touches.length > 0){
    player.y = player.y + 30
  }
  
  if(keyWentDown("space")){
    bullet = createSprite(displayWidth-1020,player.y)
    bullet.scale = 0.05
    bullet.addImage("bullet",bulletImg)
    bullet.velocityX = 30
    bulletGroup.add(bullet)
    player.depth = bullet.depth
    player.depth = player.depth + 2
    player.addImage(player2Img)
    bullets = bullets - 1
    bullet.debug = true
  }
  else if(keyWentUp("space")){
    player.addImage(player1Img)
  }
  if(bullets == 0){
    gameState = "bullet"
  }
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score = score + 5
      }
    }
  }

  if(zombieGroup.isTouching(player)){
    for(var i = 0; i < zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        life = life - 1
      }
    }
  }
  spawnZombies()
  if(player.position.y <= 50){
    player.position.y = 50
  }
  if(player.position.y >= displayHeight-200){
    player.position.y = displayHeight-200
  }

}
  drawSprites();

  textSize(30)
  fill("red")
  text("Bullets ="+ bullets,displayWidth-210, displayHeight/2-250)
  text("Score ="+ score,displayWidth-200, displayHeight/2-220)
  text("lives ="+ life,displayWidth-200, displayHeight/2-280)


if(gameState == "lost"){
  textSize(30)
  fill("green")
  text("You Lost :(",400, 400)
zombieGroup.destroyEach()
player.destroy()
}
else if(gameState == "won"){
  textSize(30)
  fill("blue")
  text("You Win!",400, 400)
zombieGroup.destroyEach()
player.destroy()

}

else if(gameState == "bullet"){
  textSize(30)
  fill("green")
  text("You ran out of bullets",400, 400)
zombieGroup.destroyEach()
player.destroy()
bulletGroup.destroyEach()

}
}
function spawnZombies(){
  if(frameCount%60 === 0){
    zombie = createSprite(random(displayWidth/3+500,displayWidth/3+1000),random(displayHeight/5+100,displayHeight/5+400),50,50)
    zombie.addImage(zombieImg)
    zombie.scale = 0.1 
    zombie.velocityX = -3
    zombie.liftime = 400
    zombie.debug = true
    zombie.setCollider("rectangle", 0,0,300,1000)
    zombieGroup.add(zombie)
  }
}