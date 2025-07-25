document.addEventListener('DOMContentLoaded', () => {
    const sidebars = document.querySelectorAll('[data-sidebar-box]');

    sidebars.forEach(sidebar => {
        const sidebarId = sidebar.getAttribute('data-sidebar-box');

        const overlay = document.querySelector(`[data-sidebar-overlay="${sidebarId}"]`);
        const openButtons = document.querySelectorAll(`[data-sidebar-open-button="${sidebarId}"]`); // Находим все кнопки
        const closeButton = document.querySelector(`[data-sidebar-close-button="${sidebarId}"]`);

        // Check that all elements are found
        if (!sidebarId || !overlay || openButtons.length === 0 || !closeButton) {
            console.warn(`Sidebar elements with ID "${sidebarId}" not found or missing buttons.`);
            return;
        }

        // Close all sidebars
        const closeAllSidebars = () => {
            sidebars.forEach(sb => {
                const sbOverlay = document.querySelector(`[data-sidebar-overlay="${sb.getAttribute('data-sidebar-box')}"]`);
                sb.classList.remove('open');
                if (sbOverlay) {
                    sbOverlay.classList.remove('active');
                }
            });
            document.body.style.overflow = '';
        };

        // Opening the sidebar
        const openSidebar = (e) => {
            e.stopPropagation();
            closeAllSidebars();
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        // Close current sidebar
        const closeSidebar = () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Add handlers to all open buttons
        openButtons.forEach(button => {
            button.addEventListener('click', openSidebar);
        });

        // Adding Close Button Handlers
        closeButton.addEventListener('click', closeSidebar);

        // Close sidebar when clicking overlay
        overlay.addEventListener('click', closeSidebar);

        // Close on click outside sidebar
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && overlay.classList.contains('active')) {
                closeSidebar();
            }
        });
    });
});
