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
        answer: 1,
    },
    {
        question: ' 99 100 88 101 77 103 66 ... ',
        choice1: '120',
        choice2: '106',
        choice3: '55 ',
        choice4: '45',
        answer: 2,
    },
    {
        question: ' 4 27 256 ...',
        choice1: '512',
        choice2: '1024',
        choice3: '1512 ',
        choice4: '3125',
        answer: 4,
    },
    {
        question: ' 60 59 54 45 29 ...',
        choice1: '45',
        choice2: '35',
        choice3: '4 ',
        choice4: '10',
        answer: 3,
    },
    {
        question: ' 100 303 506 ....',
        choice1: '507',
        choice2: '709',
        choice3: '906',
        choice4: '1007',
        answer: 2,
    },
    {
        question: ' มนุษย์ควรเรียนรู้ถึงการเก็บรักษาผักและผลไม้เพื่อใช้.........ขาดแคลน หรือใช้รับประทาน........ไม่มีผักผลไม้ชนิดนั้น ๆ' + '\n' +
            '..........อาหารยังคงสภาพรับประทานได้และสามารถเก็บไว้ได้นาน',
        choice1: 'ในโอกาส - ตามแหล่งที่ - และ  ',
        choice2: 'มื่อคราวที่ - ในสถานที่ - โดยให้',
        choice3: 'เนื่องจาก - ถ้าหาก - โดยถือหลักว่า',
        choice4: 'ในยามที่ - ในแหล่งที่ - โดยที่',
        answer: 3,

    },
    {
        question: 'ด้วยเหตุนี้จึงมีการยกร่างพระราชบัญญัติจัดตั้งมหาวิทยาลัยเอกชนขึ้น มี..........ให้เอกชนตั้ง ' + '\n' +
            'สถานศึกษาระดับมหาวิทยาลัยได้ใน..........ของรัฐบาล',
        choice1: 'แผนการ - ควบคุม ',
        choice2: 'กลยุทธ์ - ควบคุม',
        choice3: 'หลักการ - ความควบคุม  ',
        choice4: 'โครงการ - ความเห็นชอบ',
        answer: 3,

    },
    {
        question: ' เธอขอ..........ไปอีก 30 นาที จึงจะมา..........เวร ',
        choice1: 'เวลา - เปลี่ยน  ',
        choice2: 'ผลัด - เปลี่ยน ',
        choice3: 'ผัด - ผลัด   ',
        choice4: 'ผลัด - ผัด',
        answer: 3,

    },
    {
        question: ' เขาดื้อมาก..........ถูกครูลงโทษบ่อย ๆ..........เขากลับเป็นเด็กอยู่ในโอวาทพ่อแม่..........คิดว่าเขาไม่สบาย ',
        choice1: 'จน - แต่พอ - ก็  ',
        choice2: 'จน - ดังนั้น - จึง ',
        choice3: 'ทําให้ - เมื่อ - เลย ',
        choice4: 'ทําให้ - ครั้น - ก็เลย',
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