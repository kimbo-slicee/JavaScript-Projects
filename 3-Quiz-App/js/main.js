const ul =document.querySelector("ul");
const nextQuestionBtn=document.querySelector(".next-question-btn");
// get random Question
let quizCategory="programming";
// Fetch Random From Based on The Selected Category
const getRandomQuestions=()=>{
    const categoryQuestions=questions.find(cat=>cat.category.toLowerCase()===quizCategory).questions;
   return categoryQuestions[Math.floor(Math.random()*categoryQuestions.length)];
    // console.log(randomQuestions)
}
getRandomQuestions();
// show the Random Question
const renderQuestion=()=>{
    ul.innerText=""
    const currentQuestion=getRandomQuestions();
    if(!currentQuestion) return;
    document.querySelector(".question-text").textContent=currentQuestion.question;
    currentQuestion.options.forEach(option=>{
    const li=document.createElement("li");
    li.classList.add("answer-option");
    li.textContent=option;
    ul.appendChild(li);
    checkValidQuestion(li);
    })
}

// show the correct answer and the wrong question
function checkValidQuestion(question){
    question.addEventListener("click",()=>{
    })
}
renderQuestion();
// Next Question Functionality
nextQuestionBtn.addEventListener("click",renderQuestion)