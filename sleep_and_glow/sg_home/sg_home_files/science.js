$(document).ready(function() {
	
	let c = document.getElementById("facecanvas");
	let faceblock = document.getElementById("faceblock");
	
	c.width = faceblock.clientWidth;
	c.height = faceblock.clientHeight;
	
	let fitem1 = document.getElementById("fitem1");
	let fitem1_2 = document.getElementById("fitem1_2");
	
	
	let ctx1 = c.getContext("2d");
	ctx1.beginPath();
	ctx1.lineWidth = 0.5;
	ctx1.moveTo(700,500);
	ctx1.lineTo(1000,600);
	ctx1.stroke();	
	
})

const swiper_fb_1 = new Swiper('.swiper_fb_1', {
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next-fb-1',
		prevEl: '.swiper-button-prev-fb-1',
	},
});

const swiper_fb_2 = new Swiper('.swiper_fb_2', {
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next-fb-2',
		prevEl: '.swiper-button-prev-fb-2',
	},
});

const swiper_fb_3 = new Swiper('.swiper_fb_3', {
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next-fb-3',
		prevEl: '.swiper-button-prev-fb-3',
	},
});

const patents2 = new Swiper(".patents-slider2 .swiper-container", {
	speed: 300,
	loop: false,
	autoplay: false,
	spaceBetween: 40,
	centerInsufficientSlides: true,
	slidesPerView: "auto",
	navigation: { nextEl: ".patents-slider2 .swiper-button-next", prevEl: ".patents-slider2 .swiper-button-prev" },
	breakpoints: { 0: { spaceBetween: 20, }, 768: { spaceBetween: 40, }},
})

const swiper_experts = new Swiper('.swiper_experts', {
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next-experts',
		prevEl: '.swiper-button-prev-experts',
	},
	pagination: {
		el: '.swiper-pagination-experts',
		clickable: true,
	},
});


const forehead_slider = new Swiper('#forehead-slider', {
    loop: true,
    navigation: {
        nextEl: '.forehead-button-next',
        prevEl: '.forehead-button-prev',
    },
});
const eye_slider = new Swiper('#eye-slider', {
    loop: true,
    navigation: {
        nextEl: '.eye-button-next',
        prevEl: '.eye-button-prev',
    },
});
const mouth_slider = new Swiper('#mouth-slider', {
    loop: true,
    navigation: {
        nextEl: '.mouth-button-next',
        prevEl: '.mouth-button-prev',
    },
});
let faceSegments = [
    {
        "faceNet": "faceNetTop",
        "faceColor": "faceColorGroup53Top",
    },
    {
        "faceNet": "faceNetMiddle",
        "faceColor": "faceColorGroup53Middle",
    },
    {
        "faceNet": "faceNetBottom",
        "faceColor": "faceColorGroup53Bottom",
    },
]
function getLeftDot(el) {
    let center = el.innerWidth() / 2;
    let left = el.offset().left + center;
    return left;
}
function getTopDot(el) {
    let center = el.innerHeight() / 2;
    let top = el.offset().top + center;
    return top;
}
function isInViewport(el) {
    let elementTop = el.offset().top;
    let elementBottom = elementTop + el.outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    return elementBottom > (viewportTop + (el.outerHeight() / 1.2)) && (elementTop + (el.outerHeight() / 1.2)) < viewportBottom;
}
$(".presentation-head__item").each(function (index) {
    let section = $(this);
    let startDot = $(".dot_start").eq(index);
    let endDot = $(".dot_end").eq(index);
    let svgEl = $(`<svg id="line_${index}" style="width: 100%; height: 100%; pointer-events: none; position: absolute; top: 0; left: 0;"><line stroke-width="0.5" stroke="#000"/><circle class="dot_line_1_${index}" fill="white" stroke="black" stroke-width="0.5" r="3.25" /><circle class="dot_line_2_${index}" fill="white" stroke="black" stroke-width="0.5" r="3.25" /></svg>`);
    let lineEl = svgEl.find("line");
    svgEl.appendTo(".presentation-head");
    let faceSegmentNet = $("#" + faceSegments[index].faceNet);
    let faceSegmentNet1 = $("#" + faceSegments[index].faceNet + index);
    let faceSegmentColor = $("#" + faceSegments[index].faceColor);

    function setStyles() {
        let parentContainer = $('.presentation-head');
        let parentContainerOffsetTop = parentContainer.offset().top;
        svgEl.attr("viewBox", `0 0 ${parentContainer.width()} ${parentContainer.height()}`);
        let dotLine1 = $(".dot_line_1_" + index);
        let dotLine2 = $(".dot_line_2_" + index);
        lineEl.attr("x1", getLeftDot(startDot));
        lineEl.attr("y1", getTopDot(startDot) - parentContainerOffsetTop);
        lineEl.attr("x2", getLeftDot(endDot));
        lineEl.attr("y2", getTopDot(endDot) - parentContainerOffsetTop);
        dotLine1.attr("cx", getLeftDot(startDot));
        dotLine1.attr("cy", getTopDot(startDot) - parentContainerOffsetTop);
        dotLine2.attr("cx", getLeftDot(endDot));
        dotLine2.attr("cy", getTopDot(endDot) - parentContainerOffsetTop);
    }

    function activateSection() {
        forehead_slider.update();
        eye_slider.update();
        mouth_slider.update();
        if (isInViewport(section)) {
           //section.addClass("active-presentation");
            setStyles();
            lineEl.attr("stroke", "#000");
            faceSegmentNet1.css("display", "block");
            faceSegmentNet.css("opacity", "0");
            faceSegmentColor.css("opacity", "1");
        } else {
           //section.removeClass("active-presentation");
            setStyles();
            lineEl.attr("stroke", "#C6C6C6");
            faceSegmentNet1.css("display", "none");
            faceSegmentNet.css("opacity", "1");
            faceSegmentColor.css("opacity", "0");
        }
    }

    setStyles();
    activateSection();

    $(window).scroll(function() {
        activateSection();
    });

    $(window).resize(function() {
        activateSection();
    });
});
