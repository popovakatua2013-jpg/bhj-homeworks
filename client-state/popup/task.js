const modal = document.querySelector('#subscribe-modal');
const closeButton = modal.querySelector('.modal__close');
const COOKIE_NAME = 'popupClosed';

function getCookie(name) {
  const cookie = document.cookie.split('; ')
    .find(item => item.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
}

if (getCookie(COOKIE_NAME) === null) {
  modal.classList.add('modal_active');
}

closeButton.addEventListener('click', () => {
  modal.classList.remove('modal_active');
  document.cookie = COOKIE_NAME + '=true; path=/';
});