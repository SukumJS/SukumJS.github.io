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
        question: '1265 1049 8213 ........ ',
        choice1: '6417 ',
        choice2: '6415 ',
        choice3: '649 ',
        choice4: '6017 ',
        answer: 4,
    },
    {
        question: '2 7 7 6 9 21 14 12 ........ ',
        choice1: '16 ',
        choice2: '26 ',
        choice3: '33 ',
        choice4: '63 ',
        answer: 4,
    },
    {
        question: '13 22 20 31 28 42 ........ ',
        choice1: '32 ',
        choice2: '34 ',
        choice3: '36 ',
        choice4: '38 ',
        answer: 2,
    },
    {
        question: '122 61 64 32 36 18 ........ ',
        choice1: '23 ',
        choice2: '24 ',
        choice3: '25 ',
        choice4: '26 ',
        answer: 1,
    },
    {
        question: 'เลือกตั้ง : ?   เลือกถิ่นที่อยู่ : ? ',
        choice1: 'สิทธิ : สิทธิ ',
        choice2: 'หน้าที่ : หน้าที่ ',
        choice3: 'สิทธิ : หน้าที่ ',
        choice4: 'หน้าที่ : สิทธิ ',
        answer: 4,
    },
    {
        question: 'การพัฒนาระบบราชการไทยได้แยกจุดเน้นออกเป็น..........ได้แก่ การปรับปรุงการให้บริการแก่ประชาชนให้ดีขึ้น' + '\n' +
            'การปรับบทบาทภารกิจและโครงสร้างให้มีความเหมาะสม การเพิ่มขีดสมรรถนะของระบบราชการและตัว' + '\n' +
            'ข้าราชการให้มีมาตรฐานสูงเทียบเท่าสากลและเปิดระบบราชการสู่กระบวนการความเป็นประชาธิปไตย โดยให้' + '\n' +
            'ประชาชนเข้ามามีส่วนร่วม ยึดหลักการบริหารกิจการบ้านเมืองที่ดีหรือธรรมาภิบาล ',
        choice1: '3 ด้าน ',
        choice2: '4 ด้าน ',
        choice3: '5 ด้าน ',
        choice4: '6 ด้าน ',
        answer: 2,
    },
    {
        question: '“อุปสงค์หมายถึง จํานวนสินค้า หรือบริการชนิดใดชนิดหนึ่งที่ผู้บริโภคต้องการซื้อภายในระยะเวลาหนึ่ง' + '\n' +
            'ณ ระดับราคาต่างๆ กันของสินค้าชนิดนั้นเอง หรือของสินค้าชนิดอื่น หรือระดับรายได้ต่างๆ กันของผู้บริโภค”' + '\n' +
            'ข้อใดสอดคล้องกับข้อความข้างต้น ',
        choice1: 'อุปสงค์เป็นความต้องการสินค้า หรือบริการชนิดใดชนิดหนึ่ง ที่ผู้บริโภคต้องการซื้อภายในระยะเวลาต่างกัน' + '\n' +
            'กับความต้องการสินค้า ณ ระดับราคาต่างๆ กันของสินค้าชนิดนั้น ',
        choice2: 'อุปสงค์เป็นความต้องการสินค้า หรือบริการชนิดใดชนิดหนึ่งที่ผู้บริโภคต้องการซื้อภายในระยะเวลาเดียวกัน' + '\n' +
            'กับความต้องการสินค้า ณ ระดับราคาต่างๆ กันของสินค้าชนิดนั้น',
        choice3: 'อุปสงค์เป็นความต้องการสินค้า หรือบริการชนิดใดชนิดหนึ่งที่ผู้บริโภคต้องการซื้อภายในระยะเวลาใดก็ได้' + '\n' +
            'ณ ระดับราคาต่างๆ กันของสินค้าชนิดนั้น ',
        choice4: 'อุปสงค์คือความต้องการสินค้า หรือบริการชนิดใดชนิดหนึ่งที่ผู้บริโภคต้องการซื้อภายในระยะเวลา' + '\n' +
            'ที่ยังต้องการสินค้า ณ ระดับราคาต่างๆ กันของสินค้าชนิดนั้น ',
        answer: 2,
    },
    {
        question: 'จากการศึกษาพบว่าก๊าซคาร์บอนไดออกไซด์มีผลทําให้ชั้นบรรยากาศมีอุณหภูมิสูงขึ้น ซึ่งทําให้เกิดปรากฏการณ์โลกร้อน' + '\n' +
            'A ปรากฏการณ์โลกร้อนเกิดจากอุณหภูมิในชั้นบรรยากาศที่สูงขึ้น' + '\n' +
            'B ก๊าซคาร์บอนไดออกไซด์เป็นตัวการสําคัญที่ทําให้เกิดภาวะโลกร้อน ',
        choice1: 'A ถูกต้อง ',
        choice2: 'B ถูกต้อง ',
        choice3: 'ทั้ง A และ B ถูกต้อง ',
        choice4: 'ทั้ง A และ B ไม่ถูกต้อง ',
        answer: 3,
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