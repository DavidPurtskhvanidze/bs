document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.fn-tab-button');
    const tabContents = document.querySelectorAll('.fn-tab-content');

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            tabContents.forEach((content) => content.classList.remove('active'));
            const targetTab = button.getAttribute('data-tab');
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});