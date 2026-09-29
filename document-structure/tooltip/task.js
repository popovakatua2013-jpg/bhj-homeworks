/*
 * «Всплывающая подсказка»
 * Занятие 2.3 — «Изменение структуры HTML-документа»
 *
 * Базовый уровень: подсказка появляется по клику на .has-tooltip,
 * текст берётся из атрибута title, позиция считается от положения элемента.
 * Уровень #1: одновременно открыта только одна подсказка.
 * Уровень #2: место появления задаётся data-position (top/left/right/bottom).
 */

document.addEventListener('DOMContentLoaded', () => {

  // Один общий элемент подсказки — создаём один раз и переиспользуем.
  // Поэтому в любой момент времени на странице максимум одна подсказка.
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.style.position = 'absolute'; // страховка, если в CSS это не задано
  document.body.append(tooltip);

  // Элемент, к которому привязана открытая сейчас подсказка
  let activeElement = null;

  /**
   * Размещает подсказку относительно элемента.
   * @param {HTMLElement} element элемент, у которого показываем подсказку
   * @param {string} position 'top' | 'left' | 'right' | 'bottom'
   */
  const placeTooltip = (element, position) => {
    // Координаты элемента в документе (окно + текущая прокрутка)
    const rect = element.getBoundingClientRect();
    const x = rect.left + window.pageXOffset;
    const y = rect.top + window.pageYOffset;

    // Размеры подсказки: текст уже установлен, класс tooltip_active добавлен,
    // поэтому измерение корректно (иначе при display:none было бы 0×0)
    const tip = tooltip.getBoundingClientRect();

    switch (position) {
      case 'top':    // над текстом
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y - tip.height}px`;
        break;
      case 'left':   // слева от текста
        tooltip.style.left = `${x - tip.width}px`;
        tooltip.style.top = `${y}px`;
        break;
      case 'right':  // справа от текста
        tooltip.style.left = `${x + rect.width}px`;
        tooltip.style.top = `${y}px`;
        break;
      case 'bottom': // под текстом
      default:       // по умолчанию — снизу
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y + rect.height}px`;
        break;
    }
  };

  document.querySelectorAll('.has-tooltip').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault(); // иначе <a href=""> перезагрузит страницу

      // Повторный клик по тому же элементу — скрываем подсказку
      if (activeElement === element) {
        tooltip.classList.remove('tooltip_active');
        activeElement = null;
        return;
      }

      // Текст подсказки — из атрибута title
      tooltip.textContent = element.getAttribute('title');

      // Показываем подсказку классом tooltip_active
      tooltip.classList.add('tooltip_active');
      activeElement = element;

      // Позиция из data-position, по умолчанию — снизу
      placeTooltip(element, element.dataset.position || 'bottom');
    });
  });
});