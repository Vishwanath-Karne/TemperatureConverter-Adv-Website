function convert(){
    var fromUnit = document.getElementById('fromUnit').value;
    var toUnit = document.getElementById('toUnit').value;
    var temperature = parseFloat(document.getElementById('temperature').value);

    var converttedValue;
    var resultUnit;

    // Perform conversion logic

    switch (fromUnit){

        // CELSIUS
        case 'C':
            if (toUnit === 'F'){
                convertedValue = (temperature * 9/5) +32;
                resultUnit = 'F';
            } else if (toUnit === 'K'){
                convertedValue = temperature + 273.15;
                resultUnit = 'K';
            }else if (toUnit === 'R'){
                convertedValue = temperature + 273.15;
                resultUnit = 'R';
            }else{
                convertedValue = temperature;
                resultUnit = 'C';
            }
            break;

            // FAHRENHEIT
            case 'F':
            if (toUnit === 'C'){
                convertedValue = (temperature -32) * 5/9;
                resultUnit = 'C';
            } else if (toUnit === 'K'){
                convertedValue = (temperature -32) * 5/9 + 273.15;
                resultUnit = 'K';
            }else if (toUnit === 'R'){
                convertedValue = temperature + 459.67;
                resultUnit = 'R';
            }else{
                convertedValue = temperature;
                resultUnit = 'F';
            }
            break;

            // KELVIN
            case 'K':
            if (toUnit === 'C'){
                convertedValue = temperature - 273.15;
                resultUnit = 'C';
            } else if (toUnit === 'K'){
                convertedValue = (temperature - 273.15) * 9/5 +32;
                resultUnit = 'K';
            }else if (toUnit === 'R'){
                convertedValue = temperature * 9/5;
                resultUnit = 'R';
            }else{
                convertedValue = temperature;
                resultUnit = 'K';
            }
            break;

    }

    document.getElementById('result').value = convertedValue.toFixed(2) + ' ' + resultUnit;
    
}

// HOVER EFFECT
console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
    const overlayEl = e.currentTarget;
    const x = e.pageX - cardsContainer.offsetLeft;
    const y = e.pageY - cardsContainer.offsetTop;

    overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
    const overlayCta = document.createElement("div");
    overlayCta.classList.add("cta");
    overlayCta.textContent = ctaEl.textContent;
    overlayCta.setAttribute("aria-hidden", true);
    overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        const cardIndex = cards.indexOf(entry.target);
        let width = entry.borderBoxSize[0].inlineSize;
        let height = entry.borderBoxSize[0].blockSize;

        if (cardIndex >= 0) {
            overlay.children[cardIndex].style.width = `${width}px`;
            overlay.children[cardIndex].style.height = `${height}px`;
        }
    });
});

const initOverlayCard = (cardEl) => {
    const overlayCard = document.createElement("div");
    overlayCard.classList.add("card");
    createOverlayCta(overlayCard, cardEl.lastElementChild);
    overlay.append(overlayCard);
    observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);
