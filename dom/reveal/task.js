const reveals = document.querySelectorAll('.reveal');

function checkReveals() {
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('reveal_active');
    }
  });
}

window.addEventListener('scroll', checkReveals);

checkReveals();