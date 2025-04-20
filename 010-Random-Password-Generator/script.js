const lengthSlider=document.querySelector(".pass-length input");
const passwordLengthValue=document.querySelector(".pass-length .details span");
const generatePasswordBtn=document.querySelector(".generate-btn")
const updateSlide=()=>{
   // update Value of password Length value
   passwordLengthValue.innerText=lengthSlider.value;
}
const generatePassword=()=>{
   const str=String.fromCharCode(66)
}
updateSlide();
lengthSlider.addEventListener("input",updateSlide);
generatePasswordBtn.addEventListener("click",generatePassword)