status_1neel = "";
song = "";
object = [];
function preload(){
song = loadSound("alaram.mp3");
}
function setup(){
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
object_detecter = ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("status").innerHTML = "status : detecting objects";
}
function modelLoaded(){
console.log("cocossd is intialized");
status_1neel = true;
}
function draw(){
image(video , 0 , 0 , 380 , 380);
if(status_1neel != ""){
r = random(255);
g = random(255);
b = random(255);
object_detecter.detect(video , gotResult);
for(i = 0; i < object.length;i++){
document.getElementById("status").innerHTML = "status : object detected";
document.getElementById("no_of_objects").innerHTML = "number of objects detected- " + object.length;
fill(r,g,b);
percentage = floor(object[i].confidence * 100);
text(object[i].label+","+percentage+"%",object[i].x,object[i].y);
noFill();
stroke(r,g,b);
rect(object[i].x,object[i].y,object[i].width,object[i].height);
if(object[i].label == "person")
 {
      document.getElementById("no_of_objects").innerHTML = "Baby Found";
       console.log("stop");
        song.stop(); 
    }
     else {
          document.getElementById("no_of_objects").innerHTML = "Baby Not Found";
           console.log("play");
            song.play();
         } 
        } 
         if(object.length == 0) 
         {
              document.getElementById("no_of_objects").innerHTML = "Baby Not Found"; 
              console.log("play");
               song.play();
}
}
}
function gotResult(error , results){
if(error){
console.log("error");
}
console.log(results);
object = results;
}