let gameseq=[];
let userseq=[];
let colors=["color1","color2","color3","color4"];
let started = false;
let level=0;
let score=0;
let highscore=0;
let h4 = document.querySelector("h4");
let h3 = document.querySelector("h3");
const backgroundMusic = document.querySelector("#background-music");
const errorSound = document.querySelector("#error-sound");

// Fetch initial high score from backend
async function fetchHighScore() {
    try {
        const response = await fetch('/highscore');
        const data = await response.json();
        highscore = data.highScore;
        h3.innerText = `High Score: ${highscore}`;
    } catch (error) {
        console.error('Failed to fetch high score:', error);
        h3.innerText = `High Score: ${highscore}`;
    }
}

// Save high score to backend
async function saveHighScore(score) {
    try {
        await fetch('/highscore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ score })
        });
    } catch (error) {
        console.error('Failed to save high score:', error);
    }
}

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game started")
        started = true;
        backgroundMusic.play();
        levelup();

    }

});

document.addEventListener("touchstart",function(event){
    if(started == false){
        console.log("Game started via touch")
        started = true;
        backgroundMusic.play();
        levelup();
        event.preventDefault(); // Prevent default touch behavior like scrolling
    }

}, { passive: false });

function levelup(){
    userseq=[];
    level++;

    h4.innerText = `Level ${level}`;

    let random = Math.floor(Math.random()*4);
    let rancolor= colors[random];
    let randomcolor = document.querySelector(`.${rancolor}`);

    gameseq.push(rancolor);
    console.log(gameseq)

    btnflash(randomcolor);
}
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
} 
function checkAns(idx){
        if(userseq[idx] === gameseq[idx]){
            if(userseq.length == gameseq.length){
                setTimeout(levelup,1000);
            }
        }else{
            backgroundMusic.pause();
            errorSound.play();
            if(level > highscore){
                highscore = level;
                saveHighScore(highscore);
            }
            h3.innerText=`High Score: ${highscore}`;
            h4.innerText = `Game Over! Press any key to restart. Your score: ${level}`;
            document.querySelector("body").style.backgroundColor="red";
            setTimeout(function(){
                document.querySelector("body").style.backgroundColor="white";
            },150)
            reset();
        }
}
function btnpress(){ 
   let btn = this;
   userflash(btn);
   usercolor = btn.getAttribute("id");
   userseq.push(usercolor);

   checkAns(userseq.length-1);
} 
let allbtns = document.querySelectorAll(".box");
    for(btn of allbtns){
        btn.addEventListener("click",btnpress);
    }
function reset(){
    gameseq=[];
    userseq=[];
    level=0;
    score=0;
    started = false;
    backgroundMusic.currentTime=0;
    h4.innerText = "Press Any key to start";
}

// Initialize high score on page load
fetchHighScore();
