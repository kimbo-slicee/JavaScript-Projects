const startBtn=document.querySelectorAll(".options button");
const playersTurn=document.querySelectorAll(".players span")
const selectBox=document.querySelector(".select-box");
const playBoard=document.querySelector(".play-board");
const slider=document.querySelector(".slider");
const boxes=document.querySelectorAll("section span");
const rePlayBtn=document.querySelector(".btn button");
console.log(rePlayBtn);
const resultBox=document.querySelector(".result-box");
let player='';
let isGameOver=false;


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
const showResultSlide=(winner)=>{
    playBoard.classList.replace("show","hide");
    resultBox.classList.add("show");
    resultBox.querySelector(".won-text span").innerText=winner;
}
// check Winner
const checkWinner=()=>{
    const winPatterns = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal TL-BR
        [2, 4, 6]  // diagonal TR-BL
    ];
    const icons = [...boxes].map(box => {
        if (box.innerHTML.includes("svg")) {
            return box.innerHTML.includes("path d=\"M480-80") ? "O" : "X";
        }
        return null;
    });
    for (let winner of winPatterns) {
        let [a,b,c]=winner;
        if (icons[a] && icons[a] === icons[b] && icons[a] === icons[c]) {
            showResultSlide(icons[a]);
            isGameOver=true;
            return;
        }
    }
}
// Boot turn
const bootTurn=()=>{
    if(isGameOver) return;
    const randomBox= boxes[Math.floor(Math.random() * boxes.length)];
    setTimeout(()=>{
   if(!randomBox.classList.contains("clicked") && player==="X"){
       randomBox.innerHTML=XSvgIcon();
       randomBox.classList.add("clicked");
       player="O"
   }else if(!randomBox.classList.contains("clicked") && player==="O"){
       randomBox.innerHTML=OSvgIcon();
       randomBox.classList.add("clicked");
       player="X"
   }else {
       if([...boxes].every(box=>box.classList.contains("clicked"))){
           alert("game over")
       }else{
       bootTurn()
       }
   }
     moveSlide();
   },500)
}
// Handel user Click;
const handelBoxClicked=()=>{
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
        setTimeout(()=>{
        checkWinner();
        },500);
    })
})

}
//Handel select Player X || O
startBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        btn.classList.contains("playerX")?player="X":player="O"
            selectBox.classList.replace("show","hide");
            setTimeout(()=>{
            playBoard.classList.add("show");
            },300)
        handelBoxClicked();
        moveSlide();
    })
})
const restart=()=>{
    player='';
    boxes.forEach(box=> {
        box.innerHTML = ``;
        box.classList.remove("clicked");
    });
    resultBox.classList.replace("show","hide");
    selectBox.classList.replace("hide","show");
}
// restart Game
rePlayBtn.addEventListener("click",restart)