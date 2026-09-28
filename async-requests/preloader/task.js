const sourceUrl = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
const items = document.getElementById('items');
const loader = document.getElementById('loader');

const xhr = new XMLHttpRequest();
xhr.open('GET', sourceUrl, true);
xhr.responseType = 'json';

xhr.addEventListener('load', () => {
  if (xhr.status !== 200) {
    console.error('Ошибка HTTP:', xhr.status);
    loader.classList.remove('loader_active');
    return;
  }

  items.innerHTML = '';

  const valutes = xhr.response.response.Valute;

  Object.keys(valutes).forEach((key) => {
    const valute = valutes[key];

    const item = document.createElement('div');
    item.className = 'item';

    const code = document.createElement('div');
    code.className = 'item__code';
    code.textContent = valute.CharCode;

    const value = document.createElement('div');
    value.className = 'item__value';
    value.textContent = valute.Value;

    const currency = document.createElement('div');
    currency.className = 'item__currency';
    currency.textContent = 'руб.';

    item.appendChild(code);
    item.appendChild(value);
    item.appendChild(currency);

    items.appendChild(item);
  });

  loader.classList.remove('loader_active');
});

xhr.addEventListener('error', () => {
  console.error('Сетевая ошибка при загрузке курсов');
  loader.classList.remove('loader_active');
});

xhr.send();
EOF