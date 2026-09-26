const title = document.getElementById('poll__title');
const answers = document.getElementById('poll__answers');
const API_URL = 'https://students.netoservices.ru/nestjs-backend/poll';

// 1.  опрос
fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    // 2. вопрос
    title.textContent = data.data.title;

    // 3.  кнопка для каждого ответа
    data.data.answers.forEach((answerText) => {
      const button = document.createElement('button');
      button.classList.add('poll__answer');
      button.textContent = answerText;
      answers.appendChild(button);
    });
  });

// 4. реакция на клик 
answers.addEventListener('click', (event) => {
  if (!event.target.classList.contains('poll__answer')) return;

  alert('Спасибо, ваш голос засчитан!');
});