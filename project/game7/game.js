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
        question: '1 2 2 4 3 6 4 8 5 ........ ',
        choice1: '3 ',
        choice2: '7 ',
        choice3: '10 ',
        choice4: '12 ',
        answer: 3,
    },
    {
        question: '1 2 6 21 ........ ',
        choice1: '27 ',
        choice2: '29 ',
        choice3: '63 ',
        choice4: '88 ',
        answer: 4,
    },
    {
        question: '316 419 735 616 519 97 716 619 1,335 916 719 ........ ',
        choice1: '69 ',
        choice2: '197 ',
        choice3: '516 ',
        choice4: '1,635 ',
        answer: 2,
    },

    {
        question: '3  4  7   12' + '\n' +
            '4  6  10  16' + '\n' +
            '5  8  ?   20' + '\n' +
            '6  10 16  24 ',
        choice1: '10 ',
        choice2: '11 ',
        choice3: '13 ',
        choice4: '15 ',
        answer: 3,
    },
    {
        question: 'น้ํา : ออกซิเจน   ? : ? ',
        choice1: 'ปุ๋ย : ฟอสฟอรัส ',
        choice2: 'น้ํา : ไนโตรเจน ',
        choice3: 'ดิน : โปแตสเซี่ยม ',
        choice4: 'พืช : ไฮโตรเจน ',
        answer: 1,
    },
    {
        question: 'จากการศึกษาพบว่า ถ้ารับประทานกรดไลโนเนอิกในขนาดร้อยละ 12 ' + '\n' +
            'ของแคลอรี่ที่ควรได้รับจะทําให้ระดับ คอเลสเตอรอลและไตรกลีเซอไรด์ในเลือดลดลง ' + '\n' +
            'ข้อใดสอดคล้องกับข้อความข้างต้น ',
        choice1: 'ถ้าระดับคอเลสเตอรอลและไตรกลีเซอไรด์ในเลือดของคนใดไม่ลดลงแสดงว่า' + '\n' +
            'คนนั้นไม่ได้รับประทานกรดไลโนเลอิกในขนาดร้อยละ 12 แคลอรี่ที่ควรได้รับ ',
        choice2: 'ถ้าคนไม่ได้รับประทานกรดไลโนเลอิกในขนาดร้อยละ 12 แคลอรี่ที่ควรได้รับ' + '\n' +
            'แล้วระดับคอเลสเตอรอลและไตรกลีเซอไรด์ในเลือดจะไม่ลดลง ',
        choice3: 'ถ้าคนใดไม่ได้รับประทานกรดไลโนเลอิกในขนาดร้อยละ 12 แคลอรี่ที่ควรได้รับ' + '\n' +
            'ระดับคอเลสเตอรอลและไตรกลีเซอไรด์ในเลือดของคนนั้นจะเพิ่มขึ้น ',
        choice4: 'ถ้าระดับคอเลสเตอรอลและไตรกลีเซอไรด์ในเลือดของคนใดลดลงแสดงว่าคนนั้น' + '\n' +
            'รับประทานกรดไลโนเลอิกในขนาดร้อยละ 12 แคลอรี่ที่ควรได้รับ ',
        answer: 1,
    },
    {
        question: '“งานวิจัยจากสหรัฐอเมริกาเปิดเผยว่า โรคอ้วนเป็นโรคติดต่อ' + '\n' +
            'โดยคนที่มีเพื่อนอ้วนมีโอกาสที่จะอ้วนตามได้ง่าย เนื่องจากกินมากตามเพื่อนโดยไม่รู้ตัว' + '\n' +
            'แต่ที่น่าแปลกคือ โรคนี้ไม่เกิดขึ้นกับคนที่เป็นสามีภรรยา' + '\n' +
            'แต่มักจะเกิดขึ้นกับเพศเดียวกันมากกว่าและที่น่าดีใจคือ ตรงกันข้ามหากเรามีเพื่อนที่ชอบออกกําลังกาย' + '\n' +
            'หุ่นดี เราก็มีสิทธิจะเป็นเช่นนั้นด้วยเช่นกัน” จากข้างต้นข้อใดกล่าวถูกต้อง ',
        choice1: 'โรคอ้วนติดต่อเฉพาะคนที่เป็นเพื่อนสนิทเพศเดียวกันเท่านั้น ',
        choice2: 'หากเรามีเพื่อนอ้วนจะทําให้เราอ้วน เพราะกินมากตามเพื่อนโดยไม่รู้ตัว ',
        choice3: 'สมหญิงเป็นเพื่อนสมชาย สมชายชอบออกกําลังกาย สมหญิงจึงหุ่นดี ',
        choice4: 'โรคอ้วนจะไม่เกิดขึ้นกับคนที่มีสามีหรือภรรยา ',
        answer: 2,
    },
    {
        question: 'นักเรียนมักจะชอบปลอมลายมือผู้ปกครอง ครูและผู้ปกครองจะต้องหาทางแก้ไข...............นี้ให้หมดไป' + '\n' +
            'เพราะอาจไปปลอมลายมือในโอกาสอื่น ซึ่งเป็นความผิดทั้ง...............และพฤตินัย ',
        choice1: 'พฤติกรรม, นิรนัย ',
        choice2: 'พฤติกรรม, นิตินัย ',
        choice3: 'พฤติการณ์, นิรนัย ',
        choice4: 'พฤติการณ์, นิตินัย ',
        answer: 4,
    },
    {
        image: 'img/11.jpg',
        choice1: 'ข้อ 1',
        choice2: 'ข้อ 2',
        choice3: 'ข้อ 3',
        choice4: 'ข้อ 4',
        choice5: 'ข้อ 5',
        answer: 1,
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