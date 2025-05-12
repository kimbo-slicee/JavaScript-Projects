const wrapper = document.querySelector(".wrapper");
const ul = wrapper.querySelector("ul");
const searchInput = document.querySelector("input");
const textInfo = document.querySelector(".info-text");
const spinner = document.querySelector(".spinner");
let isLoading = false;

const createWordEntry=()=>{
    return`
            <li class="word">
                <div class="details">
                    <p>happy</p>
                    <span>adjective/'hapi/</span>
                </div>
                <i class="fa-solid fa-volume-high"></i>
            </li>
            <div class="content">
            <li class="meaning">
                <div class="details">
                    <p>Meaning</p>
                    <span>feeling or showing pleasure or contentment</span>
                </div>
            </li>
                <li class="example">
                    <div class="details">
                        <p>Example</p>
                        <span>feeling or showing pleasure or contentment</span>
                    </div>
                </li>
                <li class="synonyms">
                    <div class="details">
                        <p>Synonyms</p>
                        <div class="list">
                            <span>glad</span>
                            <span>contented</span>
                            <span>cheerful</span>
                            <span>joyful</span>
                        </div>
                    </div>
                </li>
            </div>
        </ul>`
}

const toggleLoading = () => {
    if (isLoading) {
        textInfo.style.display = "none";
        spinner.style.display = "grid";
    } else {
        spinner.style.display = "none";
    }
};

const fetchData = (word) => {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", URL);
        xhr.onload = () => {
            toggleLoading();
            if (xhr.status === 200) {
                setTimeout(() => {
                    isLoading = false;
                    resolve(JSON.parse(xhr.responseText));
                }, 500);
            } else {
                isLoading = false;
                reject(`Error: ${xhr.status}`);
            }
        };
        xhr.onerror = () => {
            isLoading = false;
            reject("Network error");
        };
        xhr.send();
    });
};

const displayData = (data) => {
    ul.style.display="block";
    toggleLoading();
    data.map(ele=>console.log(ele))
};

const displayError = (error) => {
    toggleLoading();
    console.error(error);
};

const handleSearch = (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
        isLoading = true;
        toggleLoading();
        fetchData(searchInput.value.trim())
            .then(displayData)
            .catch(displayError);
    }
};

searchInput.addEventListener("keypress", handleSearch);
