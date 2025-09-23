(function(){
    const tabsAccord = document.getElementById("fn-tabs-accord");
    const tabAccordButtons = tabsAccord.querySelectorAll(".tab-accord-button");
    const tabAccordContents = tabsAccord.querySelectorAll(".tab-accord-content");
    const accordionHeaders = tabsAccord.querySelectorAll(".accordion-header");

    // --- Инициализация: открытые аккордеоны должны иметь max-height ---
    accordionHeaders.forEach(header => {
        const content = header.nextElementSibling;
        if (header.classList.contains("active")) {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add("open");
        }
    });

    // --- Десктоп табы ---
    tabAccordButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.dataset.tab;

            // кнопки
            tabAccordButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // контент
            tabAccordContents.forEach(c => {
                if (c.parentElement.querySelector(".accordion-header").dataset.tab === tabId) {
                    c.classList.add("active");
                } else {
                    c.classList.remove("active");
                }
            });

            // синхронизируем аккордеон
            accordionHeaders.forEach(h => {
                if (h.dataset.tab === tabId) {
                    h.classList.add("active");
                    h.nextElementSibling.style.maxHeight = h.nextElementSibling.scrollHeight + "px";
                    h.nextElementSibling.classList.add("open");
                } else {
                    h.classList.remove("active");
                    h.nextElementSibling.style.maxHeight = null;
                    h.nextElementSibling.classList.remove("open");
                }
            });
        });
    });

    // --- Мобильный аккордеон ---
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const tabId = header.dataset.tab;
            const content = header.nextElementSibling;

            if (header.classList.contains("active")) {
                // закрываем
                header.classList.remove("active");
                content.style.maxHeight = null;
                content.classList.remove("open");
            } else {
                // закрываем все остальные
                accordionHeaders.forEach(h => {
                    h.classList.remove("active");
                    h.nextElementSibling.style.maxHeight = null;
                    h.nextElementSibling.classList.remove("open");
                });
                // открываем текущий
                header.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add("open");

                // синхронизируем табы
                tabAccordButtons.forEach(b => {
                    b.classList.toggle("active", b.dataset.tab === tabId);
                });
                tabAccordContents.forEach(c => {
                    c.classList.toggle(
                        "active",
                        c.parentElement.querySelector(".accordion-header").dataset.tab === tabId
                    );
                });
            }
        });
    });

})();