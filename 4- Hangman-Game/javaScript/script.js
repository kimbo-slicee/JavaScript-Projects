const keyboard=document.querySelector(".keyboard");

// create KeyBord buttons dynamically
for(let i=97 ;i<=122 ;i++){
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboard.appendChild(button)
}
// 