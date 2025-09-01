document.addEventListener('DOMContentLoaded', () => {
    const overlays = document.querySelectorAll('.vent-different-comp-overlay');

    overlays.forEach(overlay => {
        const container = overlay.parentElement;
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // начальная ширина половина
        overlay.style.width = width / 1.3 + 'px';

        // создаем разделитель
        const slider = document.createElement('div');
        slider.className = 'vent-different-comp-slider';
        container.insertBefore(slider, overlay);
        slider.style.top = height / 2 - slider.offsetHeight / 2 + 'px';
        slider.style.left = width / 1.3 - slider.offsetWidth / 2 + 'px';

        // обработка движения мыши
        container.addEventListener('mousemove', e => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const pos = Math.min(Math.max(0, x), width);
            updateSlider(pos);
        });

        // поддержка тач
        container.addEventListener('touchmove', e => {
            const rect = container.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const pos = Math.min(Math.max(0, x), width);
            updateSlider(pos);
        });

        function updateSlider(x) {
            overlay.style.width = x + 'px';
            slider.style.left = x - slider.offsetWidth / 2 + 'px';
        }
    });
});


/*- hormones-section -*/
window.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll(".vent-how-degradation-list li");
    const paths = document.querySelectorAll(".vent-how-degradation-list-lines .line");
    const pathGray = document.querySelector("#how-degradation-gray .line");
    const initDashArrays = () => {
        paths.forEach((item, index) => {
            const pathLength = item.getTotalLength();
            item.style.strokeDasharray = pathLength;
        });
        pathGray.style.strokeDasharray = pathGray.getTotalLength();
    };

    const updateDashOffset = () => {

        if (window.innerWidth >= 768) {
            paths.forEach((item, index) => {

                let startOffset;
                if (index === 0) {
                    startOffset = 1.4;
                } else {
                    startOffset = 2 * index;
                }
                const rect = item.getBoundingClientRect();

                const startPosition = rect.top - (window.innerHeight / startOffset);
                const endPosition = window.innerHeight - rect.height;

                const progress = Math.max(0, Math.min(1, startPosition / endPosition));
                const offset = paths[index].getTotalLength() * progress;

                item.style.strokeDashoffset = offset;

                if (icons[index]) {
                    if (progress <= 0) {
                        icons[index].classList.add("active");
                    } else {
                        icons[index].classList.remove("active");
                    }
                }

            });
        }


        if (window.innerWidth <= 768) {
            const rect = document.querySelector("#how-degradation-gray").getBoundingClientRect();

            const startPosition = rect.top - 50;
            const endPosition = window.innerHeight - rect.height - 50 * 2;

            const progress = Math.max(0, Math.min(1, startPosition / endPosition));
            const offset = pathGray.getTotalLength() * progress;

            pathGray.style.strokeDashoffset = offset;


            icons.forEach((icon, index) => {
                let threshold;

                if (index === 0) {
                    threshold = 0.97;
                } else if (index === 1) {
                    threshold = 0.70;
                } else if (index === 2) {
                    threshold = 0.35;
                } else {
                    threshold = 0.01;
                }

                if (progress < threshold) {
                    icon.classList.add("active");
                } else {
                    icon.classList.remove("active");
                }
            });
        }

    };

    window.addEventListener("resize", updateDashOffset);
    window.addEventListener("scroll", updateDashOffset);

    initDashArrays();
    updateDashOffset();
});


window.addEventListener("DOMContentLoaded", () => {
    const ventMeshButtons = document.querySelectorAll(".vent-mesh-position-switch-btn");
    const ventMeshBlocks  = [document.getElementById("fnSingleVent"), document.getElementById("fnDoubleVent")];

    document.addEventListener("click", e => {
        const btn = e.target.closest(".vent-mesh-position-switch-btn");
        if (!btn) return;

        ventMeshButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        ventMeshBlocks.forEach(block => block.classList.remove("active"));
        document.getElementById(btn.dataset.target)?.classList.add("active");
    });



    function setVideoSources() {
        const isMobile = window.innerWidth <= 768;
        const videos = document.querySelectorAll("video");

        videos.forEach(video => {
            const sources = video.querySelectorAll("source");

            sources.forEach(source => {
                const src = isMobile ? source.dataset.mobile : source.dataset.desktop;
                if (src) source.src = src;
            });

            video.load();
        });
    }
    setVideoSources();
});


