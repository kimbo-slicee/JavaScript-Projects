const scoreText=document.querySelector(".score");
let playBoard=document.querySelector(".play-board");
let foodX=10, foodY=10,snakeY=5,snakeX=2;
let velocityX=0,velocityY=0;
let snakeBody=[];
let gameOver=false;
let setIntervalId;
let score=0;
// change Snake when press on keyBoard
const changeSnakePosition=(event)=>{
    // ArrowDown,ArrowUp ArrowRight ArrowLeft
    if(event.key==="ArrowDown" && velocityY!==-1){
        velocityX=0
        velocityY=1
    }else if(event.key==="ArrowUp" && velocityY!==1){
        velocityX=0
        velocityY=-1
    }else if(event.key==="ArrowRight" && velocityX!==-1){
        velocityX=1
        velocityY=0
    }else if(event.key==="ArrowLeft" && velocityX!==1){
        velocityX=-1
        velocityY=0
    }
    initGame()
}
// Change food position In The Game
const changeFoodPosition=()=> {
    // Passing Value from 0 to 29 but in the Gird we use 30 so we add this one
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
const handleGameOver=()=>{
    clearInterval(setIntervalId);
    alert("Game Over Press OKay to replay....");
    location.reload();
}
// Running the game
const initGame=()=>{
    if(gameOver) return handleGameOver()
    playBoard.innerHTML=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
    // This loop shifts each body segment forward, making room for the new head position.
    for(let i=snakeBody.length-1;i>0 ; i--) {
        snakeBody[i] = snakeBody[i - 1]//shifting forward the value of elements in the snake body by one
    }
    // update the Snake Position
    snakeBody[0]=[snakeX,snakeY];// Set the Head Snake position as the First value of the body
    snakeX+=velocityX;
    snakeY+=velocityY;
    // checking if the snake eat the food
    if(snakeX===foodX && snakeY===foodY ) {
        snakeBody.push([foodX,foodY]);// push food position to the snake body Array;
        changeFoodPosition();
        score++;
        scoreText.innerText=`Score:${score}`
    }
    //change the length of the Snake after Eating food
    for (let i=0;i<snakeBody.length ; i++) {
        playBoard.innerHTML += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        if(i!==0 && snakeBody[0][0]===snakeBody[i][0] && snakeBody[0][1]===snakeBody[i][1]){
            gameOver=true;
        }
    }
    // Hande if the snake Git In wil or hem self
    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30) gameOver=true

}
setIntervalId=setInterval(initGame,200+score);
changeFoodPosition();
// Move Snake
document.addEventListener("keydown",changeSnakePosition)

