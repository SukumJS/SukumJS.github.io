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
        question: '2 4 12 24 72 ?',
        choice1: '84',
        choice2: '144',
        choice3: '96',
        choice4: '288',
        choice5: '192',
        answer: 2,
    },

    {
        question: '4 11 30 67 128 ?',
        choice1: '142',
        choice2: '145',
        choice3: '147',
        choice4: '219',
        choice5: '157',
        answer: 4,
    },

    {
        question: '32 81 64 25 6 ?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        choice5: '5',
        answer: 1,
    },

    {
        question: '2 31 60 89 118 ?',
        choice1: '142',
        choice2: '145',
        choice3: '147',
        choice4: '152',
        choice5: '157',
        answer: 3,
    },
    {
        question: 'ข้อใดสื่อความได้ครบถ้วนสมบูรณ์',
        choice1: 'คู่รักเพศกำเนิดเดียวกันในสวิตเซอร์แลนด์',
        choice2: 'รอยยิ้มและมวลความสุขของชาว LGBTQ+',
        choice3: 'เริ่มการบังคับใช้สิทธิสมรสเท่าเทียมในยุโรป',
        choice4: 'คู่รัก LGBTQ+ กับพิธีวิวาห์ตามหลักศาสนา',
        choice5: 'การจดทะเบียนสมรสอย่างถูกต้องตามกฎหมาย',
        answer: 3,
    },

    {
        question: 'ข้อใดความหมายแคบที่สุด',
        choice1: 'ข้อ1 ผักดองเป็นเครื่องเคียงที่กินกับอะไรก็อร่อย',
        choice2: 'ข้อ2 มะระขี้นกเป็นผักสมุนไพรที่มีสรรพคุณทางยา',
        choice3: 'ข้อ3 ผักห้าสีมีสารอาหารที่ช่วยเสริมสร้างภูมิคุ้มกัน',
        choice4: 'ข้อ4 เริ่มต้นปีใหม่ด้วยอาหารสุขภาพเมนูผักใบเขียว',
        choice5: 'ข้อ5 หอมและกระเทียมถือเป็นผักต้องห้ามในช่วงกินเจ',
        answer: 2,
    },

    {
        question: 'ข้อใดไม่ใช้ภาษากำกวม',
        choice1: 'ข้อ1 ดาราหนุ่มช่องน้อยสีควงแฟนสาวทำบุญวันเกิด',
        choice2: 'ข้อ2 เปิดตัวบัตรคนพิการรุ่นใหม่ช่วยเข้าถึงบริการรัฐ',
        choice3: 'ข้อ3 กรมแพทย์แผนไทยจัดมหกรรมสมุนไพรในชุมชน',
        choice4: 'ข้อ4 กระทรวงศึกษาธิการใช้พลังผู้สูงวัยขับเคลื่อนสังคม',
        choice5: 'ข้อ5 พยาบาลสาวขับรถเก๋งชนรถกระบะดับกลางถนน',
        answer: 4,
    },

    {
        question: 'ถ้าจะเขียนเรียงความเรื่อง “โรคแพนิค รักษาได้” สำหรับผู้อ่านที่เป็นประชาชนทั่วไป ส่วนเนื้อเรื่องควรมีข้อมูลสำคัญตามประเด็นในข้อใด',
        choice1: 'ข้อ1 นิยามของโรคแพนิค สาเหตุ อาการ',
        choice2: 'ข้อ2 การตรวจวินิจฉัย ขั้นตอนการรักษา การจ่ายยา',
        choice3: 'ข้อ3 ผลเสีย อันตราย การปฐมพยาบาลผู้มีภาวะแพนิค',
        choice4: 'ข้อ4 การรักษาด้วยยา การดูแลจิตใจ การปรับพฤติกรรม',
        choice5: 'ข้อ5 การดูแลผู้ป่วย การให้คำปรึกษา อาหารที่ควรระวัง',
        answer: 4,
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
        answer: 5,
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