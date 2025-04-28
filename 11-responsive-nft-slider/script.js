const track = document.querySelector(".slider-track");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const dots=document.querySelector(".dots-wrapper");
const totalCards=9;
const cardsPerView = 3;
const slideStep = 3;
let currentIndex = cardsPerView; // Start from the first real card (after clones)
let isTransitioning = false;
let spans=[];
// Create Card
const createCard = (index) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <div class="card-head">
            <img src="images/nft${index}.jpg" alt="nft${index}.jpg"/>
        </div>
        <div class="card-body">
            <h1>Monkey-Nft-${index}</h1>
            <p>Lorem ipsum dolor sit amet</p>
            <button>Buy Now <span class="material-symbols-outlined shopping_cart">remove_shopping_cart</span></button>
        </div>
    `;
    return div;
};
const setupCarousel = () => {
    track.innerHTML = '';
    const fragment = document.createDocumentFragment();
    // Clone last N cards (to appear at start)
    const lastCardsComment=document.createComment("Clone last N cards (to appear at start)");
    fragment.appendChild(lastCardsComment);
    for (let i = totalCards - cardsPerView + 1; i <= totalCards; i++) {
        fragment.appendChild(createCard(i));
    }
    // Original cards
    const originalCardsComment=document.createComment("Original Cards");
    fragment.appendChild(originalCardsComment);
    for (let i = 1; i <=totalCards; i++) {
        fragment.appendChild(createCard(i));
    }
    // Clone first N cards (to appear at end)
    const firstCardsComment=document.createComment("Clone first 3 cards to appear at end")
    fragment.appendChild(firstCardsComment);
    for (let i = 1; i <= cardsPerView; i++) {
        fragment.appendChild(createCard(i));
    }
    track.appendChild(fragment);
    // Jump to first real 3 slides
    track.style.transform = `translateX(-100%)`;
};
const handleTransitionEnd = () => {
    // this one give me the total cards withe colones 6 cards cloned
    if (currentIndex === 0 || currentIndex === totalCards + cardsPerView) {
        // ✅ This condition checks if we are on a CLONED slide:
        // currentIndex === 0  → cloned slides from the END (before the real first card)
        // currentIndex === totalCards + cardsPerView → cloned slides from the START (after the real last card)
        track.style.transition = 'none'; // Disable animation temporarily to "jump" instantly
        if (currentIndex === 0) {
            currentIndex = totalCards; // ↩️ Jump to the REAL last group
        } else if (currentIndex === totalCards + cardsPerView ) {
            currentIndex = cardsPerView; // 🔁 Jump back to the REAL first group
        }
        // 🧠 Use requestAnimationFrame to apply transform in the *next frame* (avoids visual glitches)
        requestAnimationFrame(() => {
            track.style.transform = `translateX(-${(100 / cardsPerView) * currentIndex}%)`;

            //Re-enable transition for future movements in the next frame
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                isTransitioning = false;
            });
        });
    } else {
        // ✅ No reset needed, just unlock interaction
        isTransitioning = false;
    }

};
const slideTo = (index) => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${(100 / cardsPerView) * currentIndex}%)`;
    console.log("current Index:"+index)
    console.log("translateX value:"+ (100 / cardsPerView) * currentIndex);
};

left.addEventListener("click", () => {
    slideTo(currentIndex - slideStep);
    activePoint()
});
right.addEventListener("click", () => {
    slideTo(currentIndex + slideStep);
    activePoint()
});
track.addEventListener("transitionend", handleTransitionEnd);
const showDots=()=>{
    const dotsCounter=Math.floor(totalCards / cardsPerView);
    const elementFragment=document.createDocumentFragment();
    for(let i=currentIndex  ; i<=totalCards; i+=3){
    const span =document.createElement("span");
    span.setAttribute("key",i);
    elementFragment.appendChild(span);
    }
    dots.appendChild(elementFragment);
    spans=dots.querySelectorAll("span")
}

// handel points
const activePoint=()=>{
    spans.forEach((ele)=>{
        ele.classList.remove("active");
      if(Number(ele.getAttribute("key"))===currentIndex){
          ele.classList.add("active");
      }
    })
}
// start
setupCarousel();
showDots();
activePoint();

