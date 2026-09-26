const loader = document.getElementById('loader');
const items = document.getElementById('items');

fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
  .then((response) => response.json())          
  .then((data) => {
    const valutes = data.response.Valute;       

    for (const code in valutes) {               
      const valute = valutes[code];

      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `
        <div class="item__code">${valute.CharCode}</div>
        <div class="item__value">${valute.Value}</div>
        <div class="item__currency">руб.</div>
      `;

      items.appendChild(item);                  
    }

    loader.classList.remove('loader_active');
  });