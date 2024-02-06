song_name1 = "";
song_name2 = "";
LX = 0;
LY = 0;
RX = 0;
RY = 0;
SL = 0;
SR = 0;
function setup()
{
    video = createCapture(VIDEO);
    video.hide();
    
    canvas = createCanvas(500, 500);
    canvas.center();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw()
{
    image(video, 0, 0 , 500 ,500);

    fill("#FF0000");
    stroke("#FF0000");

    if (SL > 0.2) {
        circle(LX,LY, 20);
        song_name2.stop();
        if (song_name1.isPlaying() == false) {
            song_name1.play();
            document.getElementById("song_name").innerHTML = "Harry potter main theme";
        }
    }
    if (RL > 0.2) {
        circle(RX,RY, 20);
        song_name1.stop();
        if (song_name2.isPlaying() == false) {
            song_name2.play();
            document.getElementById("song_name").innerHTML = "Peter pan Song";
        }
    }
}
function preload()
{
    song_name1 = loadSound("Harry_potter.mp3");
    song_name2 = loadSound("Peter_Pan.mp3");
}
function modelLoaded()
{
    console.log("model has been loaded successfully.");
}
function gotPoses(results)
{
    if (results.length > 0) {
        console.log(results);

        LX = results[0].pose.leftWrist.x;
        LY = floor(Number(results[0].pose.leftWrist.y));
        RX = results[0].pose.rightWrist.x;
        RY = floor(Number(results[0].pose.rightWrist.y));

        SL = results[0].pose.keypoints[9].score;
        SR = results[0].pose.keypoints[10].score;
    }
}