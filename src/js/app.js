const questions = [{
        question: "Что означает HTML?",
        answers: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminals Motorboats Lamborginis",
        ],
        correct: 1,
    },
    {
        question: "Что означает CSS?",
        answers: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats",
        ],
        correct: 2,
    },
    {
        question: "Какой язык работает в браузере?",
        answers: ["Java", "C", "Python", "JavaScript"],
        correct: 4,
    },
    {
        question: "В каком году был создан JavaScript?",
        answers: ["1996", "1995", "1994", "все ответы неверные"],
        correct: 2,
    },
    {
        question: "Какой тег содержит JavaScript код?",
        answers: ['style', 'script', 'code', 'body'],
        correct: 2,
    },
    {
        question: "Какое ключевое слово используется в современном JavaScript для работы с переменными?",
        answers: ['int', 'var', 'variable', 'let'],
        correct: 4,
    },
    {
        question: "Какой результат cследующего выражения 38%5 ?",
        answers: ['7', '38%5', '3', 'NaN'],
        correct: 3,
    },
    {
        question: "Логическое И (&&) возвращает true(истина), если:",
        answers: [
            'Обе операнды истинны',
            'Если какой-нибудь из операндов истинный, но не оба',
            'Если истинный только один из операндов'
        ],
        correct: 1,
    },
    {
        question: "Логическое НЕ возвращает true(истина), если:",
        answers: [
            "Операнд является ложным(false)",
            "Операнд является истинным(true)"
        ],
        correct: 1,
    },
    {
        question: "Оператор switch может быть использован для замены...",
        answers: ["комментариев", "множества операторов if else", "обьявления переменных"],
        correct: 2,
    }
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.addEventListener('click', checkAnswer);

function clearPage() {
    headerContainer.innerHTML = "";
    listContainer.innerHTML = "";
}

function showQuestion() {

    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title;

    let answerNumber = 1;
    for (let answerText of questions[questionIndex]['answers']) {
        const variantAnswerTemplate = `
          <li>
             <label>
				  	    <input value="%number%" type="radio" class="answer" name="answer" />
					     <span>%answer%</span>
			  	  </label>
          </li>`;
        const answerHTML = variantAnswerTemplate
            .replace('%answer%', answerText)
            .replace('%number%', answerNumber);
        listContainer.innerHTML += answerHTML;
        answerNumber++;
    }
}

function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
    if (!checkedRadio) {
        submitBtn.blur();
        return
    }
    const userAnswer = +checkedRadio.value;


    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
    }

    if (questionIndex !== questions.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion();
    } else {
        clearPage();
        showResults();
    }
}

function showResults() {
    const resultsTemplate = `
              <h2 class="title">%title%</h2>
              <h3 class="summary">%message%</h3>
              <p class="result">%result%</p>`;

    let title, message;

    if (score === questions.length) {
        title = 'Поздравляем 	💥💥💥';
        message = 'Вы ответили верно на все вопросы 👍😎';
    } else if (score * 100 / questions.length >= 50) {
        title = 'Неплохой результат	💥';
        message = 'Вы дали более половины правильных ответов 👍';
    } else {
        title = 'Стоит постараться ☝';
        message = 'Вы дали менее половины правильных ответов 😔';
    }

    let result = `${score} правильных из ${questions.length} вопросов.`;

    const finalMessage = resultsTemplate
        .replace('%title%', title)
        .replace('%message%', message)
        .replace('%result%', result);

    headerContainer.innerHTML = finalMessage;

    submitBtn.blur();
    submitBtn.innerText = 'Начать заново';
    submitBtn.addEventListener('click', () => history.go());
}