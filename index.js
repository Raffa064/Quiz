const QUESTIONS = [];

fetch('./questions.txt').then(res => res.text()).then(data => {
    const lines = data.split('\n')

    const questions = []
    for (var i = 0; i < lines.length; i += 6) {
        const statement = lines[i]
        const answers = [lines[i + 1], lines[i + 2], lines[i + 3], lines[i + 4]]

        const rightAnswer = answers.findIndex((answer) => answer.startsWith('!'))
        answers[rightAnswer] = answers[rightAnswer].substr(1)

        questions.push({
            statement,
            rightAnswer,
            answers
        })
    }

    for (let i = 0; i < 10; i++) {
        const j = Math.floor(Math.random() * questions.length)
        QUESTIONS.push(questions[j])
        questions.splice(j, 1)
    }

    nextQuestion()
})


var points = 0
var selectedAnswer = -1
var rightAnswer = 0

const pointCounter = document.querySelector('#points')

const statement = document.querySelector('#statement')

const answerA = document.querySelector('#answer-a')
const answerB = document.querySelector('#answer-b')
const answerC = document.querySelector('#answer-c')
const answerD = document.querySelector('#answer-d')

const optionA = document.querySelector('#option-a')
const optionB = document.querySelector('#option-b')
const optionC = document.querySelector('#option-c')
const optionD = document.querySelector('#option-d')

const nextQuestionButton = document.querySelector('#next-question')

answerA.onchange = () => checkOption(answerA)
answerB.onchange = () => checkOption(answerB)
answerC.onchange = () => checkOption(answerC)
answerD.onchange = () => checkOption(answerD)

nextQuestionButton.onclick = () => {
    if (selectedAnswer === -1) return

    if (selectedAnswer === rightAnswer) {
        points++
    }

    pointCounter.innerHTML = 'Pontos: ' + points

    const onclick = nextQuestionButton.onclick
    nextQuestionButton.onclick = null

    setTimeout(() => {
        nextQuestionButton.onclick = onclick
        nextQuestion()
    }, 500)
}

function checkOption(answer) {
    if (answer.checked) {
        answerA.checked = answerA === answer
        answerB.checked = answerB === answer
        answerC.checked = answerC === answer
        answerD.checked = answerD === answer
    }

    selectedAnswer = [
                answerA,
                answerB,
                answerC,
                answerD,
            ].indexOf(answer)
}

function setQuestion(question) {
    selectedAnswer = -1
    rightAnswer = question.rightAnswer

    statement.innerText = question.statement

    answerA.checked = false
    answerB.checked = false
    answerC.checked = false
    answerD.checked = false

    optionA.innerText = question.answers[0]
    optionB.innerText = question.answers[1]
    optionC.innerText = question.answers[2]
    optionD.innerText = question.answers[3]
}

function nextQuestion() {
    if (QUESTIONS.length == 0) {
        window.location.replace('./finished.html?points='+points+'&id='+randomID())
        return
    }
    
    const question = QUESTIONS[0]
    QUESTIONS.splice(0, 1)

    setQuestion(question)
}

function randomID(size=32) {
    var id = ''
    
    for (var i = 0; i < size; i++) {
        id += Math.floor(Math.random() * 16).toString(16)
    }
    
    return id
} 