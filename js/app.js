const startBtn = document.querySelector('.start button');
const infoBox = document.querySelector('.infoBox');

const quitBtn = document.querySelector('.quit');
const continueBtn = document.querySelector('.continue');

const quizBox = document.querySelector('.quizBox');

///// result ////// 
const resultBox = document.querySelector('.resultBox');
const queCount = document.querySelector('.queCount');
const correctAnswerCount = document.querySelector('.correctAnswerCount');
const incorrectAnswerCount = document.querySelector('.incorrectAnswerCount');
const percentagecorrectAnswer = document.querySelector('.percentagecorrectAnswer');


startBtn.addEventListener('click', () => {
     infoBox.classList.add('showinfoBox')
     startBtn.style.display = 'none'
});

quitBtn.addEventListener('click', () => {
     infoBox.classList.remove('showinfoBox')
     startBtn.style.display = 'block'
});

continueBtn.addEventListener('click', () => {
     infoBox.classList.remove('showinfoBox')
     quizBox.classList.add('showquizBox')
});




///// questions ////// 
const quesTionText = quizBox.querySelector('.questionText');
const options = quizBox.querySelector('.answerList') 

const totalQuestions = document.querySelector('.total p')
const nextBtn = document.querySelector('.next')


//// correct incorrect icon ///// 
const correctIcon = '<i class="fa-solid fa-check"></i>';
const incorrectIcon = '<i class="fa-solid fa-xmark"></i>';


let questionIndex = 0;
let correctanswerCount = 0;
let incorrectanswerCount = 0;


showQuestions(questionIndex)

function showQuestions (index) {

     let option = '';

     quesTionText.innerText = questions[index].question
     for (let i = 0; i < questions[index].options.length; i++) {
          option += `<div class="answer">${questions[index].options[i]}</div>`
     };

     options.innerHTML = option

     let allOption = options.querySelectorAll('.answer')
     
     for(j = 0; j < allOption.length; j++) { 
          allOption[j].setAttribute('onclick','userSelect(this)')
     }


     totalQuestions.innerText = `${index + 1} / ${questions.length}`

     nextBtn.classList.remove('shownextBtn')
}



////// nextBtn ////////// 
nextBtn.addEventListener('click', () => {
     questionIndex++;
     if(questions.length > questionIndex) {
          showQuestions(questionIndex)
     } else {
          quizBox.classList.remove('showquizBox')
          resultBox.classList.add('showresultBox')

          queCount.innerText = `კითხვების რაოდენობა:${questions.length}`
          correctAnswerCount.innerText = `სწორი პასუხი:${correctanswerCount}`
          incorrectAnswerCount.innerText = `არასწორი პასუხი:${incorrectanswerCount}`
          percentagecorrectAnswer.innerText = `სწორი პასუხი(პროცენტი):${Math.round((correctanswerCount * 100) / questions.length)}%`
     }
     
     if(questions.length - 1 == questionIndex) {
          nextBtn.innerText = 'დასრულება'
     }
})


///// userSelect function ///// 
function userSelect(answer) {
     let userAnswer = answer.innerText;
     let correctAnswer = questions[questionIndex].answer;

     let allOption = options.querySelectorAll('.answer');

     nextBtn.classList.add('shownextBtn')
     if(userAnswer == correctAnswer) {
          answer.classList.add('correct');
          answer.insertAdjacentHTML('beforeend',correctIcon);
          correctanswerCount++;
     } else {
          answer.classList.add('incorrect');
          answer.insertAdjacentHTML('beforeend',incorrectIcon);
          incorrectanswerCount++;
     };

     
     for(let i = 0; i < allOption.length; i++) {
          allOption[i].classList.add('disabled');
     }
};


//// finish ///// 
const restartQuiz = document.querySelector('.restartQuiz');
const quitQuiz = document.querySelector('.quitQuiz');

restartQuiz.addEventListener('click', () => {
     quizBox.classList.add('showquizBox');
     resultBox.classList.remove('showresultBox');


     reset();
});

quitQuiz.addEventListener('click', () => {
     startBtn.style.display = 'block'
     quizBox.classList.remove('showquizBox');
     resultBox.classList.remove('showresultBox');

     reset();
})

function reset() {
     questionIndex = 0;
     correctanswerCount = 0;
     incorrectanswerCount = 0;
     nextBtn.innerHTML = 'შემდეგი' + '<i class="fa-solid fa-caret-right"></i>'

     showQuestions(questionIndex)
}