const lengthSlider=document.querySelector(".pass-length input");
const passwordLengthValue=document.querySelector(".pass-length .details span");
const generatePasswordBtn=document.querySelector(".generate-btn");
const options=document.querySelectorAll(".options .option input");
const input =document.querySelector("input[type='text']");
let excludeDuplicate=false


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
const randomPass=(password)=>{
   let randomPassword="",
       randomChar="",
       passLength=lengthSlider.value;
   for(let i=0; i<passLength; i++){
       randomChar=password[Math.floor(Math.random()*password.length)];
       if(excludeDuplicate){
          // randomPassword=[...new Set(randomPassword.split(''))].join('');
          if(!randomPassword.includes(randomChar) || randomChar===" "){
             randomPassword+=randomChar;
          }else{
             i--;
          }
       }else {
          randomPassword+=randomChar;
       }
   }
   return randomPassword;
}

const generatePassword=()=>{
   let staticPassword="";
   options.forEach((option)=>{
      if(option.checked){
         if(option.id!=="exc-duplicate" && option.id!=="spaces"){
         // use the input id to know which one of them is checked then add it to staticPassword variable it's like
         // kind of filtrate
         staticPassword+=characters[option.id];
         }else if(option.id==="spaces"){
            //add space if the use check space checkBox
            staticPassword+=` ${staticPassword} `
         }else {
            //remove duplicate characters
            excludeDuplicate=true;
         }
      }
   })
   // random Password
   input.value=randomPass(staticPassword);
}
updateSlide();
lengthSlider.addEventListener("input",updateSlide);
generatePasswordBtn.addEventListener("click",generatePassword)