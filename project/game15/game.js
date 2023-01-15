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
        question: '50% 75% 62.5% 43.75% ?' + '\n' +
            'จงหาตัวเลขที่หายไป',
        choice1: '28.125%',
        choice2: '31.25%',
        choice3: '32.50%',
        choice4: '53.125%',
        choice5: '56.25%',
        answer: 1,
    },

    {
        question: '2 4 3 7 5 13 10 26 22 A B' + '\n' +
            'จงหาค่า A+B',
        choice1: '93',
        choice2: '96',
        choice3: '103',
        choice4: '112',
        choice5: '116',
        answer: 3,
    },

    {
        question: 'ปัจจุบันอัตราส่วนอายุของสุกิจต่ออายุของจำปีเป็น 5 ต่อ 7 ถ้าอีก5 ปีข้างหน้า พบว่าอัตราส่วนอายุของสุกิจต่ออายุของจำปีเป็น 3:4 อยากทราบว่าอายุของจำปีเมื่อ 3 ปีที่แล้วเท่ากับเท่าใด',
        choice1: '22',
        choice2: '25',
        choice3: '37',
        choice4: '35',
        choice5: '32',
        answer: 5,
    },

    {
        question: 'สมพรซื้อหมู 4 ตัว ไก่ 3 ตัว ราคา 2900 บาท พรพิมพ์ซื้อหมู 3 ตัว ไก่ 4 ตัว ราคา 2700 บาท จงหาว่าซื้อหมู 2 ตัว ไก่ 2 ตัว ต้องจ่ายเงินทั้งหมดกี่บาท',
        choice1: '2400',
        choice2: '2100',
        choice3: '1800',
        choice4: '1600',
        choice5: '1400',
        answer: 4,
    },

    {
        question: 'ข้อใดใช้คำถูกความหมาย',
        choice1: 'กระทรวงสาธารณสุขเตรียมเสนอให้รัฐบาลผ่อนผันมาตรการเดินทางเข้าประเทศในรูปแบบเทสต์แอนด์โก',
        choice2: 'รวมทั้งเตรียมเปิดจุดผ่อนคลายทางการค้าระหว่างไทยกับประเทศเพื่อนบ้านเพื่อให้เกิดความคล่องตัวทางเศรษฐกิจมากขึ้น',
        choice3: 'ขณะที่หลายธนาคารได้ออกมาตรการช่วยเหลือลูกหนี้ที่ได้รับผลกระทบจากวิกฤติโควิค-19 เพื่อผ่อนหนักเป็นเบา',
        choice4: 'สำหรับลูกค้าสินเชื่อบัตรเครดิต ธนาคารได้ช่วยเหลือโดยผ่อนปรนให้ไม่ต้องชำระหนี้ตามยอดเรียกเก็บ 3 รอบบัญชี',
        choice5: 'ด้านการไฟฟ้านครหลวงเปิดให้ประชาชนลงทะเบียนขอผ่อนส่งค่าไฟฟ้าเพื่อพักชำระค้าไฟฟ้า และขยายเวลาชำระออกไป 3-6 เดือน',
        answer: 3,

    },
    {
        question: 'ข้อใดใช้ภาษาทางการ',
        choice1: 'สธ.จัดเวิร์กชอป “กัญชาทางการแพทย์” ขับเคลื่อนนโยบายรัฐบาลอย่างเป็นรูปธรรม',
        choice2: 'เพื่อส่งเสริมให้ประชาชนทั่วไปสามารถเข้าถึงกัญชา และสมุนไพรทางการแพทย์ได้อย่างเหมาะสมและปลอดภัย',
        choice3: 'ระดม 200 หมอ ผู้บริหาร นักวิชาการ ผู้เชี่ยวชาญหลากหลายด้านมารวมตัวช่วยกันทำแผนปฏิบัติการ',
        choice4: 'เพราะจะได้ลดรายจ่าย เพิ่มรายได้ คนไทยร่างการแข็งแรงเศรษฐกิจของประเทศก็แข็งแรงตามนโยบายรัฐ',
        choice5: 'ท่ามกลางเสียงเตือนของแพทย์และนักวิชาการหลายคนที่พากันออกมาฟันธงว่ากัญชาจะทำลายสุขภาพของคนไทย',
        answer: 2,
    },
    {
        question: 'ควรเติมสำนวนใดลงในช่องว่างต่อไปนี้ “ปล่อยให้สนามกีฬาโรงเรียนทรุดโทรมอยู่นาน พอรู้ว่ารัฐมนตรีจะมาตรวจเยี่ยมวันพรุ่งนี้ ก็รีบจ้างช่างมาทาสี และซ่อมแซมเสียใหม่จนสวยงาม แถมยังสั่งให้คนไปซื้ออุปกรณ์กีฬามาวางเพิ่มอีก แบบนี้เขาเรียกว่า____แท้ๆ”',
        choice1: 'สุกเอาเผากิน',
        choice2: 'ผักชีโรยหน้า',
        choice3: 'น้ำขึ้นให้รีบตัก',
        choice4: 'ผัดวันประกันพรุ่ง',
        choice5: 'ช้าๆ ได้พร้าเล่มงาม',
        answer: 2,
    },
    {
        question: 'ผู้กล่าวข้อความต่อไปนี้มีลักษณะนิสัยหลายประการ ยกเว้นข้อใด “ผมไม่อยากให้แม่เป็นห่วงผมอย่างเดียว แต่อยากให้แม่เชื่อใจผมด้วย”',
        choice1: 'ตรงไปตรงมา',
        choice2: 'มั่นใจในตนเอง',
        choice3: 'ต้องการกำลังใจ',
        choice4: 'ใส่ใจความรู้สึกผู้อื่น',
        choice5: 'ไม่ชอบให้คนเป็นห่วง',
        answer: 5,
    },
    {
        image: 'img/11.jpg',
        choice1: 'ข้อ 1',
        choice2: 'ข้อ 2',
        choice3: 'ข้อ 3',
        choice4: 'ข้อ 4',
        choice5: 'ข้อ 5',
        answer: 5,
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