const image = document.querySelector('#image');
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [


    {
        image: 'img/11.jpg',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        choice5: '5',
        answer: 1,
    },
    {
        image: 'img/12.jpg',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        choice5: '5',
        answer: 3,
    },
    {
        image: 'img/01.jpg',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        choice5: '5',
        answer: 5,
    },
    {
        image: 'img/02.jpg',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        choice5: '5',
        answer: 3,
    },
    {
        image: 'img/03.jpg',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        choice5: '5',
        answer: 5,
    },
    {
        image: 'img/04.jpg',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        choice5: '5',
        answer: 1,
    },


]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    console.log("Question: " + questionsIndex)
    currentQuestion = availableQuestions[questionsIndex]
    if ('question' in currentQuestion) {
        question.innerHTML = currentQuestion.question
    } else {
        question.innerHTML = "";
    }
    if ('image' in currentQuestion) {
        image.src = currentQuestion.image
    } else {
        image.src = "";
    }

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.style.display = 'block'
        choice.innerText = currentQuestion['choice' + number]
        if (currentQuestion['choice' + number] == undefined) {
            choice.style.display = 'none'
        }
    })
    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1500)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()