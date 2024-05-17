let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbpSpeed = document.getElementById("kbps"),
    mbpSpeed = document.getElementById("mbps"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalkbpSpeed = 0;
let totalmbpSpeed = 0;
let numTests = 10;
let testCompleted = 0;

//Get random image from unsplash.com
let imageApi = "https://source.unsplash.com/random?topic=nature";

//When image loads
image.onload = async function(){
    endTime = new Date().getTime();

    //Get image size
    await fetch(imageApi).then((response)=>{
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

//Function to calculate Speed
function calculateSpeed() {
    //Time taken in seconds
    let timeDuration = (endTime - startTime)/1000;
    //Total bits
    let loadedBitS = imageSize * 8;
    let speedInBits = loadedBitS / timeDuration;
    let speedInkbps = speedInBits /1024;
    let speedInmbps = speedInkbps / 1024;


    totalBitSpeed += speedInBits;
    totalkbpSpeed += speedInkbps;
    totalmbpSpeed += speedInmbps;

    testCompleted++;

    //If all tests completed (we get 5 image then calculate average)
    if(testCompleted === numTests){
        let averageSpeedInBits = (totalBitSpeed/numTests).toFixed(2);
        let averageSpeedInkbps = (totalkbpSpeed/numTests).toFixed(2);
        let averageSpeedInmbps = (totalmbpSpeed/numTests).toFixed(2);

        //Dislpay average speeds
        bitSpeed.innerHTML += `${averageSpeedInBits}`;
        kbpSpeed.innerHTML += `${averageSpeedInkbps}`;
        mbpSpeed.innerHTML += `${averageSpeedInmbps}`;
        info.innerHTML = "Test Completed!";
    }
    else{
        //Run next test
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

//Initial function to strat tests
const init = async() =>{
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

//Run tests when window loads
window.onload = () =>{
    for(let i = 0; i < numTests; i++){
        init();
    }
};
