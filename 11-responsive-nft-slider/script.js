const cardsWrapper = document.querySelector(".cards-wrapper");
const track = document.querySelector(".slider-track");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const totalCards = 6;
const cardsPerView = 3;
const slideStep = cardsPerView;
let currentIndex = cardsPerView; // Start from the first real card (after clones)
let isTransitioning = false;

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
    for (let i = totalCards - cardsPerView + 1; i <= totalCards; i++) {
        fragment.appendChild(createCard(i));
    }
    // Original cards
    for (let i = 1; i <= totalCards; i++) {
        fragment.appendChild(createCard(i));
    }
    // Clone first N cards (to appear at end)
    for (let i = 1; i <= cardsPerView; i++) {
        fragment.appendChild(createCard(i));
    }

    track.appendChild(fragment);

    // Set card width (3 per view)
    const cards = track.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.flex = `0 0 ${100 / cardsPerView}%`;
    });

    // Jump to first real slide
    track.style.transform = `translateX(-${(100 / cardsPerView) * currentIndex}%)`;
};

const slideTo = (index) => {
    if (isTransitioning) return;

    isTransitioning = true;
    track.style.transition = 'transform 0.5s ease';
    currentIndex = index;
    track.style.transform = `translateX(-${(100 / cardsPerView) * currentIndex}%)`;
};

const handleTransitionEnd = () => {
    const totalSlides = totalCards + 2 * cardsPerView;

    // Disable animation just before snapping
    if (currentIndex === 0 || currentIndex === totalCards + cardsPerView) {
        track.style.transition = 'none';

        if (currentIndex === 0) {
            currentIndex = totalCards;
        } else if (currentIndex === totalCards + cardsPerView) {
            currentIndex = cardsPerView;
        }

        // Use requestAnimationFrame to ensure transform is applied without flicker
        requestAnimationFrame(() => {
            track.style.transform = `translateX(-${(100 / cardsPerView) * currentIndex}%)`;

            // Re-enable transition for the next slide
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                isTransitioning = false;
            });
        });
    } else {
        isTransitioning = false;
    }
};


left.addEventListener("click", () => {
    slideTo(currentIndex - slideStep);
});

right.addEventListener("click", () => {
    slideTo(currentIndex + slideStep);
});

track.addEventListener("transitionend", handleTransitionEnd);

setupCarousel();
