const signin = document.querySelector('#signin');
const form = document.querySelector('#signin__form');
const welcome = document.querySelector('#welcome');
const userIdEl = document.querySelector('#user_id');
const STORAGE_KEY = 'user_id';

// Элемент для сообщения об ошибке (в разметке его нет — создаём сами)
const message = document.createElement('div');
message.className = 'error-message';
message.style.color = '#e74c3c';
form.appendChild(message);

function showWelcome(id) {
  signin.classList.remove('signin_active');
  userIdEl.textContent = id;
  welcome.classList.add('welcome_active');
}

// 1. При загрузке страницы проверяем сохранённый id
const savedId = localStorage.getItem(STORAGE_KEY);
if (savedId) {
  showWelcome(savedId);
} else {
  signin.classList.add('signin_active');
}

// 2. Отправка формы
form.addEventListener('submit', (e) => {
  e.preventDefault();
  message.textContent = '';

  const xhr = new XMLHttpRequest();
  xhr.open('POST', form.action); // адрес берём из атрибута action
  xhr.responseType = 'json';     // ответ сразу придёт распарсенным

  xhr.addEventListener('load', () => {
    if (xhr.response && xhr.response.success) {
      const id = xhr.response.user_id;
      localStorage.setItem(STORAGE_KEY, id); 
      showWelcome(id);
    } else {
      message.textContent = 'Неверный логин/пароль';
    }
  });

  xhr.addEventListener('error', () => {
    message.textContent = 'Ошибка соединения с сервером';
  });

  xhr.send(new FormData(form));
});