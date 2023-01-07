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
        question: 'จากชุดตัวเลขจำนวนเต็มสี่บรรทัดต่อไปนี้' + '\n' +
            '5 6 33' + '\n' + '2 3 15' + '\n ' + '1 6 21' + '\n' + ' 2 6 x' + '\n' + 'ให้หาว่าเครื่องหมาย X ควรแทนด้วยเลขจำนวนเต็มเท่าไร',
        choice1: '24',
        choice2: '33',
        choice3: '42',
        choice4: '65',
        answer: 1,
    },
    {
        question: 'ในงานจัดแสดงสัตว์ของสวนสัตว์แห่งหนึ่งมีสัตว์ 11 ชนิด โดยในงานครั้งนี้ไม่มีนกและจระเข้เลย' + '\n' +
            'ในงานประกอบด้วย เสือซีตาห์, ลิงอุรังอุตัง, ม้าลาย, สิงโต, ยีราฟ, แกะ, กวาง, จิงโจ้, อูฐ, ฮิปโปโปเตมัส' + '\n' + ' สัตว์ชนิดที่ 11 คือข้อใด',
        choice1: 'เต่าทะเล',
        choice2: 'กิ้งก่า',
        choice3: 'งูจงอาง',
        choice4: 'นกยูง',
        choice5: 'กระต่ายป่า',
        answer: 4,
    },
    {
        question: 'ในการเลือกเดินทางไป ชลบุรี ระยอง สุรินทร์ ถ้าไปชลบุรีแล้วจะไม่ไปสุรินทร์' + '\n' + 'ข้อใดสรุปได้ถูกต้อง',
        choice1: 'ไม่มีคนเลือกไปทั้ง 3 จังหวัด',
        choice2: 'มีคนเลือกไปทั้งชลบุรีและระยอง',
        choice3: 'มีคนเลือกไปทั้งระยองและสุรินทร์',
        choice4: 'ถ้าไประยองแล้วจะไม่ไปชลบุรี',
        choice5: 'มีคนเลือกไม่ไปทั้ง 3 จังหวัด',
        answer: 1,
    },
    {
        question: 'มีคน 7 คน คือ A B C D E F และ G แบ่งเป็น 2 กลุ่ม' + '\n' +
            'กลุ่มที่ 1 มี 4 คน กลุ่มที่ 2 มี 3 คน โดยมีเงื่อนไข' + '\n' +
            '1) A ไม่อยู่กับ E และ F' + '\n' +
            '2) G จะอยู่กับ B' + '\n' +
            '3) A อยู่กลุ่ม 1 ก็ต่อเมื่อ C อยู่กลุ่ม 2' + '\n' +
            'ถ้า B อยู่กลุ่ม 1 ข้อใดถูกต้อง',
        choice1: 'G อยู่กลุ่ม 2',
        choice2: 'G และ B อยู่คนละกลุ่มกัน',
        choice3: 'C อยู่กลุ่ม 1 เสมอ',
        choice4: 'A อยู่กลุ่ม 1',
        choice5: 'E และ F อยู่คนละกลุ่มกัน',
        answer: 4,
    },
    {
        image: "img/01.jpg",
        choice1: '7/10',
        choice2: '6/11',
        choice3: '16/14',
        choice4: '19/20',
        choice5: '12/13',
        answer: 1,
    },
    {
        image: 'img/02.png',
        choice1: '26',
        choice2: '27',
        choice3: '28',
        choice4: '29',
        choice5: '30',
        answer: 2,
    },
    {
        image: 'img/03.png',
        choice1: 'Y',
        choice2: 'R',
        choice3: 'T',
        choice4: 'Q',
        choice5: 'O',
        answer: 4,
    },
    {
        image: 'img/04.png',
        choice1: 'ERTY',
        choice2: 'YUIO',
        choice3: 'EJGL',
        choice4: 'OLPI',
        choice5: 'CVBN',
        answer: 1,
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