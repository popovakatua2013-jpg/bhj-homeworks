const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.responseType = 'json';

xhr.addEventListener('load', () => {
  if (xhr.status !== 200) {
    console.error('Ошибка HTTP при загрузке опроса:', xhr.status);
    return;
  }

  const response = xhr.response;
  const pollId = response.id;
  const pollData = response.data;

  pollTitle.textContent = pollData.title;

  pollAnswers.innerHTML = '';

  pollData.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'poll__answer';
    button.textContent = answer;

    button.addEventListener('click', () => {

      alert('Спасибо, ваш голос засчитан!');

      const postXhr = new XMLHttpRequest();
      postXhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
      postXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      postXhr.responseType = 'json';

      postXhr.addEventListener('load', () => {
        if (postXhr.status !== 200) {
          console.error('Ошибка при голосовании:', postXhr.status);
          return;
        }

        const stat = postXhr.response.stat;

        pollAnswers.innerHTML = '';

        stat.forEach((item) => {
          const resultItem = document.createElement('div');
          resultItem.className = 'poll__answer-result';
          resultItem.textContent = `${item.answer}: ${item.votes} голосов`;
          resultItem.style.margin = '8px 0';
          pollAnswers.appendChild(resultItem);
        });
      });

      postXhr.addEventListener('error', () => {
        console.error('Сетевая ошибка при голосовании');
      });

      postXhr.send(`vote=${pollId}&answer=${index}`);
    });

    pollAnswers.appendChild(button);
  });
});

xhr.addEventListener('error', () => {
  console.error('Сетевая ошибка при загрузке опроса');
});

xhr.send();