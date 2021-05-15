var canvas, background;
var dog, happydog;
var foodS, foodStock;
var database;
var happyDogImage
var DogImage;

function preload(){
  DogImage = loadAnimation("images/dogImg.png")	
  happyDogImage = loadAnimation("images/dogImg1.png")
}

function setup() {
  var canvas = createCanvas(600, 570);
  database = firebase.database();

  dog = createSprite(300,400,10,10);
  dog.addAnimation("Dog", DogImage);
  dog.addAnimation("happyDog", happyDogImage);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46,139,87);

  fill(0);
  textSize(18);
  text("Note: Press UP_ARROW key to feed DRAGO Milk ", 95,70);

  fill(0);
  textSize(18);
  text("Food Remaining:20 ", 220,220);
  
  drawSprites();
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addAnimation("happyDog", happyDogImage);
  }
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0) {
    x=0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}