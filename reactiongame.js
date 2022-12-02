//creating const variables for use;
const start= document.querySelector('.startbtn');
const reset= document.querySelector('.resetbtn');
const shape= document.querySelector('.shape');
const score= document.querySelector('.score');
const frame= document.querySelector('.frame');
const timeBar= document.querySelector('.timeBar');
//making with and height equal to the windows with for proper responsiveness;
const width=window.innerWidth;
const height= window.innerHeight;

let totalClicks=0, currentTime, totalTime=0, previousTime = 0;

//reload the browser window if the size is changed for proper resposiveness
addEventListener('resize', (e) =>{
    location.reload();//code to refresh or reload the window
})

//frame height and width making variable to insure proper responsiveness;
frame.style.height=`${0.75*height}px`;//Error:add px and backtick and ${}
frame.style.width=`${width}px`;

//function to generage random number for new positioning of shapes
function generateRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

//function for start button
const startGame = () =>{
    shape.style.display='block';
    start.disabled = true;
    reset.disabled = false;
    previousTime = Date.now();
    timeRemaining(0);
}

const timeBarReset = () => {
    timeBar.style.transitionDuration='0ms';
    timeBar.style.width='100%';
}

//function to reset game;
const resetGame = () =>{
    score.innerHTML= "Average Reaction Time: " + (totalTime/totalClicks).toPrecision(3) + " sec";
    start.disabled=false;
    reset.disabled=true;
    shape.style.display='none';
    timeBarReset();
    totalClicks=0, currentTime, totalTime=0, previousTime = 0;
}

const shapeClicked = () => {
    timeBarReset();
    totalClicks++;
    score.innerHTML= "Reaction Time: " + (Date.now()-previousTime)/1000 + " sec";
    totalTime += (Date.now()-previousTime)/1000;
    previousTime=Date.now();

    const left =generateRandom(5, 95);
    const top =generateRandom(5, 95);
    const newRadius =generateRandom(0, 50);
    const newColor =generateRandom(0, 255);

    shape.style.left=`${left}%`;
    shape.style.top=`${top}%`;
    shape.style.height=`${width*0.08}px`;
    shape.style.width=`${width*0.08}px`;
    shape.style.borderRadius=`${newRadius}%`;
    shape.style.backgroundColor=`rgb( ${generateRandom(0,255)}, ${generateRandom(0,255)}, ${generateRandom(0,255)})`;
    timeRemaining(totalClicks);
}

function timeRemaining(clicks) {
    timeBar.style.transitionDuration='2000ms';
    timeBar.style.width='0%';
    setTimeout(() => {
        if(clicks != totalClicks){
            return;
        }
        else if(clicks == 0){//if user don't click even after 2 sec of clicking startbutton then this alert will be generated;
            window.alert('please click on the shape appeared within 2 second !!');
        }
        else
            resetGame();
    }, 2000);
}

//function to make object size-blink;
let count= 0;
setInterval( () => {
    if(count%2==0){
        count++;
        shape.style.transform='scale(1.2)';
        shape.innerText='click';
    }
    else{
        count++;
        shape.style.transform='scale(0.9)';
        shape.innerHTML='me';
    }
        }, 400);

start.addEventListener('click', startGame);
shape.addEventListener('click', shapeClicked);
reset.addEventListener('click', resetGame);