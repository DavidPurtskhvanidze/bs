document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.fx-basket-list-open');
    const title = toggle.querySelector('.basket-card-list-open-title');
    const list = document.querySelector('.fx-basket-list');

    let isOpen = false;

    toggle.addEventListener('click', () => {
        if (!isOpen) {
            const fullHeight = list.scrollHeight;
            list.style.height = fullHeight + 'px';
            title.textContent = 'Скрыть детали заказа';
        } else {
            list.style.height = list.scrollHeight + 'px';
            requestAnimationFrame(() => {
                list.style.height = '0';
            });
            title.textContent = 'Показать детали заказа';
        }
        isOpen = !isOpen;
    });

    list.addEventListener('transitionend', () => {
        if (isOpen) {
            list.style.height = 'auto';
        }
    });
});