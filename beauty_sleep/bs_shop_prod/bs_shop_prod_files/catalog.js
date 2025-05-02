const sections = document.querySelectorAll(".goods-grid");
const navLinks = document.querySelectorAll(".shop-section__goods_item_action");
const seenSections = new Set();
const mainHeader = $('header.header');
const shopSidebarBlock = $('.shop-section .shop-section__goods_sidebar > div');

function sidebarTopPosition() {
    if (mainHeader.hasClass('hide')) {
        shopSidebarBlock.css('top', 0);
    } else {
        shopSidebarBlock.css('top', mainHeader.height());
    }
}
sidebarTopPosition();
function highlightMenu() {
    let scrollPosition = window.scrollY + window.innerHeight / 2;
    sidebarTopPosition()
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

$(document).ready(function() {
    $('.js-product-color').each(function(index) {
        const label = $(this).find('label');
        const colorOverlay = $(this).find('.color-overlay');
        const labelCount = label.length;
        label.each(function(index) {
            $(this).addClass('lb-color-' + (index + 1));
        });
        if (labelCount > 5) {
            $(this).addClass("collapse");
            $(this).find('.slide-product__img_colors').append('<div class="more-color-count">'+ (labelCount - 4) +'</div>');

            const form = $(this).closest('form');
            const oldBtn = form.find('.btn-add-basket');
            const newBtn = oldBtn.clone().attr({
                type: 'button',
                name: 'ms2_action2',
                value: 'cart/add2'
            }).removeAttr('onclick');

            newBtn.find('span').text('опции');
            oldBtn.replaceWith(newBtn);


        } else {
            console.log("hidden");
            colorOverlay.hide();
        }
    });


    $(".js-product-color.collapse").click(function() {
        const productColor = $(this).closest(".js-product-color");
        productColor.removeClass("collapse");
        productColor.find(".color-overlay").hide();
    })

    $(".btn-add-basket[type=button]").click(function() {
        $(this)
            .attr('type', 'submit')
            .attr('name', 'ms2_action')
            .attr('value', 'cart/add')
            .off('click') // Удаляет текущий click, чтобы не зациклить
            .on('click', function() {
                addToCart(this);
            });

        $(this).find('span').text('добавить');
        const form = $(this).closest('form');
        const productColor = form.find(".js-product-color");
        productColor.removeClass("collapse");
        productColor.find(".color-overlay").hide();
    });

    $("a.btn-add-basket").click(function() {
        const oldBtn = $(this);

        const newBtn = $('<button>', {
            class: oldBtn.attr('class'),
            type: 'button',
            name: 'ms2_action2',
            value: 'cart/add2',
            'data-reachgoal': oldBtn.attr('data-reachgoal'),
            'data-pagetitle': oldBtn.attr('data-pagetitle'),
            'data-parent': oldBtn.attr('data-parent'),
            'data-id': oldBtn.attr('data-id'),
            'data-price': oldBtn.attr('data-price'),
            style: oldBtn.attr('style')
        }).append(oldBtn.contents()); // переносим <span>, <svg> и т.п.

        oldBtn.replaceWith(newBtn);

        oldBtn.find('span').text('добавить');
        const form = $(this).closest('form');
        const productColor = form.find(".js-product-color");
        productColor.removeClass("collapse");
        productColor.find(".color-overlay").hide();
    });
})