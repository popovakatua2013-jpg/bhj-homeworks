// Находим книгу и все кнопки размера шрифта
const book = document.getElementById('book');
const sizeControls = document.querySelectorAll('.font-size');

sizeControls.forEach((control) => {
  control.addEventListener('click', (event) => {
    // ВАЖНО: отменяем действие ссылки, иначе страница перезагрузится!
    event.preventDefault();

    // 1. Убираем active со всех кнопок, ставим на нажатую
    sizeControls.forEach((item) => item.classList.remove('font-size_active'));
    control.classList.add('font-size_active');

    // 2. Сбрасываем размер книги и ставим нужный
    book.classList.remove('book_fs-big', 'book_fs-small');

    const size = control.dataset.size; // 'small', 'big' или undefined
    if (size) {
      book.classList.add(`book_fs-${size}`);
    }
  });
});