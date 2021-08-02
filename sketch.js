//Renaming
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;

function preload(){
  bg = loadImage("ImagesSound/background.png")
  hungrybunny = loadImage("ImagesSound/Rabbit-01.png")
  food = loadImage("ImagesSound/melon.png")
  rabbitBlinking = loadAnimation("ImagesSound/blink_1.png", "ImagesSound/blink_2.png","ImagesSound/blink_3.png")
  rabbitEating = loadAnimation("ImagesSound/eat_0.png","ImagesSound/eat_1.png","ImagesSound/eat_2.png","ImagesSound/eat_3.png","ImagesSound/eat_4.png")
  rabbitSad = loadAnimation("ImagesSound/sad_1.png","ImagesSound/sad_2.png","ImagesSound/sad_3.png")

  rabbitBlinking.playing = true
  rabbitSad.playing = true
  rabbitEating.playing = true
  rabbitSad.looping = false
  rabbitEating.looping = false

  HappyBackgroundMusic = loadSound("ImagesSound/sound1.mp3")
  YouMissedSound = loadSound("ImagesSound/sad.wav")
  EatingSoundEffect = loadSound("ImagesSound/eating_sound.mp3")
  CutSound = loadSound("ImagesSound/rope_cut.mp3")
  AirSound = loadSound("ImagesSound/air.wav")
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  HappyBackgroundMusic.play()
  HappyBackgroundMusic.setVolume(0.08)
  rabbitBlinking.frameDelay = 17
  rabbitEating.frameDelay = 17
  rabbitSad.frameDelay = 50
  ground = new Ground(200,680,600,20);
  rope = new Rope(7, {x:250, y:30})
  fruit = Bodies.circle(250,250,30)
  Matter.Composite.add(rope.body,fruit)
  FruitConnection = new Link(rope,fruit)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  button = createImg("ImagesSound/cut_btn.png")
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(drop)
  
  blower= createImg("ImagesSound/balloon.png")
  blower.position(10,250)
  blower.size(100,100)
  blower.mouseClicked(airblow)
  
  bunny = createSprite(350,600,20,20)

  mute= createImg("ImagesSound/mute.png")
  mute.position(450,20)
  mute.size(50,50)
  mute.mouseClicked(Mute)
  
  // sprite.addAnimation("label", variable)
  bunny.addAnimation("blinking",rabbitBlinking)
  bunny.addAnimation("hungry",rabbitEating)
  bunny.addAnimation("Upset",rabbitSad)
  
  bunny.scale = 0.3
}

function airblow(){
  Matter.Body.applyForce(fruit,fruit.position,{x:0.01,y:0});
  AirSound.play()
}

function Mute() {
  if(HappyBackgroundMusic.isPlaying()) {
    HappyBackgroundMusic.stop()
  } else{
    HappyBackgroundMusic.play()
  }
}
function draw() 
{
  background(bg);
  //ground.show();
  rope.show();
  push()
  imageMode(CENTER)
  if(fruit!=null){
  image(food,fruit.position.x,fruit.position.y,90,90)
  }
  pop()
  Engine.update(engine);
  
if(Touching(fruit, bunny)){
  bunny.changeAnimation("hungry",rabbitEating)
  EatingSoundEffect.play()
}
 
if(fruit!=null && fruit.position.y > 640){
  bunny.changeAnimation("Upset",rabbitSad)
  YouMissedSound.play()
  fruit = null
}
  drawSprites()
}
function drop(){
  rope.break()
  FruitConnection.breakFruit()
  FruitConnection = null
}
//!= not equal
function Touching(body,sprite){
  if(body!=null){
    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(distance < 80){
      World.remove(world, fruit)
      fruit = null
      return true
    } else{
      return false
    }
  }
}