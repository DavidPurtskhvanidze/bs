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


const linkPicturePlace = document.getElementById('linkPicturePlace');
const menuDropLink = document.querySelectorAll('.menu-drop__list-link');
menuDropLink.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (link.classList.contains('menu-drop__link_underline')) return;
        const newImage = link.getAttribute('data-menu-drop-image');
        const newImageSrc = link.getAttribute('data-menu-drop-image');

        linkPicturePlace.innerHTML = `
            <source srcset="images/pictures/`+ newImage +`.webp" type="image/webp">
            <source srcset="images/pictures/`+ newImage +`.jpg" type="image/jpeg">
            <img src="images/pictures/`+ newImage +`.jpg" alt="Picture">
      `;

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

