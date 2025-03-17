const keyboard=document.querySelector(".keyboard");
const hintText=document.querySelector(".hint-text b");
const wordDisplay=document.querySelector(".word-display");
const guessesText=document.querySelector(".guesses-text b");
const hangmanImage=document.querySelector("[alt='hangman-img']")
let currentWord, counter=0
const MAX_GUESSES=6;
// get random Words and hint from random words List
const getRandomWords=()=>{
let {word,hint}=wordList[Math.floor(Math.random()*wordList.length)];
    hintText.innerHTML=`Hint:<b>${hint}</b>`;
    wordDisplay.innerHTML=word.split('').map(_=>`<li class="letter"></li>`).join('');
    currentWord=word;
}
getRandomWords();
//
const inGame=(button,clickedWord)=>{
        // Checking if clickedLetter is Existe on the Current word
        if(currentWord.includes(clickedWord)){
            [...currentWord].forEach((char,index)=>{
                if(char===clickedWord){
                    console.log(char)
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                    wordDisplay.querySelectorAll("li")[index].innerText=char;
                }
            })
        }else {
            counter++;
            hangmanImage.src=`assets/images/hangman-${counter}.svg`;
        }
        button.disabled=true;
        guessesText.innerHTML=`${counter}/${MAX_GUESSES}`
};


// create KeyBord buttons dynamically and Add key Bord Listener
for(let i=97 ;i<=122 ;i++){
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboard.appendChild(button)
    button.addEventListener("click",e=>inGame(e.target,String.fromCharCode(i)))
}
