Hp="";
Lb="";
RWY=0;
RWX=0;
LWY=0;
LWX=0;
LWscore=0;
RWscore=0;
SfileS="";
function preload(){
    Hp=loadSound("music.mp3");
    Lb=loadSound("Ruth-B-Lost-Boy.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    pose=ml5.poseNet(video,modelLoaded)
}

function modelLoaded() {
    console.log("Model has been loaded");
    pose.on("pose",gotPoses);
}

function gotPoses(r) {
    if(r.length>0){
        console.log(r);
        LWX=r[0].pose.leftWrist.x;
        LWY=r[0].pose.leftWrist.y;
        RWY=r[0].pose.rightWrist.y;
        RWX=r[0].pose.rightWrist.x;
        LWscore=r[0].pose.keypoints[9].score;
        RWscore=r[0].pose.keypoints[10].score;
        }
}

function draw() {
    image(video,0,0,600,500);
    if (LWscore>0.2) {
        if(Hp.isPlaying()==false){
            Lb.stop();
            Hp.play();
            document.getElementById("song_name").innerHTML="Harry Potter Theme Song";
        }
    }
    if (RWscore>0.2){
        if (Lb.isPlaying()==false) {
            Hp.stop();
            Lb.play();
            document.getElementById("song_name").innerHTML="Lost Boy by Ruth B";
        }
    }
}