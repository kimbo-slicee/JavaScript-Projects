const wrapper=document.querySelector(".wrapper");
const inputPart=document.querySelector(".input-part");
const infoText=document.querySelector(".info-text");
const inputField=document.querySelector("input");
const getLocationBtn=document.querySelector(".device-location-btn");
let api;

const weatherDetails=(res)=>{
    infoText.classList.replace("pending","error")
    if(res.info==="404"){
        infoText.innerText=`${inputField.value} isn't a valid city name`
    }else{
        infoText.classList.remove("pending",)
    }
}
const requestAPI=(city)=>{
    api=`http://localhost:3000/api/weather?city=${city}`;
    fetchData();

}
inputField.addEventListener("keyup",function (e){
    if(e.key==="Enter" && this.value!==""){
        requestAPI(this.value);
   }else {

    }
})

//

// Hande Get Device Btn
const onSuccess=(positions)=>{
    // getting lat and lon of the user device from coords
    const{latitude,longitude}=positions.coords;
    api=`http://localhost:3000/api/weather/coords?lat=${latitude}&lon=${longitude}`;
    fetchData();
}
function fetchData(){
    infoText.textContent="Getting weather details...";
    infoText.classList.add("pending");
    fetch(api)
        .then(res=>res.json()).then(result=>weatherDetails(result))
        .catch(err=>console.log(err));
}
const onError=(error)=>{
    infoText.innerText=error.message;
    infoText.classList.add("error");
}
getLocationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }
    else {
        alert("Your Browser Not Supporting geolocation api");
    }
})