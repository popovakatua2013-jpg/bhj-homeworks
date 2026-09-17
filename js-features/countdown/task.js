const timerElement = document.querySelector('.timer');
let seconds = parseInt(timerElement.textContent, 10);

const timerId = setInterval(() => {
    seconds--;

    if (seconds <= 0) {
        clearInterval(timerId);
        timerElement.textContent = '0';
        alert('Вы победили в конкурсе!');
    } else {
        timerElement.textContent = seconds;
    }
}, 1000);