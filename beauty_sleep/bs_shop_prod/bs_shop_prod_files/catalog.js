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

$(document).ready(function() {
	$('.js-product-color').each(function(index) {
        const label = $(this).find('label');
	    const labelCount = label.length;
        label.each(function(index) {
            $(this).addClass('lb-color-' + (index + 1));
        });
	    if (labelCount > 5) {
	    	$(this).addClass("collapse");
            $(this).find('.slide-product__img_colors').append('<div class="more-color-count">'+ (labelCount - 4) +'</div>');
	    }
	});


	$(".js-product-color.collapse").click(function() {
		const productColor = $(this).closest(".js-product-color");
	    productColor.removeClass("collapse");
	    productColor.find(".color-overlay").hide();
 	})
})
