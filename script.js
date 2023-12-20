// Initial data
let currentQuestion = 0;
let correctAnswers = 0;
showQuestions();

// event
document.querySelector('.scoreArea button').addEventListener('click', resetQuestion);

// functions
function showQuestions() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];
        let percentage = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${percentage}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;

        let optionsHTML = '';
        for (let i in q.options) {
            optionsHTML += `
                <div data-op="${i}" class="option">
                    <span>${parseInt(i) + 1}</span>
                    ${q.options[i]}
                </div>
            `;
        }
        document.querySelector('.options').innerHTML = optionsHTML;

        document.querySelectorAll('.options .option')
            .forEach(item => {
                item.addEventListener('click', optionClickEvent);
            });
    } else {
        // acabaram as questões
        finishQuiz();
    }
}

function optionClickEvent(event) {
    let clickedOption = parseInt(event.target.getAttribute('data-op'));
    let answer = questions[currentQuestion].answer === clickedOption;

    if (answer) correctAnswers++;

    currentQuestion++;
    showQuestions();
}


function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = `Tá ruim em?!`;
        document.querySelector('.scorePct').style.color = `#ff0000`;
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = `Muito bom!`;
        document.querySelector('.scorePct').style.color = `#ffff00`;
    } else {
        document.querySelector('.scoreText1').innerHTML = `Parabéns!`;
        document.querySelector('.scorePct').style.color = `#0d630d`;
    }

    document.querySelector('.scorePct')
        .innerHTML = `Acertou ${points}%`;

    document.querySelector('.scoreText2')
        .innerHTML = `Você acertou ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetQuestion() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestions();
}
