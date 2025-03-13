const ul =document.querySelector("ul");
const nextQuestionBtn=document.querySelector(".next-question-btn");
// get random Question
let quizCategory="programming";
// current question
let currentQuestion=null;
const questionIndexsHistory=[];
// Fetch Random From Based on The Selected Category
const getRandomQuestions=()=>{
    const categoryQuestions=questions.find(cat=>cat.category.toLowerCase()===quizCategory).questions;
    return categoryQuestions[Math.floor(Math.random()*categoryQuestions.length)];
}
getRandomQuestions();

// highLit CorrectAnswer
const highLitCorrectAnswer=()=> {
   const correctAnswer= ul.querySelectorAll("li")[currentQuestion.correctAnswer];
   correctAnswer.classList.add("correct");
    const iconsHtml="<span class='material-symbols-outlined'>check_circle</span>"
    correctAnswer.insertAdjacentHTML("beforeend",iconsHtml);
}


// handel answer if it's correct or not
const handelAnswer=(option,index)=>{
    let isCorrectQuestion=currentQuestion.correctAnswer===index;
    option.classList.add(isCorrectQuestion?"correct":"incorrect");
    !isCorrectQuestion?highLitCorrectAnswer():""
    // display icons
    const iconsHtml=`<span class="material-symbols-outlined">${isCorrectQuestion?"check_circle":"cancel"}</span>`
     option.insertAdjacentHTML("beforeend",iconsHtml);
    // Disable All Answer options after one option is selected
    ul.querySelectorAll("li").forEach(option=>option.style.cssText=`pointer-events:none;`);
    // show Next Btn
    nextQuestionBtn.style.visibility="visible"

}

const renderQuestion=()=>{
    // UpDate UI
    ul.innerText=""
    nextQuestionBtn.style.visibility="hidden"
    currentQuestion=getRandomQuestions();
    if(!currentQuestion) return;
    document.querySelector(".question-text").textContent=currentQuestion.question;
    currentQuestion.options.forEach((option,index)=>{
    const li=document.createElement("li");
    li.classList.add("answer-option");
    li.textContent=option;
    ul.appendChild(li);
    li.addEventListener("click",()=> handelAnswer(li, index))});

}

renderQuestion();
// Next Question Functionality
nextQuestionBtn.addEventListener("click",renderQuestion)