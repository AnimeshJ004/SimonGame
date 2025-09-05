let gameseq=[];
let userseq=[];
let colors=["color1","color2","color3","color4"];

let started = false;
let level=0;
let score=0;
let highscore=0;
let h4 = document.querySelector("h4");
const backgroundMusic = document.querySelector("#background-music");
const errorSound = document.querySelector("#error-sound");
document.addEventListener("keypress",function(){ 
    if(started == false){
        console.log("Game started")
        started = true;
        backgroundMusic.play();
        levelup();

    } 
    
});

function levelup(){
    userseq=[];
    level++;
    highscore++;
    
    h4.innerText = `Level ${level}`;

    let random = Math.floor(Math.random()*3);
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
            if(highscore > level){
                highscore=level;
            }
            let h3 = document.querySelector("h3");
            h3.innerText=`Your highscore is: ${highscore}`;
            h4.innerText = `Game Over Press any key to restart and your score is ${level}`;
            // document.querySelector("body").style.backgroundColor="red";
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
    highscore = level;
    started = false;
    backgroundMusic.currentTime=0;
}
