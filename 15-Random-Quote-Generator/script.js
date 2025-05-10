/*this project it's simple so i want to add som free styling like (light and Dark Mode random colors every loading
 and localStorage)the main Goal it's to practice all the ideas  ✈*/
const card=document.querySelector(":root");
const themCheckBox=document.querySelector("input[type='checkbox']")
const btn=document.querySelector("button[type='button']");
const quote=document.querySelector(".quote");
const author=document.querySelector(".author");
const tweetIcon = document.querySelector('.fa-twitter');
const copyIcon=document.querySelector(".fa-copy");
const speakIcon=document.querySelector(".speak")
// change bg color every load
const randomColors=()=>{
    // we want a random colors except dark and white bcs of dark and light mode
    let randomColor=`rgba(${Math.trunc(Math.random()*255)},${Math.trunc(Math.random()*255)},${Math.trunc(Math.random()*255)})`;
      card.style.setProperty('--bg-color',randomColor);
}
// dark mode and random colors mode
const changeMode = () => {
    const darkTheme = "rgba(0,0,0)";
     themCheckBox.addEventListener("input",()=>{
         themCheckBox.checked?card.style.setProperty('--bg-color',darkTheme):randomColors();
     })
};

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
    quote.innerText='';
    author.innerText='';
    const randomQuote= await getData().then((quote=>JSON.parse(quote.contents)));
    quote.textContent=randomQuote[0].q;
    author.textContent=randomQuote[0].a;
}
// generate new Quotes
const newQuote=()=>{
    btn.addEventListener("click",()=>{
        quotes()
    })
}
// search for the Quote in Twitter
const handelTweetClick=()=>{
        const tweet = `"${quote.innerText}" — ${author.innerText}`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}&hashtags=quotes,inspiration`;
        window.open(tweetUrl, "_blank"); // opens in new tab
}

// Copy the Quote
const handelCopyClick=()=>{
    const quoteText=quote.textContent;
    if(!quoteText) return;
    navigator.clipboard.writeText(quoteText).then(()=>{
        console.log("quote Copied")
    }).catch(()=>{
        console.error("pls click again")
    })
}
const handelSpeakClick = () => {
    const quoteText = quote.textContent;
    const authorName = author.textContent;
    const utterance = new SpeechSynthesisUtterance(`${quoteText} ${authorName}`);
    utterance.lang = 'en-US';
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.name === "Google UK English Female");
    speechSynthesis.cancel(); // stop anything currently speaking
    speechSynthesis.speak(utterance);
}
// handel Icons Clicked
copyIcon.addEventListener("click",handelCopyClick);
tweetIcon.addEventListener("click",handelTweetClick);
speakIcon.addEventListener("click",handelSpeakClick)

quotes();
newQuote()
changeMode();

