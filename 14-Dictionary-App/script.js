// DOM Element References
const wrapper = document.querySelector(".wrapper");
const searchInput = document.querySelector("input");
const textInfo = document.querySelector(".info-text");
const spinner = document.querySelector(".spinner");
const searchIcon = document.querySelector(".search i");
const xIcon=document.querySelector(".search .fa-xmark");
let word='';
let isLoading = false;
let activeItem='adjective';
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
    const div=document.createElement("div");
    div.className="content";
    // Append the word details
    ul.appendChild(generateWordDetails(response));
    ul.appendChild(div);
    div.appendChild(displayMeaning(response));
    // Append to the wrapper
    wrapper.appendChild(ul);
};

// Function to generate the word header with part of speech
const generateWordDetails = ({ word, meanings ,phonetics}) => {
    // create html elements instead of returning html template
    const li =document.createElement("li");
    li.className="word"
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "details";
    const wordP = document.createElement("p");
    wordP.textContent = word;
    detailsDiv.appendChild(wordP);

    meanings.forEach(({ partOfSpeech }) => {
        const span = document.createElement("span");
        span.textContent = partOfSpeech;
        detailsDiv.appendChild(span);
        span.addEventListener("click",()=> {
            activeItem = span.textContent;
        })
    });

    const volumeIcon = document.createElement("i");
    volumeIcon.className = "fa-solid fa-volume-high";
    volumeIcon.addEventListener("click", () => audioPlayer(phonetics));

// Compose
    li.appendChild(detailsDiv);
    li.appendChild(volumeIcon);
    return li;
};
const audioPlayer = (phonetics) => {
    const audioUrl = phonetics.find(p => p.audio)?.audio;
    if (!audioUrl) {
        alert("No audio available.");
        return;
    }
    const audioObject = new Audio(audioUrl);
    audioObject.play();
};
const displayMeaning = ({ meanings }) => {
    const li = document.createElement("li");
    li.className = "meaning";

    const div = document.createElement("div");
    div.className = "details";

    const heading = document.createElement("p");
    heading.textContent = "Meaning";
    div.appendChild(heading);

    const filteredMeanings = meanings
        .filter(({ partOfSpeech }) => partOfSpeech === activeItem)
        .flatMap(({ definitions }) => definitions);

    if (filteredMeanings.length === 0) {
        const span = document.createElement("span");
        span.textContent = "No definitions available.";
        div.appendChild(span);
    } else {
        filteredMeanings.forEach(({ definition }) => {
            const span = document.createElement("span");
            span.textContent = definition;
            div.appendChild(span);
        });
    }

    li.appendChild(div);
    return li;
};




// Event Listeners
searchInput.addEventListener("keydown", handleSearch);
searchIcon.addEventListener("click", handleSearch);
xIcon.addEventListener("click",cleanInput)

