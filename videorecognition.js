objects = [];
status = "";
ObjectTargetLabel = "";
r = 0;
g = 0;
b = 0;

function setup(){
    canvas = createCanvas(640 , 420);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

}

function modelLoaded(){
    console.log("Model loaded");
    status = true;
}

function draw(){
    image(video , 0 , 0 , 640 , 420);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResult);
        
        for(i = 0; i < objects.length; i++){
            ObjectTargetLabel = document.getElementById("objectNameInput").value;
            document.getElementById("status").innerHTML = "Status: detected objects";

            fill(r,g,b);
            text(objects[i].label , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            document.getElementById("number_of_objects").innerHTML = "Number of objects: " + objects.length;

            if(objects[i].label == ObjectTargetLabel){
                document.getElementById("objectTargetView").innerHTML = "Targeted object found";
                                synth = window.speechSynthesis;
                speak_data = "Targeted object found";
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else{
                document.getElementById("objectTargetView").innerHTML = "Targeted object not found";
                                synth = window.speechSynthesis;
                speak_data = "Targeted object not found";
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
        }
    }

}

function Goback(){
    window.location = "index.html";
}

function startRecog(){
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
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
