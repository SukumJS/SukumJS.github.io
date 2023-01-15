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
        question: '5 7 11 19 35 ?',
        choice1: '48',
        choice2: '52',
        choice3: '57',
        choice4: '62',
        choice5: '67',
        answer: 5,
    },
    {
        question: '1 2 3 3 5 7 5 8 11 7 11 ?',
        choice1: '13',
        choice2: '14',
        choice3: '15',
        choice4: '17',
        choice5: '19',
        answer: 3,
    },

    {
        question: '1 4 5 7 12 19 13 20 33 19 28 ?',
        choice1: '25',
        choice2: '32',
        choice3: '35',
        choice4: '45',
        choice5: '47',
        answer: 5,
    },

    {
        question: '64 10 54 A B 9 36 9 27 จงหาค่าของA*B',
        choice1: '396',
        choice2: '405',
        choice3: '440',
        choice4: '450',
        choice5: '500',
        answer: 2,
    },

    {
        question: 'ข้อใดมีความหมายตรงกับสำนวน “น้ำร้อนปลาเป็น น้ำเย็นปลาตาย”',
        choice1: 'ตายรัง',
        choice2: 'ตายใจ',
        choice3: 'ตายตัว',
        choice4: 'ตายเรียบ',
        choice5: 'ตายคาที่',
        answer: 2,
    },

    {
        question: 'ข้อใดใช้คำถูกความหมาย',
        choice1: 'ข้อ1 โรงเรียนจะต้องปลูกฝังให้นักเรียนมีจรรยาบรรณ เช่น ความซื่อสัตย์สุจริต',
        choice2: 'ข้อ2 ผู้สมัครผู้ว่า กทม. ขึ้นเวทีประชันทัศนวิสัยในช่วงโค้งสุดท้ายก่อนการเลือกตั้ง',
        choice3: 'ข้อ3 อสม. มีบทบาทสำคัญในการเผยแผ่ความรู้เรื่องวัคซีนในสถานการณ์โควิค',
        choice4: 'ข้อ4 ครูประจำชั้นแจ้งหมายกำหนดการพิธีปัจฉิมนิเทศให้นักเรียนชั้น ม.6 ทราบ',
        choice5: 'ข้อ5 ตำรวจได้เชิญกลุ่มเพื่อนของผู้ตายมาสอบปากคำเพื่มเติมในฐานะพยานแล้ว ',
        answer: 5,
    },

    {
        question: 'ข้อความนี้กล่าวถึงอะไร' + '\n' +
            '“งานที่ไม่ท้าทายจะทำให้เราถูกแทนที่ได้ง่ายๆ จงอย่ากลัวงานยาก อย่ากลัวงานที่ไม่เคยทำ' + '\n' +
            'และอย่ากลัวงานที่ดูเหมือนจะเป็นไปไม่ได้ แต่จงกลัวงานที่ใครๆ ก็ทำได้ ' + '\n' +
            'เพราะโลกการทำงานในอนาคตอาจไม่ได้มีที่ว่างพอสำหรับคนธรรมดาอีกต่อไป',
        choice1: 'งานที่ช่วยสร้างคุณค่า',
        choice2: 'งานที่ยากและท้าทาย',
        choice3: 'งานที่ไม่ว่าใครก็ทำได้',
        choice4: 'งานสำหรับคนธรรมดา',
        choice5: 'งานในโลกแห่งอนาคต',
        answer: 1,
    },

    {
        question: 'ข้อความต่อไปนี้เหมาะสมที่จะเป็นบทสรุปของเรื่องใด' + '\n' +
            '"ถึงแม้จะเลือกอันดับคณะได้ในจำนวนและราคาที่เท่ากัน แต่ตราบใดที่ทุกคนยังไม่สามารถเข้าถึงทรัพยากร ' + '\n' +
            'เช่น คอมพิวเตอร์ อินเทอร์เน็ต เวลา หรือแม้แต่ “ค่าผ่านทาง” ต่าง ๆ ได้อย่างเสมอภาค ความเท่าเทียมที่เป็นธรรม' + '\n' +
            'และยุติธรรมในโลกของการสอบเข้ามหาวิทยาลัยก็คงเป็นได้เพียงแค่คำพูดที่สวยหรูเท่านั้น',
        choice1: 'ข้อ1 ระบบการสอบเข้ามหาวิทยาลัย',
        choice2: 'ข้อ2 ความไม่เสมอภาคทางการศึกษา',
        choice3: 'ข้อ3 ความเหลื่อมล้ำทางรายได้ของไทย',
        choice4: 'ข้อ4 ราคาที่ต้องจ่ายเพื่อการศึกษาที่ดี',
        choice5: 'ข้อ5 การเข้าถึงทรัพยากรอย่างเท่าเทียม',
        answer: 2,
    },
    {
        image: 'img/11.jpg',
        choice1: 'ข้อ 1',
        choice2: 'ข้อ 2',
        choice3: 'ข้อ 3',
        choice4: 'ข้อ 4',
        choice5: 'ข้อ 5',
        answer: 4,
    },
    {
        image: 'img/12.jpg',
        choice1: 'ข้อ 1',
        choice2: 'ข้อ 2',
        choice3: 'ข้อ 3',
        choice4: 'ข้อ 4',
        choice5: 'ข้อ 5',
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