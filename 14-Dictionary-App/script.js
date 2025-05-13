// DOM Element References
const wrapper = document.querySelector(".wrapper");
const ul = wrapper.querySelector("ul");
const searchInput = document.querySelector("input");
const textInfo = document.querySelector(".info-text");
const spinner = document.querySelector(".spinner");
const searchIcon = document.querySelector(".search i");
let isLoading = false;

// Toggle Loading State
const toggleLoading = (state) => {
    isLoading = state;
    spinner.style.display = isLoading ? "grid" : "none";
    textInfo.style.display = isLoading ? "none" : "block";
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

// 🧠 Handle Search Input
const handleSearch = (e) => {
    const isEnter = e.key === "Enter";
    const isClick = e.type === "click";
    const word = searchInput.value.trim();
    if ((isEnter || isClick) && word) {
        toggleLoading(true);
        fetchData(word)
            .then(displayData)
            .catch(displayError);
    }
};

//  Display API Data
const displayData = ([{ word, phonetics, meanings }]) => {
    createWordEntry({ word, phonetics, meanings });
};

// Display Errors
const displayError = (error) => {
    console.error(error);
    textInfo.textContent = "No definition found or a network error occurred.";
};

// Generate UI for Word Entry (placeholder)
const createWordEntry = ({ word, phonetics, meanings }) => {
    // Implementation goes here
    console.log("Word:", word);
    console.log("Phonetics:", phonetics);
    console.log("Meanings:", meanings);
};

// Event Listeners
searchInput.addEventListener("keypress", handleSearch);
searchIcon.addEventListener("click", handleSearch);
