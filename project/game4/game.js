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
        question: ' ภาพ figure ควรอยู่ set ใด',
        choice1: ' set A',
        choice2: 'set B',
        choice3: 'ไม่อยู่เซตใดเลย',
        answer: 1,
    },
    {
        image: 'img/12.jpg',
        question: ' ภาพ figure ควรอยู่ set ใด',
        choice1: ' set A',
        choice2: 'set B',
        choice3: 'ไม่อยู่เซตใดเลย',
        answer: 1,
    },
    {
        question: '18 36 57 76 100 .....',
        choice1: '105',
        choice2: '110',
        choice3: '115',
        choice4: '120',
        answer: 4,
    },
    {
        question: ' 4 36 8 118 14 256 18 338 24 .....',
        choice1: '432',
        choice2: '476',
        choice3: '493',
        choice4: '512',
        answer: 2,
    },
    {
        question: ' 1 11 18 55 96 156 .....',
        choice1: '221',
        choice2: '235',
        choice3: '241',
        choice4: '256',
        answer: 3,
    },
    {
        question: ' 3 9 12 21 33 .....',
        choice1: '42',
        choice2: '45',
        choice3: '52',
        choice4: '54',
        answer: 4,
    },
    {
        question: ' จงเลือกคําที่เหมาะสมที่สุดเติมลงในช่องว่าง ' + '\n' +
            'ท่านจะทําอะไรก็ปล่อยท่านไปเถอะ อย่า..........เลย ท่านไม่ฟังเสมียนอย่างเราหรอก ดีไม่ดีจะถูกท่านเขม่นเอาด้วย',
        choice1: 'ก. เอามือซุกหีบ',
        choice2: 'ข. เอาไม้สั้นไปรันขี้',
        choice3: 'ค. แกว่งเท้าหาเสี้ยน',
        choice4: 'ง. เอาไม้ซีกไปงัดไม้ซุง',
        answer: 4,
    },
    {
        question: ' เขาเป็นคนประเภท..........ไม่น่าไว้ใจ กลับกลอกโลเล เดี๋ยวก็ไปฝ่ายโน้นเดี๋ยวก็มาเข้ากับฝ่ายนี้',
        choice1: 'เด็กเลี้ยงแกะ',
        choice2: 'นกสองหัว ',
        choice3: 'จับปลาสองมือ ',
        choice4: 'คดในข้อ งอในกระดูก',
        answer: 4,
    },

    {
        question: ' เพลงที่เขาแต่ง มีลักษณะ..........ขึ้นต้นกับลงท้ายเป็นคนละเรื่อง ทําให้เข้ากันไม่สนิท ฟังดูไม่ไพเราะ',
        choice1: 'ก. คาบลูกคาบดอก ',
        choice2: ' ข. ลูกผีลูกคน',
        choice3: 'ค. หัวมังกุ ท้ายมังกร ',
        choice4: '    ง. ดาบสองคม',
        answer: 3,

    },
    {
        question: 'เจ้าหน้าที่ทุกคนต่างช่วยกันทํางานอย่าง..........และไม่ผิดพลาด จึงเป็นภาพที่..........มาก',
        choice1: 'กระฉับกระเฉง - ฝังใจ ',
        choice2: 'รวดเร็ว - น่าชม',
        choice3: 'คล่องแคล่ว - ประทับใจ ',
        choice4: 'รัดกุม - น่าสนใจ',
        answer: 3,

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