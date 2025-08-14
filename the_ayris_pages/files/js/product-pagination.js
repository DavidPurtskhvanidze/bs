// new 2025-04-24

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll('.product-pictures-wrapper .swiper-slide');
    const pagination = document.getElementById('fxProductPicturesPagination');
    const container = document.querySelector('.fn-product-section');

    // Click to scroll
    sections.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.index = index;
        pagination.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Click to scroll
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll detection
    function activateDot() {
        let closestIndex = 0;
        let minDist = Infinity;
        sections.forEach((section, index) => {
            const dist = Math.abs(section.getBoundingClientRect().top);
            if (dist < minDist) {
                minDist = dist;
                closestIndex = index;
            }
        });
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[closestIndex]) dots[closestIndex].classList.add('active');
    }

    // Sticky/Absolute
    function handleSticky() {
        const containerRect = container.getBoundingClientRect();
        const paginationHeight = pagination.offsetHeight;

        if (containerRect.bottom <= window.innerHeight) {
            pagination.classList.add('absolute');
        } else {
            pagination.classList.remove('absolute');
        }
    }

    window.addEventListener('scroll', () => {
        activateDot();
        handleSticky();
    });

    window.addEventListener('resize', () => {
        activateDot();
        handleSticky();
    });

    activateDot();
    handleSticky();
});
