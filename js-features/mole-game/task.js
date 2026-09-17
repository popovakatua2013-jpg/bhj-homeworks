// base.js обёрнут в IIFE — его getHole снаружи не видна,
// поэтому объявляем свою (по образцу из base.js)
const getHole = index => document.getElementById(`hole${index}`);

const deadElement = document.getElementById('dead');
const lostElement = document.getElementById('lost');

let dead = 0;
let lost = 0;

for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);

    hole.onclick = () => {
        if (hole.classList.contains('hole_has-mole')) {
            // попали по кроту
            dead++;
            deadElement.textContent = dead;

            if (dead === 10) {
                alert('Победа! Вы убили 10 кротов.');
                dead = 0;
                lost = 0;
                deadElement.textContent = dead;
                lostElement.textContent = lost;
            }
        } else {
            // промах
            lost++;
            lostElement.textContent = lost;

            if (lost === 5) {
                alert('Вы проиграли! 5 промахов.');
                dead = 0;
                lost = 0;
                deadElement.textContent = dead;
                lostElement.textContent = lost;
            }
        }
    };
}