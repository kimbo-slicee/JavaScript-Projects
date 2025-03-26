const cards =document.querySelectorAll(".card");
let selectedCards=[];
let canClick = true

// handel card click
const handleCardClick = (e) => {
    if (!canClick || selectedCards.includes(e.currentTarget) || e.currentTarget.classList.contains("matched")) {
        return;
    }
    e.currentTarget.classList.remove("flip");
    e.currentTarget.classList.add("clicked")
    // Extract the card's unique index from its image source
    let cardIndex = e.currentTarget.querySelector("img").src.match(/\d+/gi)[2];
    if(canClick) selectedCards.push({ element: e.currentTarget, index: cardIndex });
    if (selectedCards.length === 2) {
        if (selectedCards[0].index === selectedCards[1].index) {
            selectedCards = [];
        } else {
            console.log("false");
            // Store references to the selected elements
            let [firstCard, secondCard] = [selectedCards[0].element, selectedCards[1].element];
            setTimeout(() => {
                firstCard.classList.add("flip");
                secondCard.classList.add("flip");
            }, 500);
            selectedCards = [];
        }
    }
};
// shoe card for 2s and flip cards
const startGame=()=>{
    setTimeout(()=>{
        // hide All card after 2s before staring the game
        cards.forEach(card=>{
            card.classList.add("flip");
            card.addEventListener("click",handleCardClick)
        },2000);
    })
}
startGame();

// shuffle card after every Game Loading
//  all the cards after Game Ends

