Status = "";
plant_image = "";
objects = [];

function preload(){
    plant_image = loadImage("potted_plants.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(plant_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(plant_image,0,0,640,350);

    if(Status != ""){

        for(i = 0; i < objects.length; i++){

            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("no_of_objects_detected").innerHTML = "No of objects detected are :" + objects.length;
    
            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);

             text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            
            noFill();
            stroke("#fc0303");
             rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}