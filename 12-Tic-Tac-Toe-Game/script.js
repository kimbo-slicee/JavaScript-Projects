const startBtn=document.querySelectorAll(".options button");
const playersTurn=document.querySelectorAll(".players span")
const selectBox=document.querySelector(".select-box");
const playBoard=document.querySelector(".play-board");
const slider=document.querySelector(".slider");
const boxes=document.querySelectorAll("section span");
let player=''

const OSvgIcon=()=>{
    return `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" font-weight="800"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
    `
}
const XSvgIcon=()=>{
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" font-weight="800">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
    </svg>`
}
// Move slide to the Player Turn
const moveSlide=()=>{
    playersTurn.forEach((span)=>{
        if(player==="X" && span.classList.contains("Xturn")){
            span.classList.add("active");
            slider.style.transform="translateX(0)";
        }else if(player==="O" && span.classList.contains("Oturn")){
            slider.style.transform="translateX(100%)";
            span.classList.add("active");
        }else {
            span.classList.remove("active")
        }
    })
}
// check Winner
const checkWinner=()=>{}
// Boot turn
const bootTurn=()=>{
   setTimeout(()=>{
   const randomBox= boxes[Math.floor(Math.random() * boxes.length)];
   if(!randomBox.classList.contains("clicked") && player==="X"){
       randomBox.innerHTML=XSvgIcon();
       randomBox.classList.add("clicked");
       player="O"
   }else if(!randomBox.classList.contains("clicked") && player==="O"){
       randomBox.innerHTML=OSvgIcon();
       randomBox.classList.add("clicked");
       player="X"
   }else {
       bootTurn()
   }
     moveSlide();
   },500)
}
// Handel user Click;
const handelBoxClicked=()=>{
/*
* 1-user click on box
* 2-showing icon based on player icons selected
* 3-change turn to boot turn
* 4-move slide to active turn
* 5-add class clicked on the box clicked by user or the Boot
*/

boxes.forEach((ele)=>{
    ele.addEventListener("click",()=>{
        if(player==="X"){
            ele.innerHTML=XSvgIcon();
            ele.classList.add("clicked");
            player="O"
        }else if(player==="O"){
            ele.classList.add("clicked");
            ele.innerHTML=OSvgIcon();
            player="X"
        }
        bootTurn();
        moveSlide();
    })
})

}
//Handel select Player X || O
startBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        btn.classList.contains("playerX")?player="X":player="O"
        setTimeout(()=>{
            selectBox.style.display="none";
            playBoard.style.display="block"
        },300);
        handelBoxClicked();
        moveSlide();
    })
})