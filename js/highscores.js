const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(document.querySelector('#highScoresList')) || []

highScoresList.innerHTML =
    highScores.map(score => {
        return <li class="high-score">${score.name} - ${score.score}</li>
    }).join('')
