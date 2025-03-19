let playBoard=document.querySelector(".play-board");
let foodX=10, foodY=10,snakeY=5,snakeX=2;
let velocityX=0,velocityY=0;
let snakeBody=[];
// change Snake when press on keyBoard
const changeSnakePosition=(event)=>{
    // ArrowDown,ArrowUp ArrowRight ArrowLeft
    if(event.key==="ArrowDown"){
        velocityX=0
        velocityY=1
    }else if(event.key==="ArrowUp"){
        velocityX=0
        velocityY=-1
    }else if(event.key==="ArrowRight"){
        velocityX=1
        velocityY=0
    }else if(event.key==="ArrowLeft"){
        velocityX=-1
        velocityY=0
    }
    initGame()
}
// change food position in every Load
const chaneFoodPosition=()=> {
    // Passing Value from 0 to 29 but in the Gird we use 30 so we add this one
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
//
const initGame=()=>{
    playBoard.innerHTML=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
    // update the Snake Position
    snakeBody[0]=[snakeX,snakeY];
    snakeX+=velocityX;
    snakeY+=velocityY;
    // checking if the snake eat the food
    if(snakeX===foodX && snakeY===foodY) {
        chaneFoodPosition();
        snakeBody.push([foodX,foodY]);// push food position ti the snake body Array
        console.log(snakeBody);
    }
    //
    for (let i=0;i<snakeBody.length ; i++){
    playBoard.innerHTML+=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    }

}
setInterval(initGame,200);
chaneFoodPosition();
// Move Snake
document.addEventListener("keydown",changeSnakePosition)
