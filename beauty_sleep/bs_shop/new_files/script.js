const sections = document.querySelectorAll(".goods-grid");
const navLinks = document.querySelectorAll(".shop-section__goods_item");
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
                    if (window.innerWidth < 1279) {
                        link.scrollIntoView({
                            behavior: 'smooth',
                            inline: 'center'
                        });
                    }
                }
            });
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

function setMobTopPadding() {
    let headerInfoHeight = $(".header-info").length > 0 ? $(".header-info").height() : 0;
    let headerHeight = $("header").length > 0 ? $("header").height() : 0;
    if (window.innerWidth < 1023) {
        $("main.shop-store").css('padding-top', headerInfoHeight + headerHeight + 'px');
    }
}
setMobTopPadding();
window.addEventListener('resize', setMobTopPadding);
