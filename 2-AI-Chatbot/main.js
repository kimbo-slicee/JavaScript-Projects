const messageInput = document.querySelector(".message-input");
const userMssageValue = document.querySelector(".user-message");
const chatBot = document.querySelector(".chat-body");
const btn = document.querySelector("#send-message");
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`
const userData = {
  message: null,
};

// create Message Elemet withe dynamic classes and return it
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
  const messageContent = `<div class="message-text"></div>`;
  const outgoingMessagDiv = createMessageElement(
    messageContent,
    "user-message"
  );
  outgoingMessagDiv.querySelector(".message-text").textContent =
    userData.message;
  chatBot.appendChild(outgoingMessagDiv);
  userData.value = "";
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

// Send message by clicking the Send  Icons
btn.addEventListener("click", (e) => handleMessageboxes(e));

// Generate Chat Boot response
const generateBotResponse =async (incomingMessageDiv) => {
  console.log(incomingMessageDiv)
  const messageElement=incomingMessageDiv.querySelector(".message-text");
  const reqOptions={
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      contents:[{
        parts:[{text:userData.message}]
      }]
    })
  }
  try{
    const res=await fetch(url,reqOptions);
    let data=await res.json();
    messageElement.textContent=data.candidates[0].content.parts[0]["text"].trim()
    if(!res.ok) throw new Error(data.error.message);
  }catch (error){
    messageElement.textContent=error.message;
    messageElement.style.color="#ee4f4f";
  }finally {
    incomingMessageDiv.classList.remove("thinking");
    chatBot.scrollTo({top:chatBot.scrollHeight,behavior:"smooth"});
  }
};



