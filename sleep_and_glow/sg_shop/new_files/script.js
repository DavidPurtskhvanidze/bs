const sections = document.querySelectorAll(".goods-grid");
const navLinks = document.querySelectorAll(".shop-section__goods_item_action");
const seenSections = new Set();

function highlightMenu() {
    let scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition - 200 >= sectionTop && scrollPosition - 200 < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-id') === id) {
                    link.classList.add('active');

                    if (window.innerWidth < 1279 && !seenSections.has(id)) {
                        seenSections.add(id);
                        link.scrollIntoView({
                            behavior: 'smooth',
                            inline: 'start',
                        });
                    }
                }
            });
        } else {
            seenSections.delete(section.getAttribute('id'));
        }
    });
}

window.addEventListener("scroll", highlightMenu);

navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("data-id");
        const targetSection = document.getElementById(targetId);
        const shopSection = document.getElementsByClassName("shop-section");
        window.scrollTo({
            top: targetSection.offsetTop + (shopSection[0].offsetTop - 190),
            behavior: "smooth"
        });
    });
});


function showOverlaySett(element, data) {
    let overlay = document.querySelectorAll('[data-viewproduct="'+ data +'"]');
    overlay[0].classList.toggle('overlay-show');
}
function showCartToaster() {
    const cardToaster = document.getElementsByClassName("shop-cart-toaster");
    cardToaster[0].classList.add('show');
    setTimeout(() => {
        cardToaster[0].classList.remove('show');
    }, 4000);
}
function closeCartToaster() {
    const cardToaster = document.getElementsByClassName("shop-cart-toaster");
    cardToaster[0].classList.remove('show');
}
function clickOnSett(element, data) {
    element.classList.toggle('active');
    let currentSett = document.querySelectorAll('[data-overlay-sett-size="'+ data +'"]');
    currentSett[0].classList.add('hidden');

    let nextSett = document.querySelectorAll('[data-overlay-sett-color="'+ data +'"]');
    nextSett[0].classList.remove('hidden');
    nextSett[0].classList.add('visible');
}

function shopSectionSidebarPosition() {
    const mainBlock = document.getElementsByClassName("store");
    const headerInfo = document.getElementsByClassName("header-info");
    const headerCommon = document.getElementsByClassName("header-common");
    const shopSectionSidebar = document.querySelector(".shop-section .shop-section__goods_sidebar > div");
    if (window.innerWidth <= 1278) {
        mainBlock[0].style.setProperty("padding-top", `${headerInfo[0].offsetHeight + headerCommon[0].offsetHeight + shopSectionSidebar.offsetHeight}px`);
        shopSectionSidebar.style.setProperty("top", `${headerInfo[0].offsetHeight + headerCommon[0].offsetHeight}px`);
    } else {
        mainBlock[0].removeAttribute("style");
        shopSectionSidebar.removeAttribute("style");
    }
}
shopSectionSidebarPosition();
window.addEventListener("resize", shopSectionSidebarPosition);