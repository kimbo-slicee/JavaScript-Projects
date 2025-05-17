// DOM Element References
const DOM = {
    wrapper: document.querySelector(".wrapper"),
    searchInput: document.querySelector("input"),
    textInfo: document.querySelector(".info-text"),
    spinner: document.querySelector(".spinner"),
    searchIcon: document.querySelector(".search i"),
    xIcon: document.querySelector(".search .fa-xmark"),
    resultsWrapper: document.getElementById("results")

};

let word = '';
let isLoading = false;
let activeItem = 'adjective';

// Toggle Loading State
const toggleLoading = (state) => {
    isLoading = state;
    DOM.spinner.style.display = isLoading ? "grid" : "none";
    DOM.textInfo.style.display = isLoading ? "none" : "block";
};

// Clean input
const cleanInput = () => {
    DOM.searchInput.value = '';
    DOM.xIcon.style.display = 'none';
};

// Utils
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const toLowerCase = str => str.charAt(0).toLowerCase() + str.slice(1);

// Handle API Response
const handelAPIResponse = (allEntries) => {
    const bestEntry = allEntries.reduce((best, current) => {
        const bestCount = best.meanings.reduce((sum, m) => sum + m.definitions.length, 0);
        const currentCount = current.meanings.reduce((sum, m) => sum + m.definitions.length, 0);
        return currentCount > bestCount ? current : best;
    });
    displayData(bestEntry);
};

// Handle Search
const handleSearch = (e) => {
    const isEnter = e.key === "Enter";
    const isClick = e.type === "click";
    word = DOM.searchInput.value.trim();
    DOM.xIcon.style.display = word.length >= 1 ? "block" : "none";

    if ((isEnter || isClick) && word) {
        cleanInput();
        toggleLoading(true);
        fetchData(word)
            .then(handelAPIResponse)
            .catch(displayError);
    }
};

// Fetch Data
const fetchData = (word) => {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", URL);
        xhr.onload = () => {
            toggleLoading(false);
            if (xhr.status === 200) {
                setTimeout(() => resolve(JSON.parse(xhr.responseText)), 500);
            } else {
                reject(`Error: ${xhr.status}`);
            }
        };
        xhr.onerror = () => {
            toggleLoading(false);
            reject("Network error");
        };
        xhr.send();
    });
};

// Display Error
const displayError = (error) => {
    console.error(error);
    DOM.textInfo.innerHTML = `No definition found for the word <b>${word}</b>`;
};

// Display API Data
const displayData = (response) => {
    DOM.resultsWrapper.innerHTML="";
    DOM.textInfo.style.display = "none";
    const ul = document.createElement("ul");
    ul.style.display = "block";
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";
    ul.appendChild(generateWordDetails(response));
    ul.appendChild(contentDiv);
    contentDiv.appendChild(displayMeaning(response));
    contentDiv.appendChild(generateListSection("Example", extractExamples(response)));
    contentDiv.appendChild(generateListSection("Synonyms", extractList(response, "synonyms")));
    contentDiv.appendChild(generateListSection("Antonyms", extractList(response, "antonyms")));
    DOM.resultsWrapper.appendChild(ul)
};

// Generate Word Details
const generateWordDetails = ({ word, meanings, phonetics }) => {
    const li = document.createElement("li");
    li.className = "word";

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "details";

    const wordP = document.createElement("p");
    wordP.textContent = word;
    detailsDiv.appendChild(wordP);

    meanings.forEach(({ partOfSpeech }) => {
        const span = document.createElement("span");
        span.textContent = partOfSpeech;
        span.addEventListener("click", () => {
            activeItem = span.textContent;
            span.classList.add("active");
        });
        detailsDiv.appendChild(span);
    });

    const volumeIcon = document.createElement("i");
    volumeIcon.className = "fa-solid fa-volume-high";
    volumeIcon.addEventListener("click", () => audioPlayer(phonetics));

    li.appendChild(detailsDiv);
    li.appendChild(volumeIcon);
    return li;
};

// Audio Player
const audioPlayer = (phonetics) => {
    const audioUrl = phonetics.find(p => p.audio)?.audio;
    if (!audioUrl) {
        alert("No audio available.");
        return;
    }
    new Audio(audioUrl).play();
};

// Display Meaning
const displayMeaning = ({ meanings }, strLength = 5) => {
    const li = document.createElement("li");
    li.className = "meaning";

    const div = document.createElement("div");
    div.className = "details";

    const heading = document.createElement("p");
    heading.textContent = "Meaning";
    div.appendChild(heading);

    const span = document.createElement("span");
    span.textContent = summarizeMeanings(meanings, strLength);
    div.appendChild(span);
    li.appendChild(div);

    return li;
};

// Summarize Meanings
const summarizeMeanings = (meanings, strLength = 5, part = activeItem) => {
    const definitions = meanings
        .filter(m => m.partOfSpeech === part)
        .flatMap(m => m.definitions.map(d => d.definition))
        .slice(0, strLength)
        .join('')
        .split(',')
        .join('')
        .split('.');

    if (!definitions.length) return "No definition found.";

    const [first, ...rest] = definitions;
    return [capitalize(first), ...rest.map(capitalize)].join(' ') + '...';
};

// Generate List Section (Reusable)
const generateListSection = (title, items) => {
    const li = document.createElement("li");
    li.className = title.toLowerCase();

    const div = document.createElement("div");
    div.className = "details";

    const p = document.createElement("p");
    p.textContent = title;
    div.appendChild(p);

    const content = document.createElement("div");
    content.className = "list";

    if (items.length > 0) {
        items.forEach(text => {
            const span = document.createElement("span");
            span.textContent = text;
            content.appendChild(span);
        });
    } else {
        const span = document.createElement("span");
        span.textContent = `There are no ${title.toLowerCase()}s for this part of speech.`;
        content.appendChild(span);
    }

    div.appendChild(content);
    li.appendChild(div);
    return li;
};

// Extract Examples
const extractExamples = ({ meanings }) => {
    return meanings
        .filter(m => m.partOfSpeech === activeItem)
        .flatMap(m => m.definitions)
        .filter(d => d.example)
        .map(d => d.example);
};

// Extract Synonyms / Antonyms
const extractList = ({ meanings }, type) => {
    return meanings
        .filter(m => m.partOfSpeech === activeItem)
        .flatMap(m => m[type] || [])
        .slice(0, 5);
};

// Event Listeners
DOM.searchInput.addEventListener("keydown", handleSearch);
DOM.searchIcon.addEventListener("click", handleSearch);
DOM.xIcon.addEventListener("click", cleanInput);
