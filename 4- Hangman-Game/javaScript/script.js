const keyboard=document.querySelector(".keyboard");
const hintText=document.querySelector(".hint-text b");
const wordDisplay=document.querySelector(".word-display")
// get random Words and hint from random words List
const getRandomWords=()=>{
    let {word,hint}=wordList[Math.floor(Math.random()*wordList.length)];
    hintText.innerHTML=`Hint:<b>${hint}</b>`;
    wordDisplay.innerHTML=word.split('').map(_=>`<li class="letter"></li>`).join('')
}
getRandomWords();
//
const inGame=()=>{

}
// create KeyBord buttons dynamically and Add key Bord Listener
for(let i=97 ;i<=122 ;i++){
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboard.appendChild(button)
    button.addEventListener("click",e=>inGame(e.target,String.fromCharCode(i)))
}
