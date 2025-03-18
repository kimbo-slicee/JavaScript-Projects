const keyboard=document.querySelector(".keyboard");
const hintText=document.querySelector(".hint-text b");
const wordDisplay=document.querySelector(".word-display");
const guessesText=document.querySelector(".guesses-text b");
const gameModel=document.querySelector(".game-model")
const hangmanImage=document.querySelector("[alt='hangman-img']");
const playAgain=document.querySelector(".play-again");
let currentWord, counter=0, correctWords=[]
const MAX_GUESSES=6;
//
const gameOver=(isVictory)=>{
    setTimeout(()=>{
        const modelText= isVictory?"You found the word":"the correct Word was";
        gameModel.querySelector("img").src=`assets/images/${isVictory?'victory':'lost'}.gif`;
        gameModel.querySelector("h4").innerText=isVictory?'Congrats!':'Game Over';
        gameModel.querySelector("p").innerHTML=`${modelText}<b> ${currentWord} </b>`;
        gameModel.classList.add("show");
    },500)
}
const restGame=()=>{
    // Resting All Gam Variables And UI elements
    correctWords.length=0;
    counter=0;
    hangmanImage.src=`assets/images/hangman-${counter}.svg`;
    wordDisplay.innerHTML=currentWord.split('').map(_=>`<li class="letter"></li>`).join('');
    document.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    gameModel.classList.remove("show");
}

// get random Words and hint from random words List
const getRandomWords=()=>{
    let {word,hint}=wordList[Math.floor(Math.random()*wordList.length)];
    hintText.innerHTML=`Hint:<b>${hint}</b>`;
    currentWord=word;
    restGame()
}
getRandomWords();
// Game Logic
const inGame=(button,clickedWord)=>{
        // Checking if clickedLetter is Existe on the Current word
        if(currentWord.includes(clickedWord)){
            [...currentWord].forEach((char,index)=>{
                    if(char===clickedWord){
                    correctWords.push(char);
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                    wordDisplay.querySelectorAll("li")[index].innerText=char;
                }
            })
        }else {
            counter++;
            console.log(correctWords.length,currentWord.length);
            hangmanImage.src=`assets/images/hangman-${counter}.svg`;
        }
        // calling Game Over Function if any of this conditions meets
        if(counter===MAX_GUESSES) return  gameOver(false);
        if(correctWords.length===currentWord.length) return gameOver(true);
        button.disabled=true;
        guessesText.innerHTML=`${counter}/${MAX_GUESSES}`;

};

// create KeyBord buttons dynamically and Add key Bord Listener
for(let i=97 ;i<=122 ;i++){
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboard.appendChild(button)
    button.addEventListener("click",e=>inGame(e.target,String.fromCharCode(i)))
}
playAgain.addEventListener("click",()=>getRandomWords());
