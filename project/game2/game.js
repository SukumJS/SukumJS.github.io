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
        question: 'ในการแข่งขันวิ่งในกีฬาโอลิมปีก' + '\n' +
            'นักกีฬาเบอร์ 3 ถึงเส้นชัยหลังนักกีฬาเบอร์ 1 และนักกีฬาเบอร์ 9' + '\n' +
            'นักกีฬาเบอร์ 9 ถึงเส้นชัยก่อนนักกีฬาเบอร์ 8' + '\n' +
            'นักกีฬาเบอร์ 4 ถึงเส้นชัยก่อนนักกีฬาเบอร์ 1' + '\n' +
            'นักกีฬาเบอร์ 1 ถึงเส้นชัยก่อนนักกีฬาเบอร์ 5' + '\n' +
            'นักกีฬาเบอร์ 8 และนักกีฬาเบอร์ 5 ถึงเส้นชัยพร้อมกัน' + '\n' +
            'นักกีฬาเบอร์ 8 ถึงเส้นชัยหลังนักกีฬาเบอร์ 2, นักกีฬาเบอร์ 7 และนักกีฬาเบอร์ 3' + '\n' +
            'จงหาว่ามีนักกีฬาถึงเส้นชัยก่อนนักกีฬาเบอร์ 5 กี่คน',
        choice1: '3 คน',
        choice2: '4 คน',
        choice3: '5 คน',
        choice4: '6 คน',
        choice5: '7 คน',
        answer: 4,
    },
    {
        question: 'A DE FG H ต่อแถวซื้อของโดยที่' + '\n' +
            'B อยู่หน้า A' + '\n' +
            'C อยู่หลัง B' + '\n' +
            'อยู่หลัง B' + '\n' +
            'E อยู่หน้า F' + '\n' +
            'A F C H อยู่หน้า G' + '\n' +
            'จะมีกี่คนที่สามารถอยู่เป็นลำดับที่ 3 ของแถว',
        choice1: '5',
        choice2: '6',
        choice3: '7',
        choice4: '8',
        choice5: '9',
        answer: 3,
    },
    {
        question: 'ลูกเต๋าลูกหนึ่งมีสีในแต่ละด้านแตกต่างกัน และอยู่ในตำแหน่งต่างๆ ดังนี้' + '\n' +
            '1) ด้านสีม่วงอยู่ระหว่างด้านสีดำและสีเหลือง' + '\n' +
            '2) ด้านสีเขียวอยู่ชิดกับด้านสีส้ม' + '\n' +
            '3) ด้านสีเหลืองอยู่ที่ด้านล่างของลูกเต๋า' + '\n' +
            '4) ด้านสีแดงอยู่ชิดกับด้านสีเขียว' + '\n' +
            '5) ด้านสีเหลืองอยู่ตรงข้ามกับด้านสีดำ' + '\n' +
            'อยากทราบว่าด้านใดอยู่ชิดกับด้านสีส้ม',
        choice1: 'สีเหลือง, สีม่วง, สีดำ, สีเขียว',
        choice2: 'สีดำ , สีเขียว, สีม่วง, สีแดง',
        choice3: 'สีม่วง, สีดำ, สีแดง, สีเหลือง',
        choice4: 'สีแดง, สีเขียว, สีเหลือง, สีดำ',
        choice5: 'สีเขียว, สีแดง, สีเหลือง, สีม่วง',
        answer: 1,
    },
    {
        question: 'กำหนดให้มีเด็ก 12 คน ดังนี้' + '\n' +
            'ด.ญรุ่งฟ้า (7 ขวบ), ด.ญ.รุ่งใส (6 ขวบ), ด.ญ.สายรุ้ง (4 ขวบ)' + '\n' +
            'ด.ญ.สายฟ้า (5 ขวบ), ด.ญ.สายไหม (6 ขวบ), ด.ช.ตะวัน (9 ขวบ)' + '\n' +
            'ด.ญ.แจ่มใส (8 ขวบ), ด.ญ,ต้นข้าว (11 ขวบ), ด.ญ.ข้าวหอม (8 ขวบ)' + '\n' +
            'ด.ญ.ข้าวใหม่ (10 ขวบ), ด.ช.ต้นกล้า (7 ขวบ), ด.ญ.ข้าวสวย (7 ขวบ)' + '\n' +
            'ตอบคำถาม โดยมีเงื่อนไขว่า' + '\n' +
            'ตอบผิด เพศเดียวกันอายุห่างกันน้อยกว่า 2 ปี ห้ามตอบ' + '\n' +
            'ตอบถูก เพศเดียวกันอายุห่างกันมากกว่าเท่ากับ 2 ปี ห้ามตอบ' + '\n' +
            'ถ้า รุ่งฟ้า ตอบคำถามแรกผิด ลำดับ 2-4 จะเป็นยังไง เรียงตามลำดับ',
        choice1: 'ด.ญรุ่งใส (6 ขวบ), ด.ช.ตะวัน (9 ขวบ), ด.ญ.สายรุ้ง (4 ขวบ)',
        choice2: 'ด.ญ.ข้าวสวย (7 ขวบ), ด.ญ.ต้นข้าว (1 1 ขวบ), ด.ช.สายฟ้า (5 ขวบ)',
        choice3: 'ด.ญ.แจ่มใส (8 ขวบ), ด.ช.ต้นกล้า (7 ขวบ), ด.ญ.ต้นข้าว (11 ขวบ)',
        choice4: 'ด.ญ.สายไหม (6 ขวบ), ด.ญ.,ข้าวหอม (8 ขวบ), ด.ญ.ข้าวใหม่ (10 ขวบ)',
        choice5: 'ด.ญ.ข้าวใหม่ (10 ขวบ), ด.ญ.สายไหม (6 ขวบ), ด.ญ.รุ่งใส (6 ขวบ)',
        answer: 1,
    },
    {
        image: 'img/01.jpg',
        choice1: 'IBHL',
        choice2: 'IOPJ',
        choice3: 'FGHJ',
        choice4: 'VBNM',
        choice5: 'JKLG',
        answer: 1,
    },
    {
        image: 'img/02.jpg',
        choice1: 'ABCD',
        choice2: 'CABF',
        choice3: 'BCAJ',
        choice4: 'ABCM',
        choice5: 'CABR',
        answer: 3,
    },
    {
        image: 'img/03.jpg',
        choice1: 'N2274N',
        choice2: 'N2378N',
        choice3: 'M2229M',
        choice4: 'O2999O',
        choice5: 'O3339O',
        answer: 3,
    },
    {
        image: 'img/04.jpg',
        choice1: '11N',
        choice2: '11P',
        choice3: '11.1N',
        choice4: '11.1P',
        choice5: '11.2M',
        answer: 2,
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