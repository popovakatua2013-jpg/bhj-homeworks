const cookie = document.getElementById('cookie');
const counterElement = document.getElementById('clicker__counter');

// Для варианта Б — раскомментируй две строки:
// const speedElement = document.createElement('span');
// speedElement.id = 'clicker__speed';

let speedElement = document.getElementById('clicker__speed'); // для варианта А

let counter = 0;
let lastClickTime = null;
const baseSize = 200;   // совпадает с width="200" в HTML
const sizeDelta = 20;

cookie.onclick = () => {
    counter++;
    counterElement.textContent = counter;

    // Скорость клика (повышенный уровень)
    const now = new Date();
    if (lastClickTime !== null) {
        const elapsed = (now.getTime() - lastClickTime.getTime()) / 1000;
        const speed = (1 / elapsed).toFixed(2);
        speedElement.textContent = `${speed} кликов/сек`;
    }
    lastClickTime = now;

    // Чередование размера
    if (counter % 2 !== 0) {
        cookie.width = baseSize + sizeDelta;
    } else {
        cookie.width = baseSize - sizeDelta;
    }
};