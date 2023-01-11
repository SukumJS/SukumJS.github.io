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
        question: '16 1,318 35 1,283 59 1,243 88 ........ ',
        choice1: '147 ',
        choice2: '1,198 ',
        choice3: '1,255 ',
        choice4: '1,331 ',
        answer: 2,
    },
    {
        question: '6   -   10  - ' + '\n' +
            ' -   11  13  - ' + '\n' +
            '12  -   -   ?' + '\n' +
            '15  17  -   21',
        choice1: '22 ',
        choice2: '20',
        choice3: '18 ',
        choice4: '14 ',
        answer: 3,
    },
    {
        question: '100 92 76 44 ... ',
        choice1: '-20 ',
        choice2: '-40 ',
        choice3: '30 ',
        choice4: '42 ',
        answer: 1,
    },
    {
        question: '15 25 35 75 135 ... ',
        choice1: '180 ',
        choice2: '245 ',
        choice3: '226 ',
        choice4: '256 ',
        answer: 2,
    },
    {
        question: 'แกงเหลือ : แกงโฮะ ',
        choice1: 'นครศรีธรรมราช : ชุมพร ',
        choice2: 'สงขลา : อุดรธานี ',
        choice3: 'พัทลุง : เชียงใหม่ ',
        choice4: 'ชุมพร : นนทบุรี ',
        answer: 3,
    },
    {
        question: '“ชีวิตคนเรานั้นเปรียบได้กับการขับรถยนต์บนท้องถนน เพราะนอกจากที่เราต้องรู้จักรถยนต์คันที่เราขับเป็นอย่าง' + '\n' +
            'ดีแล้ว เรายังจะต้องรู้จักสภาพถนนและรู้จักรถยนต์คันอื่นๆ ที่แล่นอยู่บนท้องถนนเดียวกับเราอีกด้วย และเรายัง' + '\n' +
            'จะต้องรู้จักคนเดินถนน สภาพดินฟ้าอากาศในขณะขับขี่ นั้นแหละจึงจะเรียกว่าเข้าใจชีวิตเป็นอย่างดี” ข้อความ' + '\n' +
            'ข้างต้นนี้ ควรจะใช้ประกอบการพูดในหัวข้อใดจึงจะเหมาะสมที่สุด',
        choice1: 'รู้จักชีวิต ',
        choice2: 'ชีวิตที่มีประโยชน์ ',
        choice3: 'มุมมองของชีวิต ',
        choice4: 'คุณค่าชีวิต ',
        answer: 1,
    },
    {
        question: 'เมื่อแปดปีก่อน พ่ออายุมากกว่าแม่ 5 ปี แม่มีอายุเป็น 3 เท่าของลูก และอีก 7 ปี' + '\n' +
            'ลูกจะอายุครบ 2 รอบ ปัจจุบันพ่อมีอายุเท่าไร ',
        choice1: '53 ปี ',
        choice2: '54 ปี ',
        choice3: '55 ปี ',
        choice4: '56 ปี ',
        answer: 4,
    },
    {
        question: 'รถวิ่งจากกรุงเทพฯ ไปชลบุรีในอัตรา 90 กิโลเมตรต่อ ชม. จะถึงเร็วกว่ารถที่วิ่ง 80 กิโลเมตรต่อชั่วโมง' + '\n' +
            'เป็นเวลา 10 นาที ระยะทางจากกรุงเทพถึงชลบุรียาวเท่าไร',
        choice1: '100 กม.',
        choice2: '120 กม.',
        choice3: '140 กม.',
        choice4: '160 กม.',
        answer: 2,
    },
    {
        image: 'img/11.jpg',
        choice1: 'ข้อ 1',
        choice2: 'ข้อ 2',
        choice3: 'ข้อ 3',
        choice4: 'ข้อ 4',
        choice5: 'ข้อ 5',
        answer: 3,
    },
    {
        image: 'img/12.jpg',
        choice1: 'ข้อ 1',
        choice2: 'ข้อ 2',
        choice3: 'ข้อ 3',
        choice4: 'ข้อ 4',
        choice5: 'ข้อ 5',
        answer: 2,
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