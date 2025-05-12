const wrapper=document.querySelector(".wrapper");
const searchInput=document.querySelector("input");
let isLogin=false

const loading=()=>{
    const spinner=document.querySelector(".spinner");
    const textInfo=document.querySelector(".info-text");
    if(isLogin){
    textInfo.style.display="none";
    spinner.style.display="grid";
    }
    spinner.style.display="none";
}
function getData(word) {
const URL=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();// XMLHttpRequest doesn't support promises by default
        xhr.open("GET", URL);
        xhr.onload = () => {
            loading();
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(`Error: ${xhr.status}`);
            }
        };
        xhr.onerror = () => reject("Network error");
        xhr.send();
    });
}
// creat handel Search function to handel user search
const handelSearch=(e)=>{
    if(e.key==="Enter" && searchInput.value){
        getData(searchInput.value);
    }
}
searchInput.addEventListener("keypress",handelSearch)

