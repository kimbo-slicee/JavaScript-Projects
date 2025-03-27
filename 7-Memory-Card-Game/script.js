const cards = document.querySelectorAll(".card");
let cardOne, cardTwo;
let dispelledClick = false; // Prevents multiple clicks when two cards are being checked
let matchedCards = 0; // Keeps track of matched pairs

const shuffleCards = () => {
    // Create an array of numbers from 1 to 8 (representing card pairs)
    let indexes = Array.from({ length: 8 }, (_, i) => i + 1);
    // Duplicate the numbers to form pairs and shuffle them randomly
    let randomIndex = [...indexes, ...indexes].sort(() => Math.random() > 0.5 ? 1 : -1);
    console.log(randomIndex);

    // Reset game variables
    cardOne = cardTwo = '';
    matchedCards = 0;

    // Assign shuffled images to the cards
    cards.forEach((card, index) => {
        card.classList.remove("flip"); // Ensure all cards are face down
        let imgSrc = card.querySelector("img");
        imgSrc.src = `assets/images/img-${randomIndex[index]}.png`;
        card.addEventListener("click", flipCard); // Add click event listener
    });
};

const matchCards = (imageSrcOne, imageSrcTwo) => {
    if (imageSrcOne === imageSrcTwo) { // Check if the two flipped cards match
        matchedCards++; // Increase the count of matched pairs
        if (matchedCards === 8) { // If all pairs are matched, shuffle and restart the game
            setTimeout(() => {
                return shuffleCards();
            }, 1000);
        }

        // Remove click event to prevent further interaction with matched cards
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        // Reset selected card variables
        cardOne = cardTwo = "";
        dispelledClick = false;
        return;
    }

    // If cards don't match, apply a shake effect briefly
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    // Remove shake effect and flip cards back after a delay
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        dispelledClick = false;
    }, 1200);
};

const flipCard = (e) => {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !dispelledClick) { // Ensure a different card is clicked and no ongoing check
        clickedCard.classList.add("flip"); // Flip the card

        if (!cardOne) {
            // If first card is not selected, set clicked card as first card
            return cardOne = clickedCard;
        }

        // If first card is already selected, set clicked card as second card
        cardTwo = clickedCard;
        dispelledClick = true; // Prevent further clicks until match check is complete

        // Get image sources of both selected cards
        let cardOneImage = cardOne.querySelector("img").src;
        let cardTwoImage = cardTwo.querySelector("img").src;

        // Check if the selected cards match
        matchCards(cardOneImage, cardTwoImage);
    }
};

// Initialize the game by shuffling cards
shuffleCards();

// Attach event listener to each card for flipping
cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});
