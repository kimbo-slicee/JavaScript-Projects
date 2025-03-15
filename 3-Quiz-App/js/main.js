const ul =document.querySelector("ul");
const nextQuestionBtn=document.querySelector(".next-question-btn");
const questionStatus=document.querySelector(".question-status");
const timeDisplay=document.querySelector(".time-duration");
const QUIZ_TIME_LIMIT=15;
const resultContainer=document.querySelector(".result-container");
const quizContainer=document.querySelector(".quiz-container");
const tryAgainBtn=document.querySelector(".try-again-btn");
const configContainer=document.querySelector(".config-container");
const startQuizBtn=document.querySelector(".start-quiz-btn");
let currentTime=QUIZ_TIME_LIMIT;
let timer=null;
// get random Question
let quizCategory="";
// current question
let currentQuestion=null;
let questionIndexesHistory=[];
let numberOfQuestion=5;
let correctAnswerCounter=0;
// Update config Container
document.querySelectorAll(".category-option,.question-option").forEach(option=>{
    option.addEventListener("click",()=>{
        option.parentNode.querySelector(".active").classList.remove("active");
        option.classList.add("active")
    })
})
// start Quiz App
const startQuiz=()=>{
    configContainer.style.display="none"
    quizContainer.style.display="block";
    // update The Quiz Category and quizNumbers
    quizCategory=document.querySelector(".category-option.active").textContent.toLowerCase();
    numberOfQuestion=Number(document.querySelector(".question-option.active").textContent);
    console.log(quizCategory,numberOfQuestion);
    renderQuestion();
}


//Clear And rest The Timer
const restTimer=()=>{
    clearInterval(timer);
    currentTime=QUIZ_TIME_LIMIT;
    timeDisplay.textContent=`${currentTime}s`;
}
// Initialize and start the timer for the current question
const startTime=()=>{
    timer=setInterval(()=>{
        currentTime--;
        timeDisplay.textContent=`${currentTime}s`
        if(currentTime<=0){
            clearInterval(timer);
            highLitCorrectAnswer();
            ul.querySelectorAll("li").forEach(option=>option.style.cssText=`pointer-events:none;`);
            // show Next Btn
            nextQuestionBtn.style.visibility="visible";
        }
    },1500)
}
//
const showQuizResult=()=>{
    quizContainer.style.display="none";
    resultContainer.style.display="block";
    document.querySelector(".result-message").innerHTML=` You Answered <b>${correctAnswerCounter}</b> out of <b>${numberOfQuestion}</b>
            questions correctly.great effort`;
}

// Fetch Random From Based on The Selected Category
const getRandomQuestions=()=>{
    const categoryQuestions=questions.find(cat=>cat.category.toLowerCase()===quizCategory).questions|| [];
    if(questionIndexesHistory.length>=Math.min(categoryQuestions.length,numberOfQuestion)){
        return showQuizResult()
    }
    const validQuestions =categoryQuestions.filter((_,index)=>!questionIndexesHistory.includes(index))
    const randomQuestion=validQuestions[Math.floor(Math.random()*categoryQuestions.length)];
    questionIndexesHistory.push(categoryQuestions.indexOf(randomQuestion));
    // update question Status
    return randomQuestion;
}
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
    !isCorrectQuestion?highLitCorrectAnswer():correctAnswerCounter++;
    // display icons
    const iconsHtml=`<span class="material-symbols-outlined">${isCorrectQuestion?"check_circle":"cancel"}</span>`
    option.insertAdjacentHTML("beforeend",iconsHtml);
    // Disable All Answer options after one option is selected
    ul.querySelectorAll("li").forEach(option=>option.style.cssText=`pointer-events:none;`);
    // show Next Btn
    nextQuestionBtn.style.visibility="visible";
    clearInterval(timer);

}
const renderQuestion=()=>{
    currentQuestion=getRandomQuestions();
    if(!currentQuestion) return;
    // UpDate UI
    ul.innerText=""
    nextQuestionBtn.style.visibility="hidden";
    questionStatus.innerHTML=`<b>${questionIndexesHistory.length}</b> of <b>${numberOfQuestion}</b> Questions`
    // show Questions List
    document.querySelector(".question-text").textContent=currentQuestion.question;
    currentQuestion.options.forEach((option,index)=>{
    const li=document.createElement("li");
    li.classList.add("answer-option");
    li.textContent=option;
    ul.appendChild(li);
    li.addEventListener("click",()=>handelAnswer(li, index))});
    restTimer();
    startTime();


}
// RestQuiz
const resetQuiz=()=>{
 questionIndexesHistory=[];
 correctAnswerCounter=0;
 restTimer();
 resultContainer.style.display="none"
 configContainer.style.display="block";
 quizCategory="";
 numberOfQuestion=5
}
// renderQuestion();
// Next Question Functionality
nextQuestionBtn.addEventListener("click",renderQuestion);
tryAgainBtn.addEventListener("click",resetQuiz)
startQuizBtn.addEventListener("click",startQuiz)