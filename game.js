const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarfull = document.querySelector("#progressBarfull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "HTML stands for ________ .",
        choice1: " HyperText Markup Language",
        choice2: "Holistick Technical Method Library",
        choice3: " Hyper Tax Makes Line",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "The HTML tag used to define the internal stylesheet is - ",
        choice1: "style",
        choice2: "<style>",
        choice3: "<link>",
        choice4: "<script>",
        answer: 2,
    },
    {
        question: "Full form of URL is ________ .",
        choice1: "Uniform Research Locator",
        choice2: "Uniform Read Locator",
        choice3: "United Research Locator",
        choice4: "Uniform Resource Locator",
        answer: 4,
    },
    {
        question: "Which Type of Language is JavaScript?",
        choice1: "Assembly-Language",
        choice2: "Low-Level",
        choice3: "Object-Oriented",
        choice4: "Object-Based",
        answer: 3,
    },
    {
        question: "How do you add a background color for all <h1> elements?",
        choice1: "h1 {background-color:#FFFFFF;}",
        choice2: "h1.all {background-color:#FFFFFF;}",
        choice3: "all.h1 {background-color:#FFFFFF;}",
        choice4: "None of the above",
        answer: 1,
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);

        return (window.location.href = "/end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarfull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice, index) => {
        const number = index + 1;
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
