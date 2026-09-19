const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const valueElement = dropdown.querySelector('.dropdown__value');
    const listElement = dropdown.querySelector('.dropdown__list');
    const links = dropdown.querySelectorAll('.dropdown__link');

    valueElement.addEventListener('click', () => {
        listElement.classList.toggle('dropdown__list_active');
    });

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            valueElement.textContent = link.textContent.trim();
            listElement.classList.remove('dropdown__list_active');
        });
    });
});