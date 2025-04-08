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