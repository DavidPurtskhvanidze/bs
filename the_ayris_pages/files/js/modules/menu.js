const header = document.getElementById('headerMain');

function headerBgColorSwitcher() {
    if (window.scrollY > 50) {
        header.classList.add('header_color-active');
    } else {
        header.classList.remove('header_color-active');
    }
}

window.addEventListener('DOMContentLoaded', headerBgColorSwitcher);
window.addEventListener('scroll', headerBgColorSwitcher);

// Hamburger menu
const hamburgerButton = document.getElementById('hamburgerButton');
const headerMenu = document.getElementById('headerMenu');
const closeMenuButton = document.getElementById('closeMenuButton');
hamburgerButton.addEventListener('click', () => {
    headerMenu.classList.toggle('open');
});
closeMenuButton.addEventListener('click', () => {
    headerMenu.classList.remove('open');
});


const BannerPicPlace = document.getElementById('fx-menu-top-insert_img');
const BannerCatName = document.getElementById('fx-menu-top-insert_text');
const menuDropLink = document.querySelectorAll('.menu-drop__list-link');
menuDropLink.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (link.classList.contains('menu-drop__link_underline')) return;
        const newImage = link.getAttribute('data-menu-drop-image');
        const newName = link.getAttribute('data-menu-drop-name');
        BannerPicPlace.setAttribute('src',newImage);
        BannerCatName.innerText = newName;

        menuDropLink.forEach(link => link.classList.remove('menu-drop__link_underline'));
        link.classList.add('menu-drop__link_underline');
    });
});

// Drop down script
function initializeDropdowns(wrapper, button, content) {
    const dropdowns = document.querySelectorAll(wrapper);

    dropdowns.forEach(dropdown => {
        const dropdownButton = dropdown.querySelector(button);
        const dropdownContent = dropdown.querySelector(content);

        dropdownButton.addEventListener('click', () => {
            console.log('dropdownButton click')
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show');
                    otherDropdown.querySelector(content).style.height = '0';
                }
            });

            dropdown.classList.toggle('show');

            if (dropdown.classList.contains('show')) {
                dropdownContent.style.height = dropdownContent.scrollHeight + 'px';
            } else {
                dropdownContent.style.height = '0';
            }
        });

        dropdownContent.addEventListener('transitionend', () => {
            if (!dropdown.classList.contains('show')) {
                dropdownContent.style.height = '';
            }
        });
    });
}

function setupDropdownForMobile() {
    if (window.innerWidth <= 1022) {
        initializeDropdownsHasRun = true;
        initializeDropdowns('.mobile-drop-down', '.mobile-drop-down-button', '.mobile-drop-down-list');
    }
}
window.addEventListener('load', setupDropdownForMobile);

