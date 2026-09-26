
const title = document.getElementById('poll__title');
const answers = document.getElementById('poll__answers');
const API_URL = 'https://students.netoservices.ru/nestjs-backend/poll';
let pollId = null;

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    pollId = data.id;
    title.textContent = data.data.title;

    data.data.answers.forEach((answerText) => {
      const button = document.createElement('button');
      button.classList.add('poll__answer');
      button.textContent = answerText;
      answers.appendChild(button);
    });
  });

answers.addEventListener('click', (event) => {
  if (!event.target.classList.contains('poll__answer')) return;

  alert('Спасибо, ваш голос засчитан!');

  const buttons = [...answers.children];
  const answerIndex = buttons.indexOf(event.target);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', API_URL);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.addEventListener('load', () => {
    const stat = JSON.parse(xhr.responseText).stat;
    showResults(stat);
  });
  xhr.send(`vote=${pollId}&answer=${answerIndex}`);
});

function showResults(stat) {
  const total = stat.reduce((sum, item) => sum + item.votes, 0);
  answers.innerHTML = '';

  stat.forEach((item) => {
    const percent = Math.round((item.votes / total) * 100);
    const row = document.createElement('div');
    row.innerHTML = `${item.answer}: <b>${item.votes}</b> голосов (${percent}%)`;
    answers.appendChild(row);
  });
}
