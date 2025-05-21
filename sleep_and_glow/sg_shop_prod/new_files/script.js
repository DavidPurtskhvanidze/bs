$( window ).on("load", function() {
    $('.other-products').masonry({
        // options
        itemSelector: '.other-products-item',
        transitionDuration: 0,
    });
});

function moveToCard(id) {
    const productImg = $("[data-viewproduct='" + id + "']").find('.slide-product__img a img').first();
    const startOffset = productImg.offset();
    const cartOffset = $(".shop_cart_catalog").offset();
    const $clone = productImg
        .clone()
        .css({
            position: "absolute",
            "z-index": 10,
            top: startOffset.top,
            left: startOffset.left,
            width: productImg.width(),
            "border-radius": 0,
            opacity: 1
        })
        .appendTo("body");
    $clone.animate({
        top: startOffset.top + 40
    }, {
        duration: 200,
        easing: "swing",
        complete: function () {
            $clone.animate({
                left: cartOffset.left,
                top: cartOffset.top,
                width: 20,
                "border-radius": 6,
                opacity: 0.7
            }, {
                duration: 300,
                easing: "linear",
                complete: function () {
                    $clone.remove();
                }
            });
        }
    });
}

$('.no-js-product-color').each(function(index) {
    $(this).addClass("collapse");
    const cButton = $(this).find('.c_button');
    const cButtonCount = cButton.length;
    const form = $(this).closest('form');
    const oldBtn = form.find('button.btn-add-basket');
    oldBtn.hide();
    oldBtn.after(`
                <a type="button" 
                    class="button border x_gradient single-product__to-card to-card btn btn-buy btn-add-basket action-basket show">
                    <span>select options</span>
                </a>
            `);
    cButton.each(function(index) {
        if (index > 3) {
            $(this).addClass("hidden");
        }
    });
    if (cButtonCount > 5) {
        $(this).find('.slide-product__img_colors').append('<div class="more-color-count">'+ ("+" + (cButtonCount - 4)) +'</div>');
    }

    const newBtn = form.find("a.btn-add-basket");

    $(this).click(function() {
        $(this).removeClass("collapse");
        $(this).find(".color-overlay").hide();
        form.find("a.btn-add-basket").hide();
        form.find("button.btn-add-basket").show();
    })

    newBtn.click(function() {
        form.find(".no-js-product-color").removeClass("collapse");
        form.find(".color-overlay").hide();
        form.find("a.btn-add-basket").hide();
        form.find("button.btn-add-basket").show();
    })

});
