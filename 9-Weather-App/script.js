const wrapper=document.querySelector(".wrapper");
const infoText=document.querySelector(".info-text");
const inputField=document.querySelector("input");
const getLocationBtn=document.querySelector(".device-location-btn");
const wIcon=document.querySelector(".weather-part img");
const arrowBack=document.querySelector(".bx-left-arrow-alt")
let api;

const weatherDetails=(res)=>{
    infoText.classList.replace("pending","error")
    if(res.cod==="404"){
        infoText.innerText=`${inputField.value} isn't a valid city name`
    }else{
        infoText.classList.remove("pending","error");
        wrapper.classList.add("active");
        const city=res.name;
        const country=res.sys.country;
        const {description,id}=res.weather[0];
        const {feels_like,humidity,temp}=res.main;
        console.log(city,country,description,feels_like,humidity,temp);
        document.querySelector(".temp .numb").innerText=temp;
        document.querySelector(".weather").innerText=description;
        document.querySelector(".location span").innerText=`${city},${country}`;
        document.querySelector(".temp .numb-2").innerText=feels_like;
        document.querySelector(".humidity span").innerText=`${humidity}%`;
        // switch costume icon according to the id
        if (id===800){
            wIcon.src="assets/icons/clear.svg"
        }else if(id>=200 && id<=232){
            wIcon.src="assets/icons/storm.svg"
        }else if(id>=600 && id<=622){
            wIcon.src="assets/icons/snow.svg"
        }else if(id>=701 && id<=781){
            wIcon.src="assets/icons/haz.svg"
        }else if(id>=801 && id<=804){
            wIcon.src="assets/icons/cloud.svg"
        }else if((id>=300 && id<=321) || (id>=500 && id<=531)){
            wIcon.src="assets/icons/rain.svg"
        }
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
// Handel Arrow Back Click
arrowBack.addEventListener("click",()=>{
        wrapper.classList.remove("active");
    console.log("hello world!")
})