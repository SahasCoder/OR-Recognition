imgDog = "";
status = "";
objects = [];

function preload(){
 imgDog = loadImage("https://i.postimg.cc/T3vbPtrz/dog.jpg")
}

function setup(){
    canvas = createCanvas(640 , 420);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded(){
    console.log("Model loaded");
    status = true;
    objectDetector.detect(imgDog , gotResult);
}

function draw(){
    image(imgDog , 0 , 0 , 640 , 420);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status: objects detected";

        fill("black");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

        }
    }
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function back(){
    window.location = "index.html";
}