document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sectionIds = Array.from(sidebarLinks).map(link => link.dataset.sidebar);
    const mainHeader = $('header.header');
    const sidebarBlock = $('.post-sidebar');
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    function sidebarTopPosition() {
        console.log('sidebarTopPosition');
        let sidebarHeight = $(window).height() - mainHeader.height();
        sidebarBlock.css({'overflow-y':'auto','height': sidebarHeight - 32});
    }
    sidebarTopPosition();

    sidebarLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            const targetId = this.dataset.sidebar;
            const target = document.getElementById(targetId);
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 180,
                    behavior: 'smooth'
                });
            }
        });
    });

    function highlightSidebar() {
        const scrollY = window.scrollY;
        let activeIndex = -1;

        sections.forEach((section, i) => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            if (scrollY >= sectionTop - 200) {
                activeIndex = i;
            }
        });

        sidebarLinks.forEach((link, i) => {
            if (i <= activeIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightSidebar);
    window.addEventListener('resize', highlightSidebar);
    window.addEventListener('resize', sidebarTopPosition);
    highlightSidebar();
});