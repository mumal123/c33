







const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
const Constraint=Matter.Constraint;
var engine,world,object;
var ground,ball,log6,sling,platform;
var box1,box2,box3,box4,box5
var pig1,log1,pig2,log2,log3,log4,bird1,backgroundImg,constrainedLog
var gameState="onSling"
var score=0;
function preload(){
 getBackgroundImg();
}
function setup() {
  createCanvas(1200,400);
  engine=Engine.create();
  world=engine.world;
  platform=new Ground(150,305,300,170)
  box1=new Box(700,320,70,70);
  box2=new Box(920,320,70,70);
  ground=new Ground(600,height,1200,20);
  pig1=new Pig(810,350)
  pig2=new Pig(810,220);
  box3=new Box(700,240,70,70);
  box4=new Box(920,240,70,70);
  box5=new Box(810,160,70,70);
  log2=new Log(810,180,300,PI/2);
  log1=new Log(810,260,300,PI/2);
  log3=new Log(760,120,150,PI/7);
  log4=new Log(870,120,150,-PI/7);
  bird1=new Bird(200,50)
  sling=new SlingShot(bird1.body,{x:200,y:50});
}
function draw() {
  if(backgroundImg)

  
  background(backgroundImg);
  noStroke();
  textSize(35)
  fill("white")
  text("score" +score,width-300,50)
  Engine.update(engine);
  
  sling.display()
 platform.display();
  box1.display();
  box2.display();
  pig1.display();
  pig1.score();
  log1.display();
  box3.display();
  box4.display();
  box5.display();
  pig2.display();
  pig2.score();
  log2.display();
  log3.display();
  log4.display();
  bird1.display();
 // console.log(log1.body.angle);
  //console.log(box2.body.position.x);
  //console.log(box2.body.position.y);
  //console.log(box2.body.angle);
  ground.display();
}
function mouseDragged(){
 // if(gameState!=="launched"){
  Matter.Body.setPosition(bird1.body,{x:mouseX,y:mouseY})
//  }
}
function mouseReleased(){
  sling.fly();
  gameState="launched"
}
function keyPressed(){
  if(keyCode===32&&bird1.body.speed<1){
    bird1.trajectory=[]
    Matter.Body.setPosition(bird1.body,{x:200,y:50})
   sling.attach(bird1.body)
  }
}
async function getBackgroundImg(){
  var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
  var responseJSON=await response.json();
  var datetime=responseJSON.datetime
  var hour=datetime.slice(11,13)
  if(hour>=06 & hour<=19){
    bg="sprites/bg.png"
  }
  else{
    bg="sprites/bg2.jpg"
  }
  backgroundImg=loadImage(bg)
  console.log(responseJSON.datetime)
}