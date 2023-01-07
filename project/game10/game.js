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
        question: 'ภาพ figure ควรอยู่ set ใด',
        choice1: 'set A',
        choice2: 'set B',
        choice3: 'ไม่อยู่เซตใดเลย',
        answer: 1,
    },
    {
        image: 'img/12.jpg',
        question: 'ภาพ figure ควรอยู่ set ใด',
        choice1: 'set A',
        choice2: 'set B',
        choice3: 'ไม่อยู่เซตใดเลย',
        answer: 3,
    },
    {
        question: '3 14 7 45 15 124 31 ..........',
        choice1: '120',
        choice2: '140',
        choice3: '160 ',
        choice4: '315',
        answer: 4,
    },
    {
        question: '1 3 5 7 16 31 59 ..........',
        choice1: '9',
        choice2: '81',
        choice3: '95 ',
        choice4: '113',
        answer: 4,
    },
    {
        question: '100 99 95 86 70 ...',
        choice1: '47',
        choice2: '45',
        choice3: '25 ',
        choice4: '30',
        answer: 2,
    },
    {
        question: ' 1 -3 -7 -11 -15 ... ...',
        choice1: '-11',
        choice2: '-13',
        choice3: '-19 ',
        choice4: '-23',
        answer: 3,
    },
    {
        question: ' กาแฟถ้วยนี้..........น่าจะเติมน้ำตาลอีก',
        choice1: 'หวานจ๋อย  ',
        choice2: 'หวานหอม',
        choice3: 'หวานปะแล่ม ๆ ',
        choice4: 'หวานแหว',
        answer: 3,

    },
    {
        question: ' ปัญหาทางด้านสิ่งแวดล้อมเป็นปัญหาที่ทุกประเทศทั่วโลกเห็นความสําคัญและกําหนดมาตรการในการ..........' + '\n' +
            'สิ่งแวดล้อมควบคู่ไปกับการ..........เทคโนโลยีและเศรษฐกิจ',
        choice1: 'รักษา - ศึกษา  ',
        choice2: 'ดูแล - ปรับปรุง',
        choice3: 'อนุรักษ์ - พัฒนา ',
        choice4: 'ควบคุม - ส่งเสริม',
        answer: 3,
    },
    {
        question: ' ขณะนี้ตํารวจกําลัง..........เพื่อค้นหาตัวร้ายอยู่',
        choice1: 'จับ ',
        choice2: 'สอบถาม',
        choice3: 'สืบสวน  ',
        choice4: 'สอบสวน',
        answer: 3,

    },
    {
        question: ' ศิลปหัตถกรรมไทยไม่เคย..........ไปจากแผ่นดินไทย ' + '\n' +
            'ทั้งนี้เพราะมี..........หลายอย่างมาคอย..........',
        choice1: 'ขาดแคลน - วิธีการ - ทําให้เป็นไป ',
        choice2: 'สูญสิ้น - สิ่งกําหนด - กําหนดให้',
        choice3: 'ตัวการ - สูญหาย - ค้ำประกัน  ',
        choice4: 'หาย - เหตุผล - สนับสนุน',
        answer: 4,
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