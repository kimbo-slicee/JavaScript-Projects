const messageInput = document.querySelector(".message-input");
const userMessageValue = document.querySelector(".user-message");
const chatBot = document.querySelector(".chat-body");
const btn = document.querySelector("#send-message");
const fileUpload = document.querySelector("#file-upload");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper=document.querySelector(".file-upload-wrapper")
const fileCancel=document.querySelector("#file-cancel svg");
const chatBootToggle=document.querySelector("#chatBoot-toggle");
const closeChatbot=document.querySelector("#close-chat-bot")
const API_KEY="AIzaSyBSzilSlNiaUYqoAI16c5rPxKFUM0kCpx0"
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`
const userData = {
  message: null,
  file:{
    data:null,
    mime_type:null
    }
};
const initialInputScrollHeit=messageInput.scrollHeight;

// create Message Element withe dynamic classes and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  chatBot.scrollTo({top:chatBot.scrollHeight,behavior:"smooth"});
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

function handleMessageboxes(e) {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  fileUploadWrapper.classList.remove("file-uploaded");
  userData.value = "";
  const messageContent = `
    <div class="message-text"></div>
    ${userData.file.data?` <img src="data:${userData.file.mime_type};base64,${userData.file.data}" alt="user image" class="attachment"/>`:""}
    `
  const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
  outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
  chatBot.appendChild(outgoingMessageDiv);
}
// Send Message by taping Enter
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {
    handleMessageboxes(e);
    e.target.value = "";
    setTimeout(()=>{
      const messageContent=`
    <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                </svg>
                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`
      const incomingMessageDiv=createMessageElement(messageContent,"bot-message","thinking");
      chatBot.appendChild(incomingMessageDiv);
      chatBot.scrollTo({top:chatBot.scrollHeight,behavior:"smooth"});
      generateBotResponse(incomingMessageDiv);
    },600)
  }
});
//
messageInput.addEventListener("input",()=>{
  messageInput.style.height=`${initialInputScrollHeit}px`;
  messageInput.style.height=`${messageInput.scrollHeight}px`;
  document.querySelector(".chat-form").style.borderRadius=messageInput.scrollHeight>initialInputScrollHeit?"15px":"30px"
})

// Send message by clicking the Send  Icons
btn.addEventListener("click", (e) => handleMessageboxes(e));

// Generate Gemini Chat Boot response
const generateBotResponse =async (incomingMessageDiv) => {
  console.log(incomingMessageDiv)
  const messageElement=incomingMessageDiv.querySelector(".message-text");
  const reqOptions={
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      contents:[{
        parts:[{text:userData.message},...(userData.file.data?[{inline_data:userData.file}]:[])]
      }]
    })
  }
  try{
    // Fetch Bot Response From Api
    const res=await fetch(url,reqOptions);
    if(!res.ok) throw new Error(data.error.message);
    let data=await res.json();
    messageElement.innerText=data.candidates[0].content.parts[0]["text"].replace(/\*\*(.*?)\*\*/g, "$1").trim();
  }catch (error){
    messageElement.textContent=error.message;
    messageElement.style.color="#ee4f4f";
  }finally {
    // rest the file object after Receiving the message
    userData.file={};
    incomingMessageDiv.classList.remove("thinking");
    chatBot.scrollTo({top:chatBot.scrollHeight,behavior:"smooth"});
  }
};

// add File Upload to the chat Boot
fileUpload.addEventListener("click",(e)=>{
  fileInput.click();
})

// let's receive the file
fileInput.addEventListener("change",(e)=>{
  let file=fileInput.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=(e)=>{
    fileUploadWrapper.querySelector("img").src=e.target.result;
    fileUploadWrapper.classList.add("file-uploaded");
    const based64String=e.target.result.split(",")[1];
     userData.file={
       data:based64String,
       mime_type:file.type
    }
    // console.log("file"+userData.file)
    fileInput.value="";
  }
  reader.readAsDataURL(file);
})
// file cancel function
  fileCancel.addEventListener("click",()=>{
    fileUploadWrapper.querySelector("img").src="#";
    fileUploadWrapper.classList.remove("file-uploaded");
    userData.file={};
  })
// Bdd functionalities to Emoji btn
const piker= new EmojiMart.Picker({
  theme:"light",
  skinTonePosition: "none",
  previewPosition: "none",
  onEmojiSelect: (emoji)=>{
    const {selectionStart:start,selectionEnd:end}=messageInput;
    messageInput.setRangeText(emoji.native,start,end,"end");
    messageInput.focus()
  },
  onClickOutside: (e)=>{
    if(e.target.id === "emoji-picker"){
      document.body.classList.toggle("show-emoji-picker");
    }else {
      document.body.classList.remove("show-emoji-picker")
    }
  }
})
// add emoji picker to the body
document.querySelector(".chat-form").appendChild(piker);
// add toggle functionality
chatBootToggle.addEventListener("click",()=>{
  document.body.classList.toggle("show-chatBoot");
})

closeChatbot.addEventListener("click",()=>{
  document.body.classList.remove("show-chatBoot");
})



