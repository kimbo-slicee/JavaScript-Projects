const wrapper=document.querySelector(".wrapper");
const inputPart=document.querySelector(".input-part");
const infoText=document.querySelector(".info-text");
const inputField=document.querySelector("input");
const requestAPI=(city)=>{
    let api=`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
}
inputField.addEventListener("keyup",function (e){
    if(e.key==="Enter" && this.value!==""){
        requestAPI(this.value);
   }
})