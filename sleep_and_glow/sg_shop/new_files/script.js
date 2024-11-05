const sections = document.querySelectorAll(".goods-grid");
const navLinks = document.querySelectorAll(".shop-section__goods_item");
const slideProductImages = document.querySelectorAll(".goods-grid-product-box .slide-product__img");
function highlightMenu() {
    let scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition - 200 >= sectionTop && scrollPosition - 200 < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove("active"));
            navLinks[index].classList.add("active");
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
function imgHeight() {
    const slideProductImg = document.getElementsByClassName("slide-product__img");
    slideProductImages.forEach((slideProductImages) => {
        slideProductImages.style.height = slideProductImg[0].offsetHeight + 'px';
    });
}
window.addEventListener('load', imgHeight);
window.addEventListener('resize', imgHeight);