const form = document.getElementById('form');
const progress = document.getElementById('progress');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

  // Отслеживаем прогресс загрузки и обновляем progress.value
  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      progress.value = event.loaded / event.total;
    }
  });

  // Обработка успешного завершения загрузки
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      console.log('Файл загружен:', xhr.responseText);
    } else {
      console.error('Ошибка:', xhr.status, xhr.responseText);
    }
  });

  // Обработка сетевых ошибок (обрыв связи, сервер недоступен)
  xhr.addEventListener('error', () => {
    console.error('Сетевая ошибка при загрузке файла');
  });

  xhr.send(formData);
});