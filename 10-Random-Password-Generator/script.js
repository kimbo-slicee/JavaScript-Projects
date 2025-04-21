const lengthSlider=document.querySelector(".pass-length input");
const passwordLengthValue=document.querySelector(".pass-length .details span");
const generatePasswordBtn=document.querySelector(".generate-btn");
const options=document.querySelectorAll(".options .option input");
const input =document.querySelector("input[type='text']");

const characters={
   Lowercase:"abcdefghijklmnopqrstuvwxyz",
   Uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
   Numbers:"0123456789",
   Symbols:"!@#$%^&*(){}[]<>/|?;'\":"
}
const updateSlide=()=>{
   // update Value of password Length value
   passwordLengthValue.innerText=lengthSlider.value;
   generatePassword();
}

const generatePassword=()=>{
   let staticPassword="";
   let randomPassword="";
   let passLength=lengthSlider.value;
   options.forEach((option)=>{
      if(option.checked){
         // use the input id to know which one of them is checked then add it to staticPassword variable it's like
         // kind of filtrate
         staticPassword+=characters[option.id];
      }
   })
   for(let i=0;i<passLength;i++){
      randomPassword+=staticPassword[Math.floor(Math.random()*staticPassword.length)];
   }
   input.value=randomPassword;
}

updateSlide();
lengthSlider.addEventListener("input",updateSlide);
generatePasswordBtn.addEventListener("click",generatePassword)