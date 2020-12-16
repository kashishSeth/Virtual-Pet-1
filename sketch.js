//creating global variables
var dog, happyDog;
var foodS, foodStock;
var database;

function preload()
{
  //loading the images
  dogSitting = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() 
{
  createCanvas(500, 500);

  //assigning firebase database to variable database
  database=firebase.database();

  //Getting foodStock from the database 
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  //creating a dog sprite with a given image
  dog = createSprite(250,350,30,30);
  dog.addImage(dogSitting);
  dog.scale = 0.2;
  
}

function draw() 
{  
  background(46,139,87);
  
  //changing the dog image when up arrow is pressed
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  
  drawSprites();
  //add styles here

  //text to instuct
  fill("White");
  text("Note: Press UP_ARROW Key to feed Scooby Milk!", 120, 30);

  //text to display remaining food
  fill("White");
  text("Food remaining: " + foodS, 200, 250);
  
}

//Function to read values from database
function readStock(data){
  foodS = data.val();
}

//Function to write values in database
function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x--; 
  }

  database.ref('/').update({
    Food:x
  })
}



