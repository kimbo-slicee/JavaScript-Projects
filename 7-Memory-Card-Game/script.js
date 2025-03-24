const cards =document.querySelectorAll(".card");
let selectedCards=[];
let canClick = true

// handel card click
const handelCardClick=(e)=>{
    if (!canClick || selectedCards.includes(e.currentTarget) || e.currentTarget.classList.contains("matched")) {
        return;
    }
    e.currentTarget.classList.remove("flip");
    let cardIndex=e.currentTarget.querySelector("img").src.match(/\d+/gi)[2];
    console.log(cardIndex)
    selectedCards.push(cardIndex)
    if(selectedCards.length===2){
        if(selectedCards[0]===selectedCards[1]){
            e.currentTarget.classList.add("flip");
            selectedCards=[];
        }else {
            e.currentTarget.classList.remove("flip");
            selectedCards=[];
        }
    }
}
const startGame=()=>{
    setTimeout(()=>{
        // hide All card after 2s before staring the game
        cards.forEach(card=>{
            card.classList.add("flip");
            card.addEventListener("click",handelCardClick)
        },2000);
    })
}
startGame();

// shuffle card after every Game Loading
//  all the cards after Game Ends

