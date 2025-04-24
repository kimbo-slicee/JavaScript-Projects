const cardWrapper=document.querySelector(".cards-wrapper");
const track=document.querySelector(".slider-track")
const container=document.querySelector(".container")
const notes=document.querySelectorAll(".note");
const left=document.querySelector(".left");
const right=document.querySelector(".right");
// changing sides based on arrows buttons
const createCard=(index)=>{
    return `
        <div class="card">
                <div class="card-head">
                    <img src="images/nft${index}.jpg" alt="nft1.jpg"/>
                </div>
                <div class="card-body">
                    <h1>Monkey-Nft-1</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <button>Bay Now <span class="material-symbols-outlined shopping_cart">remove_shopping_cart</span></button>
                </div>
            </div>
    `;
}
const addCards=()=>{
        track.innerHTML=''
        for(let i=1;i<=6 ; i++){
        track.innerHTML+=createCard(i)
        }

}
addCards()
left.addEventListener("click",()=>{
    console.log("left")
})
right.addEventListener("click",()=>{
    console.log("right")
})
// handel animation timeEnd

// const track = document.querySelector('.slider-track');

// Listen for when the animation ends (only once, since it's not infinite)
// track.addEventListener("animationend", () => {
//     console.log("Animation completed!");
//
//     // Add the hide class when the animation ends
//     track.classList.add("hide");
//
//     // After 1 second, replace hide with show to reset visibility
//     setTimeout(() => {
//         track.classList.replace("hide", "show");
//     }, 1000); // Delay of 1 second
// });

