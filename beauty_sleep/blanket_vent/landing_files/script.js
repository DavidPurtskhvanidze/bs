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
    const initDashArrays = () => {
        paths.forEach((item, index) => {
            const pathLength = item.getTotalLength();
            item.style.strokeDasharray = pathLength;
        });
    };

    const updateDashOffset = () => {
        // const { offsetFactor, path, pathLength } = getPath();
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

            const n = index.toString();


            if (progress <= 0) {
                icons[n].classList.add("active");
            } else {
                icons[n].classList.remove("active");
            }

        });
    };

    window.addEventListener("resize", updateDashOffset);
    window.addEventListener("scroll", updateDashOffset);

    initDashArrays();
    updateDashOffset();
});

