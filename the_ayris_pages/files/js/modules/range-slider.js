const rangeMin = document.getElementById("priceRangeMin");
const rangeMax = document.getElementById("priceRangeMax");
const range = document.querySelector(".fn-catalog-range");
const minPriceLabel = document.getElementById("priceMinLabel");
const maxPriceLabel = document.getElementById("priceMaxLabel");
const inputMin = document.getElementById("priceInputMin");
const inputMax = document.getElementById("priceInputMax");


function updateRange() {
    const minVal = parseInt(rangeMin.value);
    const maxVal = parseInt(rangeMax.value);

    if (maxVal - minVal < 10) {
        if (this === rangeMin) {
            rangeMin.value = maxVal - 10;
        } else {
            rangeMax.value = minVal + 10;
        }
    }

    const rangeMinPercent = (rangeMin.value / rangeMin.max) * 100;
    const rangeMaxPercent = (rangeMax.value / rangeMax.max) * 100;

    range.style.left = `${rangeMinPercent}%`;
    range.style.width = `${rangeMaxPercent - rangeMinPercent}%`;

    minPriceLabel.textContent = `${rangeMin.value} ₽`;
    maxPriceLabel.textContent = `${rangeMax.value} ₽`;

    inputMin.value = rangeMin.value;
    inputMax.value = rangeMax.value;
}

function updateSliderFromInput() {
    const minVal = parseInt(inputMin.value);
    const maxVal = parseInt(inputMax.value);

    if (maxVal - minVal >= 10) {
        rangeMin.value = minVal;
        rangeMax.value = maxVal;
        updateRange();
    }
}

rangeMin.addEventListener("input", updateRange);
rangeMax.addEventListener("input", updateRange);
inputMin.addEventListener("input", updateSliderFromInput);
inputMax.addEventListener("input", updateSliderFromInput);

updateRange();