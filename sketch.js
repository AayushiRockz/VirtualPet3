//Create variables here
var dog, database; 
var foodS,foodStock;
var d1Image,d2Image;
var  fedTime,lastFed;
var feed, addFood;
var foodObj;

var bedRoomImg, GardenImg , washroomImg;
var gameState = "Hungary"; 

function preload()
{
  //load images here
  // sadimage
  d1Image = loadImage("images/dogImg.png");
  // happyImage
  d2Image = loadImage("images/dogImg1.png");

  // images for rooms
  bedRoomImg = loadImage("virtual pet images/Bed Room.png");
  GardenImg = loadImage("virtual pet images/Garden.png");
  washroomImg = loadImage("virtual pet images/Wash Room.png")
}

function setup() {

  database = firebase.database();

  createCanvas(1100,500);
  
  //  object for food class
  foodObj = new food();

  // reading value of foodStock from DB
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  //  making dog
  dog = createSprite(900,390,40,40);
  dog.addImage("HungryDog",d2Image);
  dog.scale = 0.38;

  

  //   display buttons

  // feeding dog
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  // adding food
  addFood= createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);



  
}


function draw() {  
  background(247,143,176);
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

 

 
 fill(255,255,254);
 textSize(15);
 
//  text to show the last feed
 if(lastFed>=12){
text("Last feed : "+ lastFed%12+"PM"+350,30);

 }else if(lastFed==0){
   text("Last feed :12AM",350,30);
 }else{
   text("Last feed:"+lastFed+"AM"+350,30)
 }

if(gameState!="Hungary"){
    feed.hide();
    addFood.hide();
    dog.remove();

}else{
  feed.show();
  addFood.show();
  dog.addImage(d1Image);
}

 









drawSprites();
}


// to read values from dataBase
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

// to update food stock and last fed time

function feedDog(){
  dog.addImage(d1Image);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food :foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//  read the gameState from dataBase
readState=database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();
})

// to update game state in data Base
function update(){
  database.ref('/').update({
    gameState:state
  });
}








// function to add food in stock
function addFood(){
  foodS++;
  database.ref('/').update({
    Food :foodS
  })
}
// to write the values in DB
// function writeStock(x){
//   if(x<0){
//     x=0;
//   }else{
//     x=x-1;
//   }

//   database.ref('/').update({
//     Food:x
//   })

// }







