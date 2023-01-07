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
        question: 'คำในวงเล็บเป็นคำที่สัมพันธ์กับอวัยวะใดต่อไปนี้' + '\n' +
            '53 (ecaf) 16' + '\n' +
            '41 ( ?) 58',
        choice1: 'ฟัน',
        choice2: 'หู',
        choice3: 'ศีรษะ',
        choice4: 'ลำไส้',
        choice5: 'กระเพาะ',
        answer: 3,
    },
    {
        question: 'ในการแต่งตั้งคณะกรรมการชุดหนึ่งของจุฬาลงกรณ์มหาวิทยาลัย ได้กำหนดให้เลือกกรรมการ' + '\n' +
            'จาก 3 กลุ่ม ได้แก่ กลุ่มผู้บริหารมหาวิทยาลัยคือ ดิน, ลม, ไฟ กลุ่มผู้บริหารคณะคือ' + '\n' +
            'น้ำ, ฟ้า, ฝน และกลุ่มนิสิตคือ ตะวัน, ภูผา, บูรพา โดยมีเงื่อนไขในการแต่งตั้งดังนี้' + '\n' +
            '1) กรรมการจากกลุ่มผู้บริหารคณะจะต้องมีจำนวนเท่ากับกรรมการจากกลุ่มนิสิต' + '\n' +
            '2) ฟ้า จะไม่ถูกเลือก ถ้ามีการเลือก ไฟ เป็นกรรมการ' + '\n' +
            '3) ฝน จะไม่ถูกเลือก ถ้า ตะวัน ได้รับเลือกเป็นกรรมการแล้ว' + '\n' +
            '4) ถ้าเลือก ดิน เป็นกรรมการ จะต้องเลือก น้ำ จากกลุ่มผู้บริหารคณะด้วย' + '\n' +
            'ถ้า น้ำ ไม่ได้รับเลือกเป็นกรรมการ คณะกรรมการชุดนี้จะมีกรรมการได้สูงสุดกี่คน',
        choice1: '4',
        choice2: '5',
        choice3: '6',
        choice4: '7',
        choice5: '8',
        answer: 2,
    },
    {
        question: 'นายสมหมาย ตัดสินใจจะปต่างจังหวัด โดยมีตัวเลือกคือ เชียงใหม่ เชียงราย ลำปาง' + '\n' +
            'พะเยา น่าน อุตรดิตถ์ แพร่ และลำพูน โดยมีเงื่อนไขว่า' + '\n' +
            'จังหวัดเชียงใหม่ เชียงราย ลำปาง เขาเลือกไป 2 จังหวัด' + '\n' +
            '-ถ้าเขาไม่ไปจังหวัดน่าน แล้วเขาจะไม่ไปจังหวัดแพร่ด้วย' + '\n' +
            '-ถ้าเขาไม่ไปลำปางลำปาง เขาจะไปแพร่' + '\n' +
            '  เขาต้องไปพะเยา' + '\n' +
            '- ถ้าเขาไปลำปาง แล้วเขาจะไปอุตรดิตถ์ด้วย' + '\n' +
            '-ถ้าเขาไปเชียงใหม่ แล้วเขาจะไปอุตรดิตถ์ด้วย' + '\n' +
            '-ถ้าหากเขาไปทั้งหมด 5 จังหวัด แล้วเขาไม่ไปจังหวัดไหนบ้าง',
        choice1: 'เชียงใหม่ อุตรดิตถ์ แพร่',
        choice2: 'เชียงราย น่าน แพร่',
        choice3: 'ลำปาง น่าน ลำพูน',
        choice4: 'เชียงราย แพร่ ลำพูน',
        choice5: 'น่าน แพร่ ลำพูน',
        answer: 2,
    },
    {
        question: 'นอตตัวอย่าง 10 ตัว ได้แก่ A, B, C, D, E, F, G, H, I , J ถ้าจะนำไปใช้จริงแล้ว' + '\n' +
            'จะต้องถูกทดสอบมาก่อน โดย ' + '\n' +
            '1) ถ้า I ไม่ถูกทดสอบแล้ว G จะถูกทดสอบด้วย ' + '\n' +
            '2) ถ้า C ถูกทดสอบแล้ว D จะไม่ถูกทดสอบ' + '\n' +
            '3) ถ้า A ถูกทดสอบแล้ว G จะถูกทดสอบด้วย' + '\n' +
            '4) B, G ไม่ผ่านการถูกทดสอบ' + '\n' +
            '5) D จะต้องถูกใช้ตลอด นอตตัวใดสามารถนำไปใช้จริงได้บ้าง',
        choice1: 'A, D, E',
        choice2: 'B, D, F',
        choice3: 'C, D, H, I',
        choice4: 'D, E, G, I, J',
        choice5: 'D, I',
        answer: 5,
    },

    {
        image: 'img/01.jpg',
        choice1: '4490',
        choice2: '5490',
        choice3: '6490',
        choice4: '5480',
        choice5: '5460',
        answer: 2,
    },
    {
        image: 'img/02.jpg',
        choice1: '90',
        choice2: '91',
        choice3: '92',
        choice4: '93',
        choice5: '94',
        answer: 5,
    },
    {
        image: 'img/03.jpg',
        choice1: '602',
        choice2: '738',
        choice3: '815',
        choice4: '948',
        choice5: '1021',
        answer: 4,
    },
    {
        image: 'img/04.jpg',
        choice1: '105',
        choice2: '106',
        choice3: '107',
        choice4: '108',
        choice5: '109',
        answer: 4,
    },
    {
        image: 'img/11.jpg',
        choice1: 'ข้อ 1',
        choice2: 'ข้อ 2',
        choice3: 'ข้อ 3',
        choice4: 'ข้อ 4',
        choice5: 'ข้อ 5',
        answer: 2,
    },
    {
        image: 'img/12.jpg',
        choice1: 'ข้อ 1',
        choice2: 'ข้อ 2',
        choice3: 'ข้อ 3',
        choice4: 'ข้อ 4',
        choice5: 'ข้อ 5',
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