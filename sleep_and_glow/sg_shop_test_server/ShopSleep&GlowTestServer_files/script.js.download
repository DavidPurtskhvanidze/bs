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


function showOverlaySett(element, data) {
    // Находим форму, с которой связано событие (это родительский элемент для button)
    const form = element.closest('form');
    if (!form) return;

    // Находим overlay, связанный с этой конкретной формой
    let overlay = form;
    if (!overlay) return; // Если overlay не найден, прекращаем выполнение

    // Находим поле "count" и уменьшаем его значение
    const countInput = form.querySelector('input[name="count"]');
    if (countInput) {
        if (form.classList.contains("form_size") || form.classList.contains("form_color")) {
            let currentCount = parseInt(countInput.value, 10) || 1;
            countInput.value = currentCount > 0 ? currentCount - 1 : 1;
        } else {
            let currentCount = parseInt(countInput.value, 10) || 1;
            countInput.value = currentCount > 0 ? currentCount - 1 : 1; // Убедимся, что количество не будет меньше
        }
    }
    // Находим элемент с количеством и обновляем его
    const quantityDisplay = form.querySelector('.add-quantity-button-quantity-count');
    if (quantityDisplay) {
        if (form.classList.contains("form_size") || form.classList.contains("form_color")) {
            let currentDisplayCount = parseInt(quantityDisplay.textContent, 10) || 1;
            quantityDisplay.textContent = currentDisplayCount > 0 ? currentDisplayCount - 1 : 1; // Убедимся, что количество не будет меньше 0
        } else {
            let currentDisplayCount = parseInt(quantityDisplay.textContent, 10) || 1;
            quantityDisplay.textContent = currentDisplayCount > 0 ? currentDisplayCount - 1 : 1; // Убедимся, что количество не будет меньше 0
        }
    }

    // Если количество стало 0, скрываем overlay
    if (countInput.value == 0) {
        overlay.classList.toggle('overlay-show');
        /*countInput.value = 1;  // Восстанавливаем значение count
        quantityDisplay.textContent = 1;*/ // Восстанавливаем отображаемое количество
    }

}

function showCartToaster(form, action) {
    closeCartToaster();
    const productTitle = form.querySelector('.slide-product__information_title').textContent;
    const productImage = form.querySelectorAll('.slide-product__img a img')[0].getAttribute('src');

    if (form && form.querySelector('input[name="options[color]"]')) {
        console.log('Input с name="options[color]" найден.');
        const activeButton = form.querySelector('button.active[data-color]');
        const buttonDataColor = activeButton.getAttribute('data-color');
        const matchingImg = form.querySelector(`.slide-product__img a img[data-color="${buttonDataColor}"]`);
        document.querySelector('.shop-cart-toaster-img img').setAttribute("src", matchingImg.getAttribute('src'));

    } else {
        // Устанавливаем изображение
        document.querySelector('.shop-cart-toaster-img img').setAttribute("src", productImage);
    }
    if (action == "delete") {
        $(".shop-cart-toaster-text-desc").text("has been removed from cart");
    } else if (action == "change") {
        $(".shop-cart-toaster-text-desc").text("count changed");
    } else
    {
        $(".shop-cart-toaster-text-desc").text("has been added to cart");
    }
    // Устанавливаем название продукта
    document.querySelector('.shop-cart-toaster-text-item-title').textContent = productTitle;

    console.log(productTitle);
    console.log(productImage);

    const cardToaster = document.getElementsByClassName("shop-cart-toaster");
    cardToaster[0].classList.add('show');
    setTimeout(() => {
        cardToaster[0].classList.remove('show');
    }, 4000);
    /*sAgGlobalFunctions.send_ajax_rerender_minicart();
    sAgGlobalFunctions.send_ajax_rerender_cart();*/
    $('.shopping-cart.js-minicart.active').removeClass("active");
    $("html,body").removeClass("noscroll");
}
function closeCartToaster() {
    const cardToaster = document.getElementsByClassName("shop-cart-toaster");
    cardToaster[0].classList.remove('show');
}
function clickOnSett(element, data) {
    element.classList.toggle('active');

    console.log(element);
    let currentSett = document.querySelectorAll('[data-overlay-sett-size="'+ data +'"]');
    //currentSett[0].classList.add('hidden');

    let nextSett = document.querySelectorAll('[data-overlay-sett-color="'+ data +'"]');
    nextSett[0].classList.remove('hidden');
    nextSett[0].classList.add('visible');
}

document.addEventListener('DOMContentLoaded', function () {
    // Находим все кнопки увеличения
    const increaseButtons = document.querySelectorAll('.add-quantity-button-increase');

    increaseButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Находим форму, связанную с кнопкой
            const form = this.closest('form');
            if (!form) return;

            // Находим поле "count" и увеличиваем его значение
            const countInput = form.querySelector('input[name="count"]');
            if (countInput) {
                let currentCount = parseInt(countInput.value, 10) || 0;
                countInput.value = currentCount + 1;
            }

            // Находим элемент с количеством и обновляем его
            const quantityDisplay = form.querySelector('.add-quantity-button-quantity-count');
            if (quantityDisplay) {
                let currentDisplayCount = parseInt(quantityDisplay.textContent, 10) || 0;
                quantityDisplay.textContent = currentDisplayCount + 1;
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const addSize = document.querySelectorAll('.to_cart_size [name="options_size"]');
    addSize.forEach(button => {
        // Удаляем класс "active" изначально
        //button.classList.remove("active");

        // Добавляем обработчик событий
        button.addEventListener('click', function () {
            // Снимаем "active" со всех кнопок
            addSize.forEach(btn => btn.classList.remove("active"));

            // Добавляем "active" для текущей кнопки
            this.classList.add("active");

            const form = this.closest('form');
            if (!form) return;

            // Выполняем действия
            shopCheckModification(this, form, 'size');
            addProductFromCatalog(this);
            showCartToaster(form);
        });
    });

    const addSizeColor = document.querySelectorAll('.to_cart_color [name="options_size"]');
    addSizeColor.forEach(button => {
        button.addEventListener('click', function () {
            addSizeColor.forEach(btn => btn.classList.remove("active"));

            // Добавляем "active" для текущей кнопки
            this.classList.add("active");

            const form = this.closest('form');
            if (!form) return;
            shopCheckModification(this, form, 'size');
        });
    });

    const addColor = document.querySelectorAll('.to_cart_color [name="options_color"]');
    addColor.forEach(button => {
        button.addEventListener('click', function () {
            // Снимаем "active" со всех кнопок
            addColor.forEach(btn => btn.classList.remove("active"));

            // Добавляем "active" для текущей кнопки
            this.classList.add("active");

            const form = this.closest('form');
            if (!form) return;

            // Выполняем действия
            shopCheckModification(this, form, 'color');
            addProductFromCatalog(this);
            showCartToaster(form);
        });
    });


});




function shopCheckModification(el, form, mod_name) {
    // Находим поле "count" и увеличиваем его значение
    const modValue = el.getAttribute('value');
    //if (mod_name == "size") {
    const radioToCheck = form.querySelector(`[name="options[${mod_name}]"][value="${modValue}"]`);

    console.log(modValue);
    console.log(radioToCheck);
    if (radioToCheck) {
        const allRadios = form.querySelectorAll(`[name="options[${mod_name}]"]`);
        allRadios.forEach(radio => {
            radio.checked = false; // Снимаем выделение
        });
        radioToCheck.checked = true;
        radioToCheck.click();
        const event = new Event('change', { bubbles: true });
        radioToCheck.dispatchEvent(event);
    } else {
        console.error(`Радиокнопка с значением "${modValue}" не найдена`);
    }
}


function addProductFromCatalog(btn) {
    const form = btn.closest('form');
    if (!form) return;
    const countInput = form.querySelector('input[name="count"]');
    const quantityDisplay = form.querySelector('.add-quantity-button-quantity-count');
    countInput.value = 1;  // Восстанавливаем значение count
    quantityDisplay.textContent = 1;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.ms2_action = 'cart/add';

    // Находим поле "count" и увеличиваем его значение

    $.post("", data, function(response) {
        if (typeof response.success !== "undefined") {
            if (response.success) {
                miniShop2.Order.getcost();
                miniShop2.Cart.status(response.data);
                console.log(response.data);
                const keyInput = form.querySelector('input[name="key"]');
                if (keyInput) {
                    keyInput.value = response.data.key; // Записываем значение из ответа
                } else {
                    console.error('Поле <input type="hidden" name="key"> не найдено в форме.');
                }
            }
        }
    }, "json");
    showCartToaster(form);
}

function changeCountProductFromCatalog(btn,type) {
    const form = btn.closest('form');
    if (!form) return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.ms2_action = 'cart/change';
    if (btn.classList.contains('add-quantity-button-increase')) {
        data.count = parseInt(data.count)+1;
    } else if (btn.classList.contains('add-quantity-button-decrease')) {
        data.count = parseInt(data.count);
        if (data.count == 0) {
            data.ms2_action = 'cart/remove';
        }
    }
    // Находим поле "count" и увеличиваем его значение

    $.post("", data, function(response) {
        if (typeof response.success !== "undefined") {
            if (response.success) {
                miniShop2.Order.getcost();
                miniShop2.Cart.status(response.data);

                const keyInput = form.querySelector('input[name="key"]');
                if (keyInput) {
                    keyInput.value = response.data.key; // Записываем значение из ответа
                } else {
                    console.error('Поле <input type="hidden" name="key"> не найдено в форме.');
                }
                if (data.ms2_action == 'cart/remove') {
                    showCartToaster(form,"delete");
                } else {
                    showCartToaster(form,"change");
                }
            }
        }
    }, "json");
}


$(document).ready(function() {
    $(".shop_cart_catalog").click(function() {
        $(".shopping-cart.js-minicart").addClass("active");
        sAgGlobalFunctions.send_ajax_rerender_minicart();
        sAgGlobalFunctions.send_ajax_rerender_cart();
    });
    productsInCart();
})


function productsInCart() {
    let cartItems = [];

    // Собираем товары из корзины
    $(".shopping-cart.js-minicart .cart-item").each(function () {
        let item = {
            id: $(this).attr("data-id"),
            count: $(this).attr("data-count"),
            option: $(this).attr("data-option"),
            alt: $(this).find(".cart-item__img").attr("alt"),
            key: $(this).attr("id") // Добавляем key из id элемента
        };
        cartItems.push(item);
        console.log("test");
    });

    // Проходим по каждому товару
    cartItems.forEach(item => {
        let form = $("form[data-viewproduct='" + item.id + "']");

        if (form.length) {
            // Обновляем текст в .add-quantity-button-quantity-count
            // Работаем с кнопкой .add-button
            let button = form.find(".add-button");
            if (button.length) {
                // Вызываем функцию перед перегрузкой событий
                showOverlaySett(button[0], item.id);
            }

            form.find(".add-quantity-button-quantity-count").text(item.count);

            // Устанавливаем значения в соответствующие поля формы
            form.find('[name="count"]').val(item.count);
            form.find('[name="key"]').val(item.key); // Добавляем key


            // Добавляем класс active для кнопок с name="options_size" и "options_color"
            form.find('[name="options_size"], [name="options_color"]').each(function () {
                if ($(this).val() === item.option || $(this).attr("data-value") === item.option) {
                    $(this).addClass("active");
                }
            });

            // Устанавливаем checked для radio с name="options[size]" и "options[color]"
            form.find('input[name="options[size]"], input[name="options[color]"]').each(function () {
                if ($(this).val() === item.option) {
                    $(this).prop("checked", true);
                }
            });
        }
    });

    console.log(cartItems);
}





/*
const forms = document.querySelectorAll('.slide-product.js-product-box.ms2_form.msoptionsprice-product');

forms.forEach((form) => {
    const priceElement = form.querySelector('.single-product-price');

    if (!priceElement) return;
    const updatePriceVisibility = () => {
        if (form.classList.contains('overlay-show')) {
            priceElement.style.display = 'block'; // Показать
        } else {
            priceElement.style.display = 'none';  // Скрыть
        }
    };

    const observer = new MutationObserver(updatePriceVisibility);

    const config = { attributes: true, attributeFilter: ['class'] };

    observer.observe(form, config);

    updatePriceVisibility();
});
*/


