const startBtn=document.querySelectorAll(".options button");
const selectBox=document.querySelector(".select-box");
const playBoard=document.querySelector(".play-board");
const slider=document.querySelector(".slider");
const boxes=document.querySelectorAll("section span");
let player=''
startBtn.forEach((ele,idnex)=>{
    ele.addEventListener("click",()=>{
        player=ele.attributes[1].value;
        if(player==="O"){
            slider.style.transform="translateX(100%)";
        }
        selectBox.style.display="none";
        setTimeout(()=>{
            playBoard.style.display="block"
        },300);

    })
})
//
const randomPlayer=()=>{

}
const gameStart=()=>{
    boxes.forEach((ele,index)=>{
             console.log(ele.childElementCount)
                ele.addEventListener("click",()=>{
                if(player==="O"){
                ele.innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                `
                }else {
                    ele.innerHTML=
                   `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#e3e3e3">
                        <path
                            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`

                }
            })
    })
}

gameStart();
/*
* 1-
* 2-
* 3-
* */
