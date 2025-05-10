/*this project it's simple so i want to add som free styling like (light and Dark Mode random colors every loading
 and localStorage)the main Goal it's to practice all the ideas  ✈*/
const card=document.querySelector(":root");
const modesIcons=document.querySelectorAll(".theme i");
const theme=document.querySelector(".theme");
// change bg color every load
const randomColors=()=>{
    // we want a random colors except dark and white bcs of dark and light mode
    let randomColor=`rgba(${Math.trunc(Math.random()*255)},${Math.trunc(Math.random()*255)},${Math.trunc(Math.random()*255)})`;
      card.style.setProperty('--bg-color',randomColor);
}
// dark mode and random colors mode
const changeMode=()=>{
    const darkTheme="rgba(0,0,0)";
    modesIcons.forEach((icon)=>addEventListener("click",()=>{
        icon.classList.toggle("active");
        theme.querySelector("i.fa-sun").classList.contains("active")
            ?randomColors()
            :card.style.setProperty('--bg-color',darkTheme);
    }));
}
// Get Random Quotes
const getData=async ()=>{
    try {
        const call = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random"))
        if (!call.ok) throw new Error(`Response status: ${call.status}`);
        return  await call.json()
    } catch (error) {
        console.error(error.message);
    }
}
const quotes= async ()=>{
    const randomQuote= await getData().then((quote=>JSON.parse(quote.contents)));
    let quote=document.querySelector(".quote");
    let author=document.querySelector(".author");
    quote.textContent=randomQuote[0].q;
    author.textContent=randomQuote[0].a;
}
quotes();
changeMode();

