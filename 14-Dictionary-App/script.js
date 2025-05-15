// DOM Element References
const wrapper = document.querySelector(".wrapper");
const searchInput = document.querySelector("input");
const textInfo = document.querySelector(".info-text");
const spinner = document.querySelector(".spinner");
const searchIcon = document.querySelector(".search i");
const xIcon=document.querySelector(".search .fa-xmark");
let word='';
let isLoading = false;
// Toggle Loading State
const toggleLoading = (state) => {
    isLoading = state;
    spinner.style.display = isLoading ? "grid" : "none";
    textInfo.style.display = isLoading ? "none" : "block";
};
const cleanInput=()=>{
    searchInput.value=''
    xIcon.style.display='none'
}
// sense the api response return different entry's i need to chose the largest object that's contain a loot of
// meanings
const handelAPIResponse=(allEntries)=>{
    const bestEntry =  allEntries.reduce((best, current) => {
    const bestCount = best.meanings.reduce((sum, m) => sum + m.definitions.length, 0);
    const currentCount = current.meanings.reduce((sum, m) => sum + m.definitions.length, 0);
    return currentCount > bestCount ? current : best;
});
    displayData(bestEntry)
}
const handleSearch = (e) => {
    const isEnter = e.key === "Enter";
    const isClick = e.type === "click";
    word = searchInput.value.trim();
    word.length>=1?xIcon.style.display="block":xIcon.style.display="none"
    if ((isEnter || isClick) && word) {
        cleanInput()
        toggleLoading(true);
        fetchData(word)
            .then(handelAPIResponse)
            .catch(displayError);
    }
};


// Fetch Data from API
const fetchData = (word) => {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", URL);
        xhr.onload = () => {
            if (xhr.status === 200) {
                setTimeout(() => {
                    resolve(JSON.parse(xhr.responseText));
                }, 500);
            } else {
                reject(`Error: ${xhr.status}`);
            }
            toggleLoading(false);
        };
        xhr.onerror = () => {
            toggleLoading(false);
            reject("Network error");
        };
        xhr.send();
    });
};

// Display Errors
const displayError = (error) => {
    console.error(error)
    textInfo.innerHTML=`No definition found for the word <b>${word}</b>`;
};

//  Display API Data
const displayData = (response) => {
    textInfo.style.display = "none";
    const ul = document.createElement("ul");
    ul.style.display = "block";
    // Append the word details
    ul.appendChild(generateWordDetails(response));
    // Append to the wrapper
    wrapper.appendChild(ul);
};

// Function to generate the word header with part of speech
const generateWordDetails = ({ word, meanings ,phonetics}) => {
    const li =document.createElement("li");
    li.className="word"
    const partOfSpeechList = meanings.map(({ partOfSpeech }) =>
        `<span>${partOfSpeech}</span>`).join(' ');
    li.innerHTML= `
      <div class="details">
        <p>${word}</p>
        ${partOfSpeechList}
      </div>
      <i class="fa-solid fa-volume-high"></i>
  `;
    const audio=li.querySelector(".fa-volume-high");
    audio.addEventListener("click",()=>audioPlayer(phonetics));
    return li;
};
 const audioPlayer=([{audio=undefined}])=>{
     const audioObject=new Audio(audio)
     audioObject.play();
 }


// Event Listeners
searchInput.addEventListener("keydown", handleSearch);
searchIcon.addEventListener("click", handleSearch);
xIcon.addEventListener("click",cleanInput)

